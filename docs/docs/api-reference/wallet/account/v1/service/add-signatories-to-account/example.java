import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.AddSignatoriesToAccountRequest;
import co.meshtrade.api.wallet.account.v1.Service.AddSignatoriesToAccountResponse;

import java.util.Optional;

public class AddSignatoriesToAccountExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Create request with service-specific parameters
            AddSignatoriesToAccountRequest request = AddSignatoriesToAccountRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the AddSignatoriesToAccount method
            AddSignatoriesToAccountResponse response = service.addSignatoriesToAccount(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("AddSignatoriesToAccount successful: " + response);
        } catch (Exception e) {
            System.err.println("AddSignatoriesToAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}