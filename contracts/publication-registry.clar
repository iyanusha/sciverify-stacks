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
