from meshtrade.type.v1 import Ledger, Token
from meshtrade.wallet.account.v1 import (
    AccountService,
    DeregisterTokensFromAccountRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Create request with tokens to deregister
        # IMPORTANT: Token balances must be zero before deregistration will succeed
        # You can deregister 1-10 tokens in a single request
        request = DeregisterTokensFromAccountRequest(
            # Resource name of account to deregister tokens from
            name="accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C",
            # Tokens to deregister from the account
            tokens=[
                Token(
                    code="USDC",
                    issuer="GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
                    ledger=Ledger.LEDGER_STELLAR,
                ),
                Token(
                    code="EURC",
                    issuer="GDHU6WRG4IEQXM5NZ4BMPKOXHW76MZM4Y2IEMFDVXBSDP6SJY4ITNPP2",
                    ledger=Ledger.LEDGER_STELLAR,
                ),
            ],
        )

        # Call the DeregisterTokensFromAccount method
        response = service.deregister_tokens_from_account(request)

        # The response contains a ledger transaction reference to monitor
        print(f"DeregisterTokensFromAccount submitted: {response.ledger_transaction}")
        print("Monitor the transaction state to confirm completion")


if __name__ == "__main__":
    main()
