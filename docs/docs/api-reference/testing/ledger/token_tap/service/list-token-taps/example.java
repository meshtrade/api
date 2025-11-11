import co.meshtrade.api.testing.ledger.token_tap.LedgerService;
import co.meshtrade.api.testing.ledger.token_tap.Service.ListTokenTapsRequest;
import co.meshtrade.api.testing.ledger.token_tap.Service.ListTokenTapsResponse;
import co.meshtrade.api.type.v1.Token;

import java.util.Optional;

public class ListTokenTapsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LedgerService service = new LedgerService()) {
            // Create request with service-specific parameters
            ListTokenTapsRequest request = ListTokenTapsRequest.newBuilder()
                .build();

            // Call the ListTokenTaps method
            ListTokenTapsResponse response = service.listTokenTaps(request, Optional.empty());

            // Process the response tokens
            for (Token token : response.getTokenList()) {
                System.out.printf("Token - Code: %s, Issuer: %s, Ledger: %s%n",
                    token.getCode(), token.getIssuer(), token.getLedger());
            }
        } catch (Exception e) {
            System.err.println("ListTokenTaps failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}