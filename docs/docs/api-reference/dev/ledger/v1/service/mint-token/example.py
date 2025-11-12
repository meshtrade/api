from meshtrade.dev.ledger.v1 import (
    LedgerService,
    MintTokenRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LedgerService()

    with service:
        # Create request with service-specific parameters
        request = MintTokenRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the MintToken method
        response = service.mint_token(request)

        # FIXME: Add relevant response object usage
        print("MintToken successful:", response)


if __name__ == "__main__":
    main()
