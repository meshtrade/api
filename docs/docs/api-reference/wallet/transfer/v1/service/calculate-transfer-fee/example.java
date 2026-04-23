import co.meshtrade.api.type.v1.Amount.Amount;
import co.meshtrade.api.type.v1.Decimal.Decimal;
import co.meshtrade.api.type.v1.Ledger;
import co.meshtrade.api.type.v1.Type.Token;
import co.meshtrade.api.wallet.transfer.v1.TransferService;
import co.meshtrade.api.wallet.transfer.v1.Service.CalculateTransferFeeRequest;
import co.meshtrade.api.wallet.transfer.v1.Service.CalculateTransferFeeResponse;

import java.util.Optional;

public class CalculateTransferFeeExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (TransferService service = new TransferService()) {
            // Create request with the transfer amount to calculate fees for
            CalculateTransferFeeRequest request = CalculateTransferFeeRequest.newBuilder()
                .setAmount(Amount.newBuilder()
                    .setToken(Token.newBuilder()
                        .setCode("USDC")
                        .setIssuer("GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN")
                        .setLedger(Ledger.LEDGER_STELLAR)
                        .build())
                    .setValue(Decimal.newBuilder()
                        .setValue("1000.00")
                        .build())
                    .build())
                .build();

            // Call the CalculateTransferFee method
            CalculateTransferFeeResponse response = service.calculateTransferFee(request, Optional.empty());

            // Display the fee breakdown
            System.out.println("Transfer fee breakdown:");
            System.out.println("  Fee Amount: " + response.getFeeAmount().getValue().getValue()
                + " " + response.getFeeAmount().getToken().getCode());
            System.out.println("  VAT Amount: " + response.getVatAmount().getValue().getValue()
                + " " + response.getVatAmount().getToken().getCode());
            System.out.println("  VAT Rate: " + response.getVatRate().getValue());
        } catch (Exception e) {
            System.err.println("CalculateTransferFee failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}