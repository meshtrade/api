from meshtrade.testing.ledger.token_tap.v1 import (
    InitialiseTokenTapsRequest,
    TokenTapService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = TokenTapService()

    with service:
        # Initialize the token tapping infrastructure
        # The InitialiseTokenTapsRequest takes no parameters
        request = InitialiseTokenTapsRequest()

        # Call the InitialiseTokenTaps method to set up token tapping
        response = service.initialise_token_taps(request)

        # Token tapping infrastructure has been initialized successfully
        print("Token tapping infrastructure initialized successfully:", response)


if __name__ == "__main__":
    main()
