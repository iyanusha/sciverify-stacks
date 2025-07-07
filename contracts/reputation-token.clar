;; Reputation Token Contract
;; This contract implements a SIP-010 fungible token for tracking academic reputation

;; Import SIP-010 trait
(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip-010-trait-ft-standard.sip-010-trait)

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u3000))
(define-constant ERR-NOT-FOUND (err u3001))
(define-constant ERR-ALREADY-EXISTS (err u3002))
(define-constant ERR-INVALID-AMOUNT (err u3003))
(define-constant ERR-TRANSFER-FAILED (err u3004))

;; Token constants
(define-constant TOKEN-NAME "SciVerify Reputation Token")
(define-constant TOKEN-SYMBOL "SVR")
(define-constant TOKEN-DECIMALS u6)
(define-constant TOKEN-URI u"https://sciverify.io/token-metadata.json")

;; Contract owner
(define-data-var contract-owner principal tx-sender)

;; Token managers that can mint/burn tokens
(define-map token-managers principal bool)

;; Token balances
(define-map token-balances principal uint)

;; Token supply
(define-data-var token-supply uint u0)

;; Reputation by category
(define-map reputation-by-category
  { user: principal, category: (string-ascii 32) }
  { amount: int }
)

;; Authorization check
(define-private (is-contract-owner)
  (is-eq tx-sender (var-get contract-owner))
)

;; Check if principal is a token manager
(define-private (is-token-manager)
  (default-to false (map-get? token-managers tx-sender))
)

;; Get the balance of a principal
(define-private (get-balance-or-default (owner principal))
  (default-to u0 (map-get? token-balances owner))
)

;; Set a principal as a token manager
(define-public (set-token-manager (manager principal) (is-manager bool))
  (begin
    (asserts! (is-contract-owner) ERR-NOT-AUTHORIZED)
    (map-set token-managers manager is-manager)
    (ok true)
  )
)

;; SIP-010 implementation

;; Transfer tokens (disabled - reputation cannot be transferred)
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  ;; Reputation tokens are non-transferable - return error
  (err u3000)
)

;; Get token name
(define-read-only (get-name)
  (ok TOKEN-NAME)
)

;; Get token symbol
(define-read-only (get-symbol)
  (ok TOKEN-SYMBOL)
)

;; Get token decimals
(define-read-only (get-decimals)
  (ok TOKEN-DECIMALS)
)

;; Get token balance
(define-read-only (get-balance (owner principal))
  (ok (get-balance-or-default owner))
)

;; Get total supply
(define-read-only (get-total-supply)
  (ok (var-get token-supply))
)

;; Get token URI
(define-read-only (get-token-uri)
  (ok (some TOKEN-URI))
)

;; Mint new tokens (only token managers)
(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (or (is-contract-owner) (is-token-manager)) ERR-NOT-AUTHORIZED)
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    
    ;; Update balance
    (map-set token-balances 
      recipient
      (+ (get-balance-or-default recipient) amount))
    
    ;; Update total supply
    (var-set token-supply (+ (var-get token-supply) amount))
    
    (ok amount)
  )
)

;; Mint reputation tokens with category tracking
(define-public (mint-with-category (amount uint) (recipient principal) (category (string-ascii 32)))
  (begin
    (asserts! (or (is-contract-owner) (is-token-manager)) ERR-NOT-AUTHORIZED)
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    
    ;; Update balance
    (map-set token-balances 
      recipient
      (+ (get-balance-or-default recipient) amount))
    
    ;; Update total supply
    (var-set token-supply (+ (var-get token-supply) amount))
    
    ;; Update reputation category
    (match (map-get? reputation-by-category { user: recipient, category: category })
      existing-rep
        (map-set reputation-by-category
          { user: recipient, category: category }
          { amount: (+ (get amount existing-rep) (to-int amount)) })
      
      ;; First time for this category
      (map-set reputation-by-category
        { user: recipient, category: category }
        { amount: (to-int amount) })
    )
    
    (ok amount)
  )
)

;; Burn tokens (only token managers)
(define-public (burn (amount uint) (owner principal))
  (begin
    (asserts! (or (is-contract-owner) (is-token-manager)) ERR-NOT-AUTHORIZED)
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    
    (let ((current-balance (get-balance-or-default owner)))
      ;; Check if owner has enough balance
      (asserts! (>= current-balance amount) ERR-INVALID-AMOUNT)
      
      ;; Update balance
      (map-set token-balances 
        owner
        (- current-balance amount))
      
      ;; Update total supply
      (var-set token-supply (- (var-get token-supply) amount))
      
      (ok amount)
    )
  )
)

;; Burn reputation tokens with category tracking
(define-public (burn-with-category (amount uint) (owner principal) (category (string-ascii 32)))
  (begin
    (asserts! (or (is-contract-owner) (is-token-manager)) ERR-NOT-AUTHORIZED)
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    
    (let ((current-balance (get-balance-or-default owner)))
      ;; Check if owner has enough balance
      (asserts! (>= current-balance amount) ERR-INVALID-AMOUNT)
      
      ;; Update balance
      (map-set token-balances 
        owner
        (- current-balance amount))
      
      ;; Update total supply
      (var-set token-supply (- (var-get token-supply) amount))
      
      ;; Update reputation category
      (match (map-get? reputation-by-category { user: owner, category: category })
        existing-rep
          (map-set reputation-by-category
            { user: owner, category: category }
            { amount: (- (get amount existing-rep) (to-int amount)) })
        
        ;; If category doesn't exist yet, create with negative value
        (map-set reputation-by-category
          { user: owner, category: category }
          { amount: (- 0 (to-int amount)) })
      )
      
      (ok amount)
    )
  )
)

;; Reputation tracking functions

;; Get reputation for a specific category
(define-read-only (get-reputation-by-category (user principal) (category (string-ascii 32)))
  (match (map-get? reputation-by-category { user: user, category: category })
    rep (ok (get amount rep))
    (ok 0)
  )
)

;; Reputation reward functions

;; Reward for completing a quality review
(define-public (reward-quality-review (reviewer principal) (quality-score uint))
  (begin
    (asserts! (or (is-contract-owner) (is-token-manager)) ERR-NOT-AUTHORIZED)
    (asserts! (<= quality-score u5) ERR-INVALID-AMOUNT) ;; Score should be between 0-5
    
    (let ((reward-amount (* quality-score u1000000))) ;; 1-5 tokens based on quality
      (try! (mint-with-category reward-amount reviewer "review-quality"))
      (ok reward-amount)
    )
  )
)

;; Reward for publication acceptance
(define-public (reward-publication-acceptance (author principal))
  (begin
    (asserts! (or (is-contract-owner) (is-token-manager)) ERR-NOT-AUTHORIZED)
    
    (let ((reward-amount u10000000)) ;; 10 tokens for accepted publication
      (try! (mint-with-category reward-amount author "publication-accepted"))
      (ok reward-amount)
    )
  )
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
