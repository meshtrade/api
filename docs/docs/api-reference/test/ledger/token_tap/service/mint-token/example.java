import co.meshtrade.api.test.ledger.token_tap.LedgerService;
import co.meshtrade.api.test.ledger.token_tap.Service.MintTokenRequest;
import co.meshtrade.api.test.ledger.token_tap.Service.MintTokenResponse;

import java.util.Optional;

public class MintTokenExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LedgerService service = new LedgerService()) {
            // Create request with service-specific parameters
            MintTokenRequest request = MintTokenRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the MintToken method
            MintTokenResponse response = service.mintToken(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("MintToken successful: " + response);
        } catch (Exception e) {
            System.err.println("MintToken failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}