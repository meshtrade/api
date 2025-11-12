import co.meshtrade.api.dev.ledger.tap.LedgerService;
import co.meshtrade.api.dev.ledger.tap.Service.InitialiseTokenTapsRequest;
import co.meshtrade.api.dev.ledger.tap.Service.InitialiseTokenTapsResponse;

import java.util.Optional;

public class InitialiseTokenTapsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LedgerService service = new LedgerService()) {
            // Create request with service-specific parameters
            InitialiseTokenTapsRequest request = InitialiseTokenTapsRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the InitialiseTokenTaps method
            InitialiseTokenTapsResponse response = service.initialiseTokenTaps(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("InitialiseTokenTaps successful: " + response);
        } catch (Exception e) {
            System.err.println("InitialiseTokenTaps failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}