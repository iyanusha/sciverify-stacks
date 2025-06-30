;; title: Governance Contract
;; version: 1.0.0
;; description: This contract manages the governance process for the SciVerify system

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u5000))
(define-constant ERR-ALREADY-EXISTS (err u5001))
(define-constant ERR-DOES-NOT-EXIST (err u5002))
(define-constant ERR-INVALID-STATE (err u5003))
(define-constant ERR-VOTING-ENDED (err u5004))
(define-constant ERR-ALREADY-VOTED (err u5005))
(define-constant ERR-INSUFFICIENT-VOTES (err u5006))
(define-constant ERR-PROPOSAL-ACTIVE (err u5007))
(define-constant ERR-PROPOSAL-NOT-ACTIVE (err u5008))
(define-constant ERR-PROPOSAL-NOT-PASSED (err u5009))
(define-constant ERR-TOKEN-ERROR (err u5010))

;; Proposal status constants
(define-constant STATUS-ACTIVE u1)
(define-constant STATUS-PASSED u2)
(define-constant STATUS-REJECTED u3)
(define-constant STATUS-EXECUTED u4)

;; Proposal types
(define-constant PROPOSAL-TYPE-PARAMETER u1)  ;; Protocol parameter change
(define-constant PROPOSAL-TYPE-CONTRACT u2)   ;; Contract upgrade
(define-constant PROPOSAL-TYPE-FEATURE u3)    ;; Feature addition

;; Contract owner
(define-data-var contract-owner principal tx-sender)

;; Proposals data structure
(define-map proposals
  { proposal-id: uint }
  {
    title: (string-utf8 256),
    description: (string-utf8 1024),
    proposer: principal,
    proposal-type: uint,
    status: uint,
    created-at: uint,
    voting-ends-at: uint,
    yes-votes: uint,
    no-votes: uint,
    parameter-key: (optional (string-ascii 64)),   ;; If changing a parameter
    parameter-value: (optional (string-utf8 256)), ;; The new value
    contract-address: (optional principal),        ;; If upgrading a contract
    implementation-data: (optional (buff 256))     ;; Additional data for execution
  }
)

;; Track votes by users
(define-map user-votes
  { proposal-id: uint, voter: principal }
  { 
    vote: bool,  ;; true for yes, false for no
    weight: uint ;; voting weight (based on reputation tokens)
  }
)

;; Proposal counter
(define-data-var last-proposal-id uint u0)

;; Minimum token balance required to create proposals
(define-data-var min-proposal-tokens uint u10000000) ;; 10 tokens

;; Minimum token balance required to vote
(define-data-var min-voting-tokens uint u1000000) ;; 1 token

;; Threshold percentage for proposal to pass (e.g., u66 for 66%)
(define-data-var pass-threshold uint u66)

;; Authorization check
(define-private (is-contract-owner)
  (is-eq tx-sender (var-get contract-owner))
)

;; Get the next proposal ID
(define-private (get-next-proposal-id)
  (let ((next-id (+ (var-get last-proposal-id) u1)))
    (var-set last-proposal-id next-id)
    next-id
  )
)

;; Check if user has enough tokens to create a proposal
(define-private (has-proposal-rights)
  (let ((balance (unwrap! (contract-call? .reputation-token get-balance tx-sender) false)))
    (>= balance (var-get min-proposal-tokens))
  )
)

;; Check if user has enough tokens to vote
(define-private (has-voting-rights)
  (let ((balance (unwrap! (contract-call? .reputation-token get-balance tx-sender) false)))
    (>= balance (var-get min-voting-tokens))
  )
)

;; Calculate user's voting weight based on reputation tokens
(define-private (calculate-voting-weight)
  (unwrap! (contract-call? .reputation-token get-balance tx-sender) u0)
)

;; Create a new proposal
(define-public (create-proposal
  (title (string-utf8 256))
  (description (string-utf8 1024))
  (proposal-type uint)
  (voting-period uint)
  (parameter-key (optional (string-ascii 64)))
  (parameter-value (optional (string-utf8 256)))
  (contract-address (optional principal))
  (implementation-data (optional (buff 256)))
)
  (begin
    ;; Check if user has enough tokens to create proposal
    (asserts! (has-proposal-rights) ERR-INSUFFICIENT-VOTES)
    
    ;; Validate proposal type
    (asserts! (or
              (is-eq proposal-type PROPOSAL-TYPE-PARAMETER)
              (is-eq proposal-type PROPOSAL-TYPE-CONTRACT)
              (is-eq proposal-type PROPOSAL-TYPE-FEATURE))
            ERR-INVALID-STATE)
    
    ;; Create proposal
    (let ((proposal-id (get-next-proposal-id))
          (current-block-height stacks-block-height))
      
      (map-set proposals
        { proposal-id: proposal-id }
        {
          title: title,
          description: description,
          proposer: tx-sender,
          proposal-type: proposal-type,
          status: STATUS-ACTIVE,
          created-at: current-block-height,
          voting-ends-at: (+ current-block-height voting-period),
          yes-votes: u0,
          no-votes: u0,
          parameter-key: parameter-key,
          parameter-value: parameter-value,
          contract-address: contract-address,
          implementation-data: implementation-data
        }
      )
      
      (ok proposal-id)
    )
  )
)

;; Vote on a proposal
(define-public (vote (proposal-id uint) (support bool))
  (begin
    ;; Check if user has enough tokens to vote
    (asserts! (has-voting-rights) ERR-INSUFFICIENT-VOTES)
    
    ;; Get proposal
    (let ((proposal (unwrap! (map-get? proposals { proposal-id: proposal-id }) ERR-DOES-NOT-EXIST)))
      
      ;; Check if proposal is active
      (asserts! (is-eq (get status proposal) STATUS-ACTIVE) ERR-PROPOSAL-NOT-ACTIVE)
      
      ;; Check if voting has ended
      (asserts! (< stacks-block-height (get voting-ends-at proposal)) ERR-VOTING-ENDED)
      
      ;; Check if user has already voted
      (asserts! (is-none (map-get? user-votes { proposal-id: proposal-id, voter: tx-sender })) ERR-ALREADY-VOTED)
      
      ;; Cast vote
      (let ((voting-weight (calculate-voting-weight)))
        ;; Record vote
        (map-set user-votes
          { proposal-id: proposal-id, voter: tx-sender }
          { 
            vote: support,
            weight: voting-weight
          }
        )
        
        ;; Update vote totals
        (if support
          ;; Yes vote
          (map-set proposals
            { proposal-id: proposal-id }
            (merge proposal { 
              yes-votes: (+ (get yes-votes proposal) voting-weight)
            })
          )
          ;; No vote
          (map-set proposals
            { proposal-id: proposal-id }
            (merge proposal { 
              no-votes: (+ (get no-votes proposal) voting-weight)
            })
          )
        )
        
        (ok true)
      )
    )
  )
)

;; Finalize a proposal after voting period ends
(define-public (finalize-proposal (proposal-id uint))
  (begin
    ;; Get proposal
    (let ((proposal (unwrap! (map-get? proposals { proposal-id: proposal-id }) ERR-DOES-NOT-EXIST)))
      
      ;; Check if proposal is active
      (asserts! (is-eq (get status proposal) STATUS-ACTIVE) ERR-PROPOSAL-NOT-ACTIVE)
      
      ;; Check if voting has ended
      (asserts! (>= stacks-block-height (get voting-ends-at proposal)) ERR-PROPOSAL-ACTIVE)
      
      ;; Calculate total votes
      (let ((total-votes (+ (get yes-votes proposal) (get no-votes proposal)))
            (yes-percentage (if (> total-votes u0)
                               (/ (* (get yes-votes proposal) u100) total-votes)
                               u0)))
        
        ;; Update proposal status based on voting results
        (map-set proposals
          { proposal-id: proposal-id }
          (merge proposal { 
            status: (if (>= yes-percentage (var-get pass-threshold))
                       STATUS-PASSED
                       STATUS-REJECTED)
          })
        )
        
        (ok true)
      )
    )
  )
)

;; Execute a passed proposal
(define-public (execute-proposal (proposal-id uint))
  (begin
    ;; Get proposal
    (let ((proposal (unwrap! (map-get? proposals { proposal-id: proposal-id }) ERR-DOES-NOT-EXIST)))
      
      ;; Check if proposal has passed
      (asserts! (is-eq (get status proposal) STATUS-PASSED) ERR-PROPOSAL-NOT-PASSED)
      
      ;; Mark proposal as executed
      (map-set proposals
        { proposal-id: proposal-id }
        (merge proposal { status: STATUS-EXECUTED })
      )
      
      ;; In a real implementation, this would actually execute the proposal
      ;; based on the proposal type, parameters, etc.
      ;; For now, we just return success
      (ok true)
    )
  )
)

;; Cancel a proposal (only proposer or contract owner)
(define-public (cancel-proposal (proposal-id uint))
  (begin
    ;; Get proposal
    (let ((proposal (unwrap! (map-get? proposals { proposal-id: proposal-id }) ERR-DOES-NOT-EXIST)))
      
      ;; Check if caller is proposer or contract owner
      (asserts! (or
                (is-eq tx-sender (get proposer proposal))
                (is-contract-owner))
              ERR-NOT-AUTHORIZED)
      
      ;; Check if proposal is active
      (asserts! (is-eq (get status proposal) STATUS-ACTIVE) ERR-PROPOSAL-NOT-ACTIVE)
      
      ;; Mark proposal as rejected
      (map-set proposals
        { proposal-id: proposal-id }
        (merge proposal { status: STATUS-REJECTED })
      )
      
      (ok true)
    )
  )
)

;; Update governance parameters (only contract owner)
(define-public (update-min-proposal-tokens (new-min uint))
  (begin
    (asserts! (is-contract-owner) ERR-NOT-AUTHORIZED)
    (var-set min-proposal-tokens new-min)
    (ok true)
  )
)

(define-public (update-min-voting-tokens (new-min uint))
  (begin
    (asserts! (is-contract-owner) ERR-NOT-AUTHORIZED)
    (var-set min-voting-tokens new-min)
    (ok true)
  )
)

(define-public (update-pass-threshold (new-threshold uint))
  (begin
    (asserts! (is-contract-owner) ERR-NOT-AUTHORIZED)
    (asserts! (<= new-threshold u100) ERR-INVALID-STATE)
    (var-set pass-threshold new-threshold)
    (ok true)
  )
)

;; Read-only functions

;; Get proposal by ID
(define-read-only (get-proposal (proposal-id uint))
  (ok (map-get? proposals { proposal-id: proposal-id }))
)

;; Get user's vote on a proposal
(define-read-only (get-user-vote (proposal-id uint) (voter principal))
  (ok (map-get? user-votes { proposal-id: proposal-id, voter: voter }))
)

;; Get the current governance parameters
(define-read-only (get-governance-parameters)
  (ok {
    min-proposal-tokens: (var-get min-proposal-tokens),
    min-voting-tokens: (var-get min-voting-tokens),
    pass-threshold: (var-get pass-threshold)
  })
)

;; Get the last proposal ID
(define-read-only (get-last-proposal-id)
  (ok (var-get last-proposal-id))
)

;; Check if a proposal has passed
(define-read-only (has-proposal-passed (proposal-id uint))
  (match (map-get? proposals { proposal-id: proposal-id })
    proposal (ok (or
                 (is-eq (get status proposal) STATUS-PASSED)
                 (is-eq (get status proposal) STATUS-EXECUTED)))
    (ok false)
  )
)

;; Check if voting is still open for a proposal
(define-read-only (is-voting-open (proposal-id uint))
  (match (map-get? proposals { proposal-id: proposal-id })
    proposal (ok (and
                 (is-eq (get status proposal) STATUS-ACTIVE)
                 (< stacks-block-height (get voting-ends-at proposal))))
    (ok false)
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
