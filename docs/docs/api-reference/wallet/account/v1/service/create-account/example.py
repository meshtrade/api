from meshtrade.type.v1 import Ledger
from meshtrade.wallet.account.v1 import (
    Account,
    AccountService,
    CreateAccountRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Create request with service-specific parameters
        request = CreateAccountRequest(
            account=Account(
                owner="groups/01HQ3K5M8XYZ2NFVJT9BKR7P4C",  # Your group ID
                ledger=Ledger.LEDGER_STELLAR,  # Choose ledger network
                display_name="Primary Trading Account",
            )
        )

        # Call the CreateAccount method
        account = service.create_account(request)

        # The account is created but not yet open on-chain
        print("Account created successfully:")
        print(f"  Name: {account.name}")
        print(f"  Number: {account.number}")
        print(f"  Ledger: {account.ledger}")
        print(f"  State: {account.state}")


if __name__ == "__main__":
    main()
