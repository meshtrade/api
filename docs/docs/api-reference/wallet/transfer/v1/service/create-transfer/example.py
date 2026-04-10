from meshtrade.type.v1 import Amount, Decimal, Ledger, Token
from meshtrade.wallet.transfer.v1 import (
    CreateTransferRequest,
    Transfer,
    TransferService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = TransferService()

    with service:
        # Create request with transfer details
        request = CreateTransferRequest(
            transfer=Transfer(
                owner=service.group(),  # Current group from service context
                from_="GBZH4LMGAYUDNFPNFGOBKU76DDRJHIAKGKGO2LNZFLQB6DMKV7EYHT",  # Source ledger address
                to="GCWNBLOHV5DKRG5UXKMO5IDAJLVSRRPGZJ5REWQPCT2LGXVQZQGWE3F",  # Destination ledger address
                amount=Amount(
                    token=Token(
                        code="USDC",
                        issuer="GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
                        ledger=Ledger.LEDGER_STELLAR,
                    ),
                    value=Decimal(value="100.50"),
                ),
            )
        )

        # Call the CreateTransfer method
        transfer = service.create_transfer(request)

        # Transfer has been created and submitted on-chain
        print("Transfer created successfully:")
        print(f"  Name: {transfer.name}")
        print(f"  Number: {transfer.number}")
        print(f"  State: {transfer.state}")
        print(f"  Fee: {transfer.fee.amount.value}")


if __name__ == "__main__":
    main()
