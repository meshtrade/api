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
        # Search for accounts by display name substring
        request = SearchAccountsRequest(
            display_name="Trading",         # Search for accounts with "Trading" in name
            populate_ledger_data=False,     # Set to True to fetch live blockchain data
            sorting=SearchAccountsRequest.Sorting(
                field="number"              # Sort by account number
            )
        )

        # Call the SearchAccounts method
        response = service.search_accounts(request)

        # Display search results
        print(f"Found {len(response.accounts)} accounts matching '{request.display_name}':")
        for account in response.accounts:
            print(f"  Account {account.number}:")
            print(f"    Name: {account.name}")
            print(f"    Display Name: {account.display_name}")
            print(f"    Ledger: {account.ledger}")
            print(f"    State: {account.state}")


if __name__ == "__main__":
    main()
