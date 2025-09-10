from meshtrade.wallet.account.v1 import (
    AccountService,
    GetAccountByNumberRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Look up account using its 7-digit Account Number
        request = GetAccountByNumberRequest(
            account_number="1234567",  # 7-digit account number
            populate_ledger_data=True  # Fetch live blockchain data
        )

        # Call the GetAccountByNumber method
        account = service.get_account_by_number(request)

        # Display account information retrieved by number
        print(f"Account found by number {request.account_number}:")
        print(f"  Name: {account.name}")
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
