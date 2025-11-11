import co.meshtrade.api.testing.ledger.token_tap.LedgerService;
import co.meshtrade.api.testing.ledger.token_tap.Service.InitialiseTokenTapsRequest;
import co.meshtrade.api.testing.ledger.token_tap.Service.InitialiseTokenTapsResponse;

import java.util.Optional;

public class InitialiseTokenTapsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LedgerService service = new LedgerService()) {
            // Create request with service-specific parameters
            InitialiseTokenTapsRequest request = InitialiseTokenTapsRequest.newBuilder()
                .build();

            // Call the InitialiseTokenTaps method
            service.initialiseTokenTaps(request, Optional.empty());
        } catch (Exception e) {
            System.err.println("InitialiseTokenTaps failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}