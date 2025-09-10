import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.OpenAccountRequest;
import co.meshtrade.api.wallet.account.v1.Service.OpenAccountResponse;

import java.util.Optional;

public class OpenAccountExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Create request with service-specific parameters
            OpenAccountRequest request = OpenAccountRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the OpenAccount method
            OpenAccountResponse response = service.openAccount(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("OpenAccount successful: " + response);
        } catch (Exception e) {
            System.err.println("OpenAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}