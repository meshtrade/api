from meshtrade.type.v1 import Amount, Decimal, Ledger, Token
from meshtrade.wallet.transfer.v1 import (
    CalculateTransferFeeRequest,
    TransferService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = TransferService()

    with service:
        # Create request with the transfer amount to calculate fees for
        request = CalculateTransferFeeRequest(
            amount=Amount(
                token=Token(
                    code="USDC",
                    issuer="GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
                    ledger=Ledger.LEDGER_STELLAR,
                ),
                value=Decimal(value="1000.00"),
            ),
        )

        # Call the CalculateTransferFee method
        response = service.calculate_transfer_fee(request)

        # Display the fee breakdown
        print("Transfer fee breakdown:")
        print(f"  Fee Amount: {response.fee_amount.value.value} {response.fee_amount.token.code}")
        print(f"  VAT Amount: {response.vat_amount.value.value} {response.vat_amount.token.code}")
        print(f"  VAT Rate: {response.vat_rate.value}")


if __name__ == "__main__":
    main()
