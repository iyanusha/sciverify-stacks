;; Credential Verification Contract
;; This contract handles verification of academic credentials for reviewers in 
;; the SciVerify system

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u4000))
(define-constant ERR-ALREADY-EXISTS (err u4001))
(define-constant ERR-DOES-NOT-EXIST (err u4002))
(define-constant ERR-INVALID-PROOF (err u4003))
(define-constant ERR-EXPIRED      (err u4004))
(define-constant ERR-REVOKED      (err u4005))

;; Constants for roles
(define-constant ROLE-RESEARCHER    u1)
(define-constant ROLE-PROFESSOR     u2)
(define-constant ROLE-INDUSTRY-EXPERT u3)
(define-constant ROLE-JOURNAL-EDITOR  u4)

;; Contract owner variable
(define-data-var contract-owner principal tx-sender)

;; Verifiers map (trusted entities who can verify credentials)
(define-map verifiers principal bool)

;; Map of verified credentials (keyed by user principal)
(define-map verified-credentials
  { user: principal }
  {
    roles: (list 5 uint),
    fields: (list 10 (string-ascii 64)),
    institution: (string-utf8 256),
    verified-by: principal,
    verified-at: uint,
    expires-at: uint,
    revoked: bool,
    proof-hash: (buff 32)  ;; Hash of the verification proof
  }
)

;; Authorization checks
(define-private (is-contract-owner)
  (is-eq tx-sender (var-get contract-owner))
)

(define-private (is-verifier (principal-to-check principal))
  (default-to false (map-get? verifiers principal-to-check))
)

;; Public functions

(define-public (add-verifier (verifier principal))
  (begin
    (asserts! (is-contract-owner) ERR-NOT-AUTHORIZED)
    (map-set verifiers verifier true)
    (ok true)
  )
)

(define-public (remove-verifier (verifier principal))
  (begin
    (asserts! (is-contract-owner) ERR-NOT-AUTHORIZED)
    (map-delete verifiers verifier)
    (ok true)
  )
)

(define-public (submit-credentials 
  (roles (list 5 uint))
  (fields (list 10 (string-ascii 64)))
  (institution (string-utf8 256))
  (proof-hash (buff 32))
)
  (begin
    ;; Check if credentials already exist
    (match (map-get? verified-credentials { user: tx-sender })
      existing-credentials ERR-ALREADY-EXISTS  ;; if some, return error

      ;; If none, store unverified credentials and succeed
      (begin
        ;; Store unverified credentials
        (map-set verified-credentials
          { user: tx-sender }
          {
            roles: roles,
            fields: fields,
            institution: institution,
            verified-by: tx-sender,      ;; Self-attested initially
            verified-at: u0,             ;; Not verified yet
            expires-at: u0,             ;; No expiration yet
            revoked: false,
            proof-hash: proof-hash
          }
        )
        (ok true)
      )
    )
  )
)

(define-public (verify-credentials 
  (user principal) 
  (expires-at uint)
)
  (begin
    (asserts! (is-verifier tx-sender) ERR-NOT-AUTHORIZED)    ;; Only verifiers can verify
    (match (map-get? verified-credentials { user: user })
      credentials
        (begin
          ;; Update verification status
          (map-set verified-credentials
            { user: user }
            (merge credentials {
              verified-by: tx-sender,
              verified-at: block-height,
              expires-at: expires-at,
              revoked: false
            })
          )
          (ok true)
        )
      ERR-DOES-NOT-EXIST
    )
  )
)

(define-public (revoke-credentials (user principal))
  (begin
    (asserts! (or (is-contract-owner) (is-verifier tx-sender)) ERR-NOT-AUTHORIZED)
    (match (map-get? verified-credentials { user: user })
      credentials
        (begin
          ;; Update revocation status
          (map-set verified-credentials
            { user: user }
            (merge credentials { revoked: true })
          )
          (ok true)
        )
      ERR-DOES-NOT-EXIST
    )
  )
)

(define-public (update-credentials 
  (roles (list 5 uint))
  (fields (list 10 (string-ascii 64)))
  (institution (string-utf8 256))
  (proof-hash (buff 32))
)
  (begin
    ;; Check if credentials exist
    (match (map-get? verified-credentials { user: tx-sender })
      credentials
        (begin
          ;; Overwrite credentials data (reset verification status)
          (map-set verified-credentials
            { user: tx-sender }
            (merge credentials {
              roles: roles,
              fields: fields,
              institution: institution,
              verified-at: u0,      ;; Reset verification timestamp
              proof-hash: proof-hash
            })
          )
          (ok true)
        )
      ERR-DOES-NOT-EXIST
    )
  )
)

(define-public (verify-with-zk-proof (user principal) (proof (buff 1024)))
  (begin
    (asserts! (is-verifier tx-sender) ERR-NOT-AUTHORIZED)    ;; Only verifiers can verify
    (match (map-get? verified-credentials { user: user })
      credentials
        (begin
          ;; (In a real implementation, verify the zero-knowledge proof here)
          (asserts! (> (len proof) u0) ERR-INVALID-PROOF)     ;; Proof must not be empty
          ;; Mark as verified
          (map-set verified-credentials
            { user: user }
            (merge credentials {
              verified-by: tx-sender,
              verified-at: block-height
            })
          )
          (ok true)
        )
      ERR-DOES-NOT-EXIST
    )
  )
)

;; Read-only query functions

(define-read-only (is-verified (user principal))
  (match (map-get? verified-credentials { user: user })
    credentials
      (and 
        (> (get verified-at credentials) u0)                   ;; was verified at some block
        (not (get revoked credentials))                        ;; and not revoked
        (or 
          (is-eq (get expires-at credentials) u0)              ;; and either no expiration
          (< block-height (get expires-at credentials))        ;; or not yet expired
        )
      )
    false
  )
)

(define-read-only (get-credentials (user principal))
  (ok (map-get? verified-credentials { user: user }))
)

(define-read-only (has-role (user principal) (role uint))
  (match (map-get? verified-credentials { user: user })
    credentials
      (begin
        ;; Ensure credentials are valid (verified, not revoked/expired)
        (asserts! (and 
                    (> (get verified-at credentials) u0)
                    (not (get revoked credentials))
                    (or 
                      (is-eq (get expires-at credentials) u0)
                      (< block-height (get expires-at credentials))
                    ))
                  ERR-EXPIRED)
        ;; Check for the specified role in roles list
        (ok (is-some (index-of (get roles credentials) role)))
      )
    ERR-DOES-NOT-EXIST
  )
)

(define-read-only (has-field-expertise (user principal) (field (string-ascii 64)))
  (match (map-get? verified-credentials { user: user })
    credentials
      (begin
        ;; Ensure credentials are valid (verified, not revoked/expired)
        (asserts! (and 
                    (> (get verified-at credentials) u0)
                    (not (get revoked credentials))
                    (or 
                      (is-eq (get expires-at credentials) u0)
                      (< block-height (get expires-at credentials))
                    ))
                  ERR-EXPIRED)
        ;; Check for the field in the fields list
        (ok (is-some (index-of (get fields credentials) field)))
      )
    ERR-DOES-NOT-EXIST
  )
)

;; Administrative functions

(define-public (transfer-ownership (new-owner principal))
  (begin
    (asserts! (is-contract-owner) ERR-NOT-AUTHORIZED)
    (var-set contract-owner new-owner)
    (ok true)
  )
)

(define-read-only (get-contract-owner)
  (ok (var-get contract-owner))
)
