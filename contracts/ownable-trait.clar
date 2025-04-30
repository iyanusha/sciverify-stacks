;; Ownable Trait for Clarity Smart Contracts
;; This trait implements a standard interface for contract ownership management

(define-trait ownable-trait
  (
    ;; Get the current contract owner
    (get-owner () (response principal uint))

    ;; Transfer ownership to a new principal
    (transfer-ownership (principal) (response bool uint))

    ;; Renounce ownership - sets the owner to a zero address
    (renounce-ownership () (response bool uint))
  )
)
