import co.meshtrade.api.dev.ledger.v1.LedgerService;
import co.meshtrade.api.dev.ledger.v1.Service.ListTokenTapsRequest;
import co.meshtrade.api.dev.ledger.v1.Service.ListTokenTapsResponse;

import java.util.Optional;

public class ListTokenTapsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LedgerService service = new LedgerService()) {
            // Create request with service-specific parameters
            ListTokenTapsRequest request = ListTokenTapsRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the ListTokenTaps method
            ListTokenTapsResponse response = service.listTokenTaps(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("ListTokenTaps successful: " + response);
        } catch (Exception e) {
            System.err.println("ListTokenTaps failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}