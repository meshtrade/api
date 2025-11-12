from meshtrade.dev.ledger.token_tap import (
    InitialiseTokenTapsRequest,
    LedgerService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LedgerService()

    with service:
        # Create request with service-specific parameters
        request = InitialiseTokenTapsRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the InitialiseTokenTaps method
        response = service.initialise_token_taps(request)

        # FIXME: Add relevant response object usage
        print("InitialiseTokenTaps successful:", response)


if __name__ == "__main__":
    main()
