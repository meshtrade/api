import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.RemoveSignatoriesFromAccountRequest;
import co.meshtrade.api.wallet.account.v1.Service.RemoveSignatoriesFromAccountResponse;

import java.util.Optional;

public class RemoveSignatoriesFromAccountExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Create request with service-specific parameters
            RemoveSignatoriesFromAccountRequest request = RemoveSignatoriesFromAccountRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the RemoveSignatoriesFromAccount method
            RemoveSignatoriesFromAccountResponse response = service.removeSignatoriesFromAccount(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("RemoveSignatoriesFromAccount successful: " + response);
        } catch (Exception e) {
            System.err.println("RemoveSignatoriesFromAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}