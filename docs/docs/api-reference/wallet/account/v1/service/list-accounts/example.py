from meshtrade.type.v1.sorting_pb2 import SORTING_ORDER_ASC
from meshtrade.wallet.account.v1 import (
    AccountService,
    ListAccountsRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Create request with optional parameters
        request = ListAccountsRequest(
            populate_ledger_data=False,  # Set to True to fetch live blockchain data
            sorting=ListAccountsRequest.Sorting(
                field="number",  # Sort by account number
                order=SORTING_ORDER_ASC,  # Ascending order
            ),
        )

        # Call the ListAccounts method
        response = service.list_accounts(request)

        # Display all accounts in the hierarchy
        print(f"Found {len(response.accounts)} accounts:")
        for account in response.accounts:
            print(f"  Account {account.number}:")
            print(f"    Name: {account.name}")
            print(f"    Display Name: {account.display_name}")
            print(f"    Ledger: {account.ledger}")
            print(f"    State: {account.state}")


if __name__ == "__main__":
    main()
