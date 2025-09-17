from meshtrade.wallet.account.v1 import (
    AccountService,
    GetAccountRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Create request with service-specific parameters
        request = GetAccountRequest(
            name="accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C",  # Account resource name
            populate_ledger_data=True,  # Fetch live blockchain data
        )

        # Call the GetAccount method
        account = service.get_account(request)

        # Display account information
        print("Account retrieved successfully:")
        print(f"  Name: {account.name}")
        print(f"  Number: {account.number}")
        print(f"  Display Name: {account.display_name}")
        print(f"  Ledger: {account.ledger}")
        print(f"  State: {account.state}")

        # Display balances if live data was populated
        if request.populate_ledger_data and account.balances:
            print("  Balances:")
            for balance in account.balances:
                print(f"    {balance.instrument_metadata.name}: {balance.amount.value}")


if __name__ == "__main__":
    main()
