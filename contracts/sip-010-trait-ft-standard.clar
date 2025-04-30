;; SIP-010 Fungible Token Standard Trait
;; This contract defines the trait that implements the SIP-010 fungible token standard.

(define-trait sip-010-trait
  (
    ;; Transfer token to a specified principal
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))

    ;; Get token name
    (get-name () (response (string-ascii 32) uint))

    ;; Get token symbol
    (get-symbol () (response (string-ascii 32) uint))

    ;; Get token decimals
    (get-decimals () (response uint uint))

    ;; Get token balance
    (get-balance (principal) (response uint uint))

    ;; Get total supply
    (get-total-supply () (response uint uint))

    ;; Get token URI
    (get-token-uri () (response (optional (string-utf8 256)) uint))

    ;; Optional - Mint new tokens. If implemented, this function should be access-protected
    ;; Returns the amount of tokens minted.
    (mint (uint principal) (response uint uint))

    ;; Optional - Burn tokens. If implemented, this function should be access-protected or only allow users to burn their own tokens.
    ;; Returns the amount of tokens burned.
    (burn (uint principal) (response uint uint))
  )
)
