from meshtrade.testing.ledger.token_tap import (
    LedgerService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LedgerService()

    with service:
        # Call the ListTokenTaps method (no request parameters)
        response = service.list_token_taps()

        # Process the response tokens
        for token in response.token:
            print(f"Token - Code: {token.code}, Issuer: {token.issuer}, Ledger: {token.ledger}")


if __name__ == "__main__":
    main()
