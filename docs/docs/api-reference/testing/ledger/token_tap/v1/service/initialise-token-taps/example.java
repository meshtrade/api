import co.meshtrade.api.testing.ledger.token_tap.v1.TokenTapService;
import co.meshtrade.api.testing.ledger.token_tap.v1.Service.InitialiseTokenTapsRequest;
import co.meshtrade.api.testing.ledger.token_tap.v1.Service.InitialiseTokenTapsResponse;

import java.util.Optional;

public class InitialiseTokenTapsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (TokenTapService service = new TokenTapService()) {
            // Initialize the token tapping infrastructure
            // The InitialiseTokenTapsRequest takes no parameters
            InitialiseTokenTapsRequest request = InitialiseTokenTapsRequest.newBuilder()
                .build();

            // Call the InitialiseTokenTaps method to set up token tapping
            InitialiseTokenTapsResponse response = service.initialiseTokenTaps(
                request,
                Optional.empty()
            );

            // Token tapping infrastructure has been initialized successfully
            System.out.println("Token tapping infrastructure initialized successfully: " + response);
        } catch (Exception e) {
            System.err.println("InitialiseTokenTaps failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}