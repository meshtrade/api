import co.meshtrade.api.testing.ledger.token_tap.LedgerService;
import co.meshtrade.api.testing.ledger.token_tap.Service.InitialiseTokenTapsRequest;

import java.util.Optional;

public class InitialiseTokenTapsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LedgerService service = new LedgerService()) {
            // Create request (no parameters required)
            InitialiseTokenTapsRequest request = InitialiseTokenTapsRequest.newBuilder()
                .build();

            // Call the InitialiseTokenTaps method
            service.initialiseTokenTaps(request, Optional.empty());

            System.out.println("InitialiseTokenTaps successful");
        } catch (Exception e) {
            System.err.println("InitialiseTokenTaps failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}