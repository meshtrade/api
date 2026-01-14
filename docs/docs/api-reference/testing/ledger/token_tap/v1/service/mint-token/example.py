from meshtrade.testing.ledger.token_tap.v1 import (
    MintTokenOptions,
    MintTokenRequest,
    StellarMintOption,
    StellarMintOptions,
    StellarMintTokenWithMemo,
    TokenTapService,
)
from meshtrade.type.v1 import (
    Amount,
    Decimal,
    Ledger,
    Token,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = TokenTapService()

    with service:
        # Create a test token (USDC on Stellar)
        test_token = Token(
            code="USDC",
            issuer="GBUQWP3BOUZX34ULNQG23RQ6F4BWFIDBIS7XYPV5NPROCEWV2E2YXNU",
            ledger=Ledger.LEDGER_STELLAR,
        )

        # Mint tokens to a test address with optional network-specific options
        request = MintTokenRequest(
            # Specify the amount to mint (required)
            amount=Amount(
                token=test_token,
                value=Decimal(value="1000000"),
            ),
            # Specify the recipient address (required)
            address="GDQXVHH7QVVQSHCXU7ZDM4C2DAQF7UEQWPX3JHG7LJ2YS6FLXJY5E2SZ",
            # Optional: Network-specific options (Stellar or Solana)
            options=MintTokenOptions(
                stellar_mint_options=StellarMintOptions(
                    stellar_mint_options=[
                        StellarMintOption(
                            stellar_mint_token_with_memo=StellarMintTokenWithMemo(
                                memo="test-mint-001",
                            )
                        )
                    ]
                )
            ),
        )

        # Call the MintToken method
        response = service.mint_token(request)

        # Token has been minted successfully
        print("Token minted successfully:", response)


if __name__ == "__main__":
    main()
