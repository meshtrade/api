import co.meshtrade.api.testing.ledger.tap.v1.TokenTapService;
import co.meshtrade.api.testing.ledger.tap.v1.Service.ListTokenTapsRequest;
import co.meshtrade.api.testing.ledger.tap.v1.Service.ListTokenTapsResponse;
import co.meshtrade.api.type.v1.Token;

import java.util.List;
import java.util.Optional;

public class ListTokenTapsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (TokenTapService service = new TokenTapService()) {
            // List all available tokens that can be minted through the tap service
            // The ListTokenTapsRequest takes no parameters
            ListTokenTapsRequest request = ListTokenTapsRequest.newBuilder()
                .build();

            // Call the ListTokenTaps method to retrieve available tokens
            ListTokenTapsResponse response = service.listTokenTaps(
                request,
                Optional.empty()
            );

            // Process the list of available tokens
            List<Token> tokens = response.getTokensList();
            System.out.println("Available tokens: " + tokens.size());
            for (int i = 0; i < tokens.size(); i++) {
                System.out.println("Token " + (i + 1) + ": " + tokens.get(i));
            }
        } catch (Exception e) {
            System.err.println("ListTokenTaps failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}