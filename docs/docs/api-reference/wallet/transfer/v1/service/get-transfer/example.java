import co.meshtrade.api.wallet.transfer.v1.TransferService;
import co.meshtrade.api.wallet.transfer.v1.Service.GetTransferRequest;
import co.meshtrade.api.wallet.transfer.v1.Transfer.Transfer;

import java.util.Optional;

public class GetTransferExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (TransferService service = new TransferService()) {
            // Create request with the transfer resource name
            GetTransferRequest request = GetTransferRequest.newBuilder()
                .setName("wallet/transfers/01HQ3K5M8XYZ2NFVJT9BKR7P4C")  // Transfer resource name
                .build();

            // Call the GetTransfer method
            Transfer transfer = service.getTransfer(request, Optional.empty());

            // Display transfer details
            System.out.println("Transfer retrieved successfully:");
            System.out.println("  Name: " + transfer.getName());
            System.out.println("  Number: " + transfer.getNumber());
            System.out.println("  From: " + transfer.getFrom());
            System.out.println("  To: " + transfer.getTo());
            System.out.println("  Amount: " + transfer.getAmount().getValue()
                + " " + transfer.getAmount().getToken().getCode());
            System.out.println("  State: " + transfer.getState());
            System.out.println("  Transaction: " + transfer.getTransaction());
        } catch (Exception e) {
            System.err.println("GetTransfer failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}