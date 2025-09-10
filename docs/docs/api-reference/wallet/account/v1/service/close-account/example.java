import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.CloseAccountRequest;
import co.meshtrade.api.wallet.account.v1.Service.CloseAccountResponse;

import java.util.Optional;

public class CloseAccountExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Create request with service-specific parameters
            CloseAccountRequest request = CloseAccountRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the CloseAccount method
            CloseAccountResponse response = service.closeAccount(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("CloseAccount successful: " + response);
        } catch (Exception e) {
            System.err.println("CloseAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}