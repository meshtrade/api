import co.meshtrade.api.ledger.transaction.v1.TransactionService;
import co.meshtrade.api.ledger.transaction.v1.Service.MonitorTransactionStateRequest;
import co.meshtrade.api.ledger.transaction.v1.Service.MonitorTransactionStateResponse;

import java.util.Optional;

public class MonitorTransactionStateExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (TransactionService service = new TransactionService()) {
            // Create request with service-specific parameters
            MonitorTransactionStateRequest request = MonitorTransactionStateRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the MonitorTransactionState method
            MonitorTransactionStateResponse response = service.monitorTransactionState(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("MonitorTransactionState successful: " + response);
        } catch (Exception e) {
            System.err.println("MonitorTransactionState failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}