from meshtrade.wallet.account.v1 import (
    AccountService,
    CloseAccountRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Close an existing account on the blockchain
        request = CloseAccountRequest(
            name="accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C"  # Account to close
        )

        # Call the CloseAccount method
        response = service.close_account(request)

        # Account is now closed on the blockchain
        print("Account closed successfully on blockchain:")
        print(f"  Account Name: {response.account.name}")
        print(f"  Account Number: {response.account.number}")
        print(f"  State: {response.account.state}")
        print(f"  Transaction: {response.ledger_transaction}")
        print("\nAccount remains queryable for historical purposes.")


if __name__ == "__main__":
    main()
