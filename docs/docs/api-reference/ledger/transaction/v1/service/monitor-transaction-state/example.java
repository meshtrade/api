import co.meshtrade.api.ledger.transaction.v1.TransactionService;
import co.meshtrade.api.ledger.transaction.v1.Service.MonitorTransactionStateRequest;
import co.meshtrade.api.ledger.transaction.v1.Service.MonitorTransactionStateResponse;

import java.util.Iterator;
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

            // Call the MonitorTransactionState streaming method
            Iterator<MonitorTransactionStateResponse> stream = service.monitorTransactionState(request, Optional.empty());

            // Consume stream responses using iterator pattern
            while (stream.hasNext()) {
                MonitorTransactionStateResponse response = stream.next();

                // Process each response as it arrives
                System.out.println("Received: " + response);
            }

            System.out.println("Stream completed successfully");
        } catch (Exception e) {
            System.err.println("MonitorTransactionState stream failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
