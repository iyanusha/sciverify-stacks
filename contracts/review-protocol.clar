;; title: Review Protocol Contract
;; version: 1.0.2
;; description: This contract manages the peer review process in the SciVerify system

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u2000))
(define-constant ERR-ALREADY-EXISTS (err u2001))
(define-constant ERR-DOES-NOT-EXIST (err u2002))
(define-constant ERR-INVALID-STATUS (err u2003))
(define-constant ERR-INVALID-INPUT (err u2004))
(define-constant ERR-NOT-REVIEWER (err u2005))
(define-constant ERR-ALREADY-REVEALED (err u2006))
(define-constant ERR-ALREADY-REVIEWED (err u2007))
(define-constant ERR-REVIEW-CLOSED (err u2008))
(define-constant ERR-CONFLICT-OF-INTEREST (err u2009))
(define-constant ERR-NOT-VERIFIED (err u2010))

;; Review status constants
(define-constant STATUS-ASSIGNED u1)
(define-constant STATUS-SUBMITTED u2)
(define-constant STATUS-REVEALED u3)

;; Review recommendation constants
(define-constant RECOMMENDATION-ACCEPT u1)
(define-constant RECOMMENDATION-MINOR-REVISION u2)
(define-constant RECOMMENDATION-MAJOR-REVISION u3)
(define-constant RECOMMENDATION-REJECT u4)

;; Contract owner
(define-data-var contract-owner principal tx-sender)

;; Data structures
(define-map reviews
  { review-id: uint }
  {
    publication-id: uint,
    reviewer: principal,
    reviewer-hash: (buff 32),    ;; Hash of reviewer identity for blind reviews
    recommendation: uint,
    comments: (string-utf8 2048),
    status: uint,
    submitted-at: uint,
    revealed-at: (optional uint),
    confidence-score: uint,      ;; 1-5 confidence level
    technical-score: uint,       ;; 1-5 technical quality score
    novelty-score: uint,         ;; 1-5 novelty score
    clarity-score: uint,         ;; 1-5 clarity of presentation score
    metadata-hash: (buff 32)     ;; Hash of additional review metadata
  }
)

;; Assignment of reviews to track which reviews are pending for a publication
(define-map review-assignments
  { publication-id: uint, reviewer: principal }
  { 
    review-id: (optional uint),
    assigned-at: uint,
    deadline: uint
  }
)

;; Review counter
(define-data-var last-review-id uint u0)

;; Authorization check
(define-private (is-contract-owner)
  (is-eq tx-sender (var-get contract-owner))
)

;; Get the next review ID
(define-private (get-next-review-id)
  (let ((next-id (+ (var-get last-review-id) u1)))
    (var-set last-review-id next-id)
    next-id
  )
)

;; Check for conflict of interest between reviewer and publication
(define-private (check-conflict-of-interest (publication-id uint) (reviewer principal))
  (unwrap! (contract-call? .publication-registry check-is-author publication-id reviewer) false)
)

;; Assign a reviewer to a publication
(define-public (assign-reviewer (publication-id uint) (reviewer principal) (deadline uint))
  (begin
    ;; Only contract owner or journal can assign reviewers
    (asserts! (is-contract-owner) ERR-NOT-AUTHORIZED)
    
    ;; Check if reviewer has verified credentials
    (asserts! (contract-call? .credential-verification is-verified reviewer) ERR-NOT-VERIFIED)
    
    ;; Check for conflict of interest
    (let ((is-author (check-conflict-of-interest publication-id reviewer)))
      (asserts! (not is-author) ERR-CONFLICT-OF-INTEREST)
    )
    
    ;; Check if assignment already exists
    (asserts! (is-none (map-get? review-assignments { publication-id: publication-id, reviewer: reviewer })) ERR-ALREADY-EXISTS)
    
    ;; Create new assignment
    (map-set review-assignments
      { publication-id: publication-id, reviewer: reviewer }
      {
        review-id: none,
        assigned-at: stacks-block-height,
        deadline: deadline
      }
    )
    
    ;; Update the publication status
    (try! (contract-call? .publication-registry update-publication-status publication-id u2)) ;; STATUS-UNDER-REVIEW
    (ok true)
  )
)

;; Submit a blind review
(define-public (submit-review
  (publication-id uint)
  (reviewer-hash (buff 32))
  (recommendation uint)
  (comments (string-utf8 2048))
  (confidence-score uint)
  (technical-score uint)
  (novelty-score uint)
  (clarity-score uint)
  (metadata-hash (buff 32))
)
  (begin
    ;; Check if reviewer is assigned to this publication
    (match (map-get? review-assignments { publication-id: publication-id, reviewer: tx-sender })
      assignment
        (begin
          ;; Check if review already submitted
          (asserts! (is-none (get review-id assignment)) ERR-ALREADY-REVIEWED)
          
          ;; Validate scores (1-5 range)
          (asserts! (and (>= confidence-score u1) (<= confidence-score u5)) ERR-INVALID-INPUT)
          (asserts! (and (>= technical-score u1) (<= technical-score u5)) ERR-INVALID-INPUT)
          (asserts! (and (>= novelty-score u1) (<= novelty-score u5)) ERR-INVALID-INPUT)
          (asserts! (and (>= clarity-score u1) (<= clarity-score u5)) ERR-INVALID-INPUT)
          
          ;; Validate recommendation
          (asserts! (or 
                    (is-eq recommendation RECOMMENDATION-ACCEPT)
                    (is-eq recommendation RECOMMENDATION-MINOR-REVISION)
                    (is-eq recommendation RECOMMENDATION-MAJOR-REVISION)
                    (is-eq recommendation RECOMMENDATION-REJECT))
                  ERR-INVALID-INPUT)
          
          ;; Create review
          (let ((review-id (get-next-review-id)))
            ;; Store review data
            (map-set reviews
              { review-id: review-id }
              {
                publication-id: publication-id,
                reviewer: tx-sender,
                reviewer-hash: reviewer-hash,
                recommendation: recommendation,
                comments: comments,
                status: STATUS-SUBMITTED,
                submitted-at: stacks-block-height,
                revealed-at: none,
                confidence-score: confidence-score,
                technical-score: technical-score,
                novelty-score: novelty-score,
                clarity-score: clarity-score,
                metadata-hash: metadata-hash
              }
            )
            
            ;; Update assignment with review ID
            (map-set review-assignments
              { publication-id: publication-id, reviewer: tx-sender }
              (merge assignment { review-id: (some review-id) })
            )
            
            ;; Add to publication's completed reviews
            (try! (contract-call? .publication-registry add-completed-review publication-id review-id))
            (ok review-id)
          )
        )
      ERR-NOT-REVIEWER
    )
  )
)

;; Reveal reviewer identity after publication decision
(define-public (reveal-reviewer-identity (review-id uint))
  (begin
    ;; Get the review
    (match (map-get? reviews { review-id: review-id })
      review
        (begin
          ;; Only the actual reviewer can reveal their identity
          (asserts! (is-eq tx-sender (get reviewer review)) ERR-NOT-AUTHORIZED)
          
          ;; Review must be in submitted status
          (asserts! (is-eq (get status review) STATUS-SUBMITTED) ERR-INVALID-STATUS)
          
          ;; Update the review status
          (map-set reviews
            { review-id: review-id }
            (merge review { 
              status: STATUS-REVEALED,
              revealed-at: (some stacks-block-height)
            })
          )
          
          (ok true)
        )
      ERR-DOES-NOT-EXIST
    )
  )
)

;; Get a review's public data
(define-read-only (get-review-public (review-id uint))
  (match (map-get? reviews { review-id: review-id })
    review
      (if (is-eq (get status review) STATUS-REVEALED)
        ;; If revealed, return complete review
        (ok review)
        ;; If not revealed, return anonymized review
        (ok (merge review {
          reviewer: 'ST000000000000000000002AMW42H, ;; Zero address
          reviewer-hash: 0x0000000000000000000000000000000000000000000000000000000000000000
        }))
      )
    ERR-DOES-NOT-EXIST
  )
)

;; Get a review's complete data (only authorized parties)
(define-read-only (get-review-complete (review-id uint))
  (match (map-get? reviews { review-id: review-id })
    review
      (if (or (is-contract-owner) (is-eq tx-sender (get reviewer review)))
        (ok review)
        ERR-NOT-AUTHORIZED
      )
    ERR-DOES-NOT-EXIST
  )
)

;; Check if a review exists for a publication by a reviewer
(define-read-only (has-reviewed (publication-id uint) (reviewer principal))
  (match (map-get? review-assignments { publication-id: publication-id, reviewer: reviewer })
    assignment (ok (is-some (get review-id assignment)))
    (ok false)
  )
)

;; Get reviews for a publication
(define-read-only (get-publication-reviews (publication-id uint))
  ;; This is a simplified implementation that would be enhanced in a real contract
  ;; In a production system, this would use a map to track reviews by publication
  (ok publication-id)
)

;; Administrative functions

;; Transfer contract ownership
(define-public (transfer-ownership (new-owner principal))
  (begin
    (asserts! (is-contract-owner) ERR-NOT-AUTHORIZED)
    (var-set contract-owner new-owner)
    (ok true)
  )
)

;; Get the contract owner
(define-read-only (get-contract-owner)
  (ok (var-get contract-owner))
)
