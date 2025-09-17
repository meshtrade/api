from meshtrade.wallet.account.v1 import (
    AccountService,
    OpenAccountRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Open a previously created account on the blockchain
        request = OpenAccountRequest(
            name="accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C"  # Account to open
        )

        # Call the OpenAccount method
        response = service.open_account(request)

        # Account is now open on the blockchain
        print("Account opened successfully on blockchain:")
        print(f"  Account Name: {response.account.name}")
        print(f"  Account Number: {response.account.number}")
        print(f"  Ledger ID: {response.account.ledger_id}")
        print(f"  State: {response.account.state}")
        print(f"  Transaction: {response.ledger_transaction}")
        print("\nUse the transaction reference to monitor the blockchain operation.")


if __name__ == "__main__":
    main()
