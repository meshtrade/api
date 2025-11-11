from decimal import Decimal

from meshtrade.testing.ledger.token_tap import (
    LedgerService,
    MintTokenRequest,
)
from meshtrade.type.v1 import Amount, Ledger, Token


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LedgerService()

    with service:
        # Create request with service-specific parameters
        request = MintTokenRequest(
            amount=Amount(
                token=Token(
                    code="mZAR",
                    issuer="Emcuqgub4rddZMceYqg5tJHGbtn9AhjdYnmvK9qrkR6b",
                    ledger=Ledger.LEDGER_SOLANA,
                ),
                value=Decimal("10"),
            ),
            address="2kUctW3vK9jBHVE2aUjMqqeZvCHqT5ggZBv5p3nggj1P",
        )

        # Call the MintToken method
        service.mint_token(request)

        print("MintToken successful")


if __name__ == "__main__":
    main()
