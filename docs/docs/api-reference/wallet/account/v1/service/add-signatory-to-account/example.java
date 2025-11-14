import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.AddSignatoryToAccountRequest;
import co.meshtrade.api.wallet.account.v1.Service.AddSignatoryToAccountResponse;

import java.util.Optional;

public class AddSignatoryToAccountExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Create request with service-specific parameters
            AddSignatoryToAccountRequest request = AddSignatoryToAccountRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the AddSignatoryToAccount method
            AddSignatoryToAccountResponse response = service.addSignatoryToAccount(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("AddSignatoryToAccount successful: " + response);
        } catch (Exception e) {
            System.err.println("AddSignatoryToAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}