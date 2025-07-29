from meshtrade.wallet.account.v1 import (
    AccountService,
    SearchAccountsRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Create request with service-specific parameters
        request = SearchAccountsRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the SearchAccounts method
        response = service.search_accounts(request)

        # FIXME: Add relevant response object usage
        print("SearchAccounts successful:", response)


if __name__ == "__main__":
    main()
