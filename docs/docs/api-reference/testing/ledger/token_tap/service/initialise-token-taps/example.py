from meshtrade.testing.ledger.token_tap import (
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
            number="1",
        )

        # Call the InitialiseTokenTaps method
        service.initialise_token_taps(request)

        print("InitialiseTokenTaps successful")


if __name__ == "__main__":
    main()
