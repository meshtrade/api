from meshtrade.testing.ledger.token_tap.v1 import (
    ListTokenTapsRequest,
    TokenTapService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = TokenTapService()

    with service:
        # List all available tokens that can be minted through the tap service
        # The ListTokenTapsRequest takes no parameters
        request = ListTokenTapsRequest()

        # Call the ListTokenTaps method to retrieve available tokens
        response = service.list_token_taps(request)

        # Process the list of available tokens
        print(f"Available tokens: {len(response.tokens)}")
        for i, token in enumerate(response.tokens, 1):
            print(f"Token {i}: {token}")


if __name__ == "__main__":
    main()
