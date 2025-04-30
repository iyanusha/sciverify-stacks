;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u4000))
(define-constant ERR-ALREADY-EXISTS (err u4001))
(define-constant ERR-DOES-NOT-EXIST (err u4002))
(define-constant ERR-INVALID-PROOF (err u4003))
(define-constant ERR-EXPIRED (err u4004))
(define-constant ERR-REVOKED (err u4005))

;; Constants for roles
(define-constant ROLE-RESEARCHER u1)
(define-constant ROLE-PROFESSOR u2)
(define-constant ROLE-INDUSTRY-EXPERT u3)
(define-constant ROLE-JOURNAL-EDITOR u4)

;; Contract owner variable
(define-data-var contract-owner principal tx-sender)

;; Verifiers map (trusted entities who can verify credentials)
(define-map verifiers principal bool)

;; Map of verified credentials (keyed by user principal)
(define-map verified-credentials
  { user: principal }
  { roles: (list 5 uint),
    fields: (list 10 (string-ascii 64)),
    institution: (string-utf8 256),
    verified-by: principal,
    verified-at: uint,
    expires-at: uint,
    revoked: bool,
    proof-hash: (buff 32)  ;; Hash of the verification proof
  })
