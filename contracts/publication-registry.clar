;; Publication Registry Contract
;; This contract manages the registry of scientific publications in the SciVerify system

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u1000))
(define-constant ERR-ALREADY-EXISTS (err u1001))
(define-constant ERR-DOES-NOT-EXIST (err u1002))
(define-constant ERR-INVALID-STATUS (err u1003))
(define-constant ERR-INVALID-INPUT (err u1004))
(define-constant ERR-LIST-OVERFLOW (err u1005))

;; Publication status constants
(define-constant STATUS-SUBMITTED u1)
(define-constant STATUS-UNDER-REVIEW u2)
(define-constant STATUS-ACCEPTED u3)
(define-constant STATUS-REJECTED u4)
(define-constant STATUS-PUBLISHED u5)
(define-constant STATUS-RETRACTED u6)

;; Contract owner
(define-data-var contract-owner principal tx-sender)

;; Data structures
(define-map publications
  { publication-id: uint }
  {
    title: (string-utf8 256),
    abstract: (string-utf8 1024),
    authors: (list 10 principal),
    ipfs-hash: (string-ascii 64),
    status: uint,
    submitted-at: uint,
    updated-at: uint,
    journal: (optional principal),
    doi: (optional (string-ascii 64))
  }
)

(define-map publication-metadata
  { publication-id: uint }
  {
    keywords: (list 20 (string-ascii 64)),
    field-of-study: (string-ascii 64),
    additional-info: (optional (string-utf8 1024))
  }
)

(define-map publication-reviews
  { publication-id: uint }
  {
    assigned-reviewers: (list 10 principal),
    completed-reviews: (list 10 uint),
    review-deadline: uint
  }
)

;; Publication counter
(define-data-var last-publication-id uint u0)

;; Authorization check
(define-private (is-contract-owner)
  (is-eq tx-sender (var-get contract-owner))
)

;; Get the next publication ID
(define-private (get-next-publication-id)
  (let ((next-id (+ (var-get last-publication-id) u1)))
    (var-set last-publication-id next-id)
    next-id
  )
)

(define-private (is-author (publication-id uint) (user principal))
  (match (map-get? publications { publication-id: publication-id })
    publication (is-some (index-of (get authors publication) user))
    false)
)


;; Register a new publication
(define-public (register-publication
  (title (string-utf8 256))
  (abstract (string-utf8 1024))
  (authors (list 10 principal))
  (ipfs-hash (string-ascii 64))
  (keywords (list 20 (string-ascii 64)))
  (field-of-study (string-ascii 64))
  (additional-info (optional (string-utf8 1024)))
)
  (let ((publication-id (get-next-publication-id))
        (current-block-height block-height))
    
    ;; Ensure authors list contains tx-sender
    (asserts! (is-some (index-of authors tx-sender)) ERR-NOT-AUTHORIZED)
    
    ;; Store publication data
    (map-set publications
      { publication-id: publication-id }
      {
        title: title,
        abstract: abstract,
        authors: authors,
        ipfs-hash: ipfs-hash,
        status: STATUS-SUBMITTED,
        submitted-at: current-block-height,
        updated-at: current-block-height,
        journal: none,
        doi: none
      }
    )
    
    ;; Store publication metadata
    (map-set publication-metadata
      { publication-id: publication-id }
      {
        keywords: keywords,
        field-of-study: field-of-study,
        additional-info: additional-info
      }
    )
    
    ;; Initialize reviews data
    (map-set publication-reviews
      { publication-id: publication-id }
      {
        assigned-reviewers: (list),
        completed-reviews: (list),
        review-deadline: u0
      }
    )
    
    ;; Return the publication ID
    (ok publication-id)
  )
)

;; Update publication status
(define-public (update-publication-status (publication-id uint) (new-status uint))
  (match (map-get? publications { publication-id: publication-id })
    publication 
      (begin
        ;; Only contract owner or journal can update status
        (asserts! (or 
                  (is-contract-owner)
                  (and 
                    (is-some (get journal publication))
                    (is-eq tx-sender (unwrap! (get journal publication) ERR-NOT-AUTHORIZED))))
                ERR-NOT-AUTHORIZED)
        
        ;; Status must be valid
        (asserts! (or 
                  (is-eq new-status STATUS-UNDER-REVIEW)
                  (is-eq new-status STATUS-ACCEPTED)
                  (is-eq new-status STATUS-REJECTED)
                  (is-eq new-status STATUS-PUBLISHED)
                  (is-eq new-status STATUS-RETRACTED))
                ERR-INVALID-STATUS)
        
        ;; Update the publication status
        (map-set publications
          { publication-id: publication-id }
          (merge publication { 
            status: new-status,
            updated-at: block-height
          })
        )
        
        (ok true)
      )
    ERR-DOES-NOT-EXIST
  )
)

;; Assign publication to a journal
(define-public (assign-to-journal (publication-id uint) (journal principal))
  (match (map-get? publications { publication-id: publication-id })
    publication
      (begin
        ;; Only contract owner or an author can assign to journal
        (asserts! (or 
                  (is-contract-owner)
                  (is-author publication-id tx-sender))
                ERR-NOT-AUTHORIZED)
        
        ;; Update the publication journal
        (map-set publications
          { publication-id: publication-id }
          (merge publication { 
            journal: (some journal),
            updated-at: block-height
          })
        )
        
        (ok true)
      )
    ERR-DOES-NOT-EXIST
  )
)

;; Set publication DOI (Digital Object Identifier)
(define-public (set-publication-doi (publication-id uint) (doi (string-ascii 64)))
  (match (map-get? publications { publication-id: publication-id })
    publication
      (begin
        ;; Only contract owner or journal can set DOI
        (asserts! (or 
                  (is-contract-owner)
                  (and 
                    (is-some (get journal publication))
                    (is-eq tx-sender (unwrap! (get journal publication) ERR-NOT-AUTHORIZED))))
                ERR-NOT-AUTHORIZED)
        
        ;; Publication must be accepted or published
        (asserts! (or
                  (is-eq (get status publication) STATUS-ACCEPTED)
                  (is-eq (get status publication) STATUS-PUBLISHED))
                ERR-INVALID-STATUS)
        
        ;; Update the publication DOI
        (map-set publications
          { publication-id: publication-id }
          (merge publication { 
            doi: (some doi),
            updated-at: block-height
          })
        )
        
        (ok true)
      )
    ERR-DOES-NOT-EXIST
  )
)

;; Assign reviewers to a publication
(define-public (assign-reviewers (publication-id uint) (reviewers (list 10 principal)) (deadline uint))
  (match (map-get? publications { publication-id: publication-id })
    publication
      (match (map-get? publication-reviews { publication-id: publication-id })
        review-data
          (begin
            ;; Only contract owner or journal can assign reviewers
            (asserts! (or 
                      (is-contract-owner)
                      (and 
                        (is-some (get journal publication))
                        (is-eq tx-sender (unwrap! (get journal publication) ERR-NOT-AUTHORIZED))))
                    ERR-NOT-AUTHORIZED)
            
            ;; Publication must be in submitted or under review status
            (asserts! (or
                      (is-eq (get status publication) STATUS-SUBMITTED)
                      (is-eq (get status publication) STATUS-UNDER-REVIEW))
                    ERR-INVALID-STATUS)
            
            ;; Update the review data
            (map-set publication-reviews
              { publication-id: publication-id }
              {
                assigned-reviewers: reviewers,
                completed-reviews: (get completed-reviews review-data),
                review-deadline: deadline
              }
            )
            
            ;; Update publication status to under review
            (map-set publications
              { publication-id: publication-id }
              (merge publication { 
                status: STATUS-UNDER-REVIEW,
                updated-at: block-height
              })
            )
            
            (ok true)
          )
        ERR-DOES-NOT-EXIST
      )
    ERR-DOES-NOT-EXIST
  )
)

;; Add completed review reference
(define-public (add-completed-review (publication-id uint) (review-id uint))
  (match (map-get? publications { publication-id: publication-id })
    publication
      (match (map-get? publication-reviews { publication-id: publication-id })
        review-data
          (begin
            ;; Only contract owner or journal can add completed reviews
            (asserts! (or 
                      (is-contract-owner)
                      (and 
                        (is-some (get journal publication))
                        (is-eq tx-sender (unwrap! (get journal publication) ERR-NOT-AUTHORIZED))))
                    ERR-NOT-AUTHORIZED)
            
            ;; Publication must be under review
            (asserts! (is-eq (get status publication) STATUS-UNDER-REVIEW)
                    ERR-INVALID-STATUS)
            
            ;; Safe append to completed reviews list
            (let ((new-reviews (unwrap! (as-max-len? 
                                (append (get completed-reviews review-data) review-id)
                                u10) 
                              ERR-LIST-OVERFLOW)))
              
              ;; Update the completed reviews list
              (map-set publication-reviews
                { publication-id: publication-id }
                (merge review-data {
                  completed-reviews: new-reviews
                })
              )
              
              (ok true)
            )
          )
        ERR-DOES-NOT-EXIST
      )
    ERR-DOES-NOT-EXIST
  )
)

;; Update publication IPFS hash (for revisions)
(define-public (update-publication-ipfs-hash (publication-id uint) (ipfs-hash (string-ascii 64)))
  (match (map-get? publications { publication-id: publication-id })
    publication
      (begin
        ;; Only an author can update IPFS hash
        (asserts! (is-author publication-id tx-sender) ERR-NOT-AUTHORIZED)
        
        ;; Publication must not be published or retracted
        (asserts! (and
                  (not (is-eq (get status publication) STATUS-PUBLISHED))
                  (not (is-eq (get status publication) STATUS-RETRACTED)))
                ERR-INVALID-STATUS)
        
        ;; Update the publication IPFS hash
        (map-set publications
          { publication-id: publication-id }
          (merge publication { 
            ipfs-hash: ipfs-hash,
            updated-at: block-height
          })
        )
        
        (ok true)
      )
    ERR-DOES-NOT-EXIST
  )
)

;; Read-only functions

;; Get publication by ID
(define-read-only (get-publication (publication-id uint))
  (ok (map-get? publications { publication-id: publication-id }))
)

;; Get publication metadata by ID
(define-read-only (get-publication-metadata (publication-id uint))
  (ok (map-get? publication-metadata { publication-id: publication-id }))
)

;; Get publication reviews data by ID
(define-read-only (get-publication-reviews-data (publication-id uint))
  (ok (map-get? publication-reviews { publication-id: publication-id }))
)

;; Get the last publication ID
(define-read-only (get-last-publication-id)
  (ok (var-get last-publication-id))
)

;; Check if a principal is an author of the publication
(define-read-only (check-is-author (publication-id uint) (author principal))
  (match (map-get? publications { publication-id: publication-id })
    publication (ok (is-some (index-of (get authors publication) author)))
    (ok false))
)

;; Check if a principal is an assigned reviewer of the publication
(define-read-only (check-is-reviewer (publication-id uint) (reviewer principal))
  (match (map-get? publication-reviews { publication-id: publication-id })
    review-data (ok (is-some (index-of (get assigned-reviewers review-data) reviewer)))
    (ok false))
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
