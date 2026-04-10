import co.meshtrade.api.wallet.transfer.v1.TransferService;
import co.meshtrade.api.wallet.transfer.v1.Service.MonitorTransferRequest;
import co.meshtrade.api.wallet.transfer.v1.Transfer.Transfer;
import co.meshtrade.api.wallet.transfer.v1.Transfer.TransferState;

import java.util.Iterator;
import java.util.Optional;

public class MonitorTransferExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (TransferService service = new TransferService()) {
            // Monitor a specific transfer for real-time state updates
            MonitorTransferRequest request = MonitorTransferRequest.newBuilder()
                .setName("wallet/transfers/01HQ3K5M8XYZ2NFVJT9BKR7P4C")  // Transfer resource name
                .build();

            // Call the MonitorTransfer streaming method
            Iterator<Transfer> stream = service.monitorTransfer(request, Optional.empty());

            // Consume stream responses as the transfer state changes
            while (stream.hasNext()) {
                Transfer transfer = stream.next();

                // React to state changes
                System.out.println("Transfer " + transfer.getNumber()
                    + " state: " + transfer.getState());

                if (transfer.getState() == TransferState.TRANSFER_STATE_SUCCESSFUL) {
                    System.out.println("Transfer completed successfully");
                    System.out.println("  Fee: " + transfer.getFee().getAmount().getValue());
                    break;
                }
                if (transfer.getState() == TransferState.TRANSFER_STATE_FAILED) {
                    System.out.println("Transfer failed");
                    break;
                }
            }
        } catch (Exception e) {
            System.err.println("MonitorTransfer stream failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}