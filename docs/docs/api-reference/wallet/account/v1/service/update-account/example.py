from meshtrade.wallet.account.v1 import (
    AccountService,
    GetAccountRequest,
    UpdateAccountRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Get the existing account first
        existing_account = service.get_account(GetAccountRequest(name="accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C", populate_ledger_data=False))

        # Update only the display name
        existing_account.display_name = "Updated Trading Account Name"

        # Create request with updated account
        request = UpdateAccountRequest(account=existing_account)

        # Call the UpdateAccount method
        account = service.update_account(request)

        # Display the updated account
        print("Account updated successfully:")
        print(f"  Name: {account.name}")
        print(f"  Display Name: {account.display_name}")
        print(f"  Number: {account.number}")
        print(f"  Ledger: {account.ledger}")


if __name__ == "__main__":
    main()
