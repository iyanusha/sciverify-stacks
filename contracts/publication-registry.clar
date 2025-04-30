;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u1000))
(define-constant ERR-ALREADY-EXISTS (err u1001))
(define-constant ERR-DOES-NOT-EXIST (err u1002))
(define-constant ERR-INVALID-STATUS (err u1003))
(define-constant ERR-INVALID-INPUT (err u1004))
(define-constant ERR-LIST-OVERFLOW (err u1005))

;; Contract owner
(define-data-var contract-owner principal tx-sender)

;; Data structures for publications
(define-map publications
  { publication-id: uint }
  { title: (string-utf8 256),
    abstract: (string-utf8 1024),
    authors: (list 10 principal),
    ipfs-hash: (string-ascii 64),
    status: uint,
    submitted-at: uint,
    updated-at: uint,
    journal: (optional principal),
    doi: (optional (string-ascii 64))
  })

;; Publication counter
(define-data-var last-publication-id uint u0)

;; Authorization check
(define-private (is-contract-owner)
  (is-eq tx-sender (var-get contract-owner)))

;; Get the next publication ID
(define-private (get-next-publication-id)
  (let ((next-id (+ (var-get last-publication-id) u1)))
    (var-set last-publication-id next-id)
    next-id))

;; Check if the user is an author
(define-private (is-author (publication-id uint) (user principal))
  (match (map-get? publications { publication-id: publication-id })
    publication (is-some (index-of (get authors publication) user))
    false))

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
        status: 1, ;; Submitted status
        submitted-at: current-block-height,
        updated-at: current-block-height
      })
    (ok true)))

;; Update publication status
(define-public (update-publication-status (publication-id uint) (new-status uint))
  (match (map-get? publications { publication-id: publication-id })
    publication (begin
        (map-set publications
          { publication-id: publication-id }
          (merge publication { status: new-status }))
        (ok true))
    (err ERR-NOT-FOUND)))

;; Get publication metadata by ID
(define-read-only (get-publication-metadata (publication-id uint))
  (ok (map-get? publication-metadata { publication-id: publication-id })))
