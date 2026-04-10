import co.meshtrade.api.type.v1.Amount.Amount;
import co.meshtrade.api.type.v1.Decimal.Decimal;
import co.meshtrade.api.type.v1.Ledger;
import co.meshtrade.api.type.v1.Type.Token;
import co.meshtrade.api.wallet.transfer.v1.TransferService;
import co.meshtrade.api.wallet.transfer.v1.Service.CreateTransferRequest;
import co.meshtrade.api.wallet.transfer.v1.Transfer.Transfer;

import java.util.Optional;

public class CreateTransferExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (TransferService service = new TransferService()) {
            // Create request with transfer details
            CreateTransferRequest request = CreateTransferRequest.newBuilder()
                .setTransfer(Transfer.newBuilder()
                    .setOwner(service.group())  // Current group from service context
                    .setFrom("GBZH4LMGAYUDNFPNFGOBKU76DDRJHIAKGKGO2LNZFLQB6DMKV7EYHT")  // Source ledger address
                    .setTo("GCWNBLOHV5DKRG5UXKMO5IDAJLVSRRPGZJ5REWQPCT2LGXVQZQGWE3F")  // Destination ledger address
                    .setAmount(Amount.newBuilder()
                        .setToken(Token.newBuilder()
                            .setCode("USDC")
                            .setIssuer("GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN")
                            .setLedger(Ledger.LEDGER_STELLAR)
                            .build())
                        .setValue(Decimal.newBuilder()
                            .setValue("100.50")
                            .build())
                        .build())
                    .setDescription("Payment for invoice #1234")  // Optional reason for the transfer
                    .setIncludeInLedger(true)  // Include description in on-chain transaction
                    .build())
                .build();

            // Call the CreateTransfer method
            Transfer transfer = service.createTransfer(request, Optional.empty());

            // Transfer has been created and submitted on-chain
            System.out.println("Transfer created successfully:");
            System.out.println("  Name: " + transfer.getName());
            System.out.println("  Number: " + transfer.getNumber());
            System.out.println("  State: " + transfer.getState());
            System.out.println("  Fee: " + transfer.getFee().getAmount().getValue());
        } catch (Exception e) {
            System.err.println("CreateTransfer failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}