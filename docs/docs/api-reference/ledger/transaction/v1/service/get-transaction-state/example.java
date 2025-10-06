import co.meshtrade.api.ledger.transaction.v1.TransactionService;
import co.meshtrade.api.ledger.transaction.v1.Service.GetTransactionStateRequest;
import co.meshtrade.api.ledger.transaction.v1.Service.GetTransactionStateResponse;

import java.util.Optional;

public class GetTransactionStateExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (TransactionService service = new TransactionService()) {
            // Create request with service-specific parameters
            GetTransactionStateRequest request = GetTransactionStateRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetTransactionState method
            GetTransactionStateResponse response = service.getTransactionState(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetTransactionState successful: " + response);
        } catch (Exception e) {
            System.err.println("GetTransactionState failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}