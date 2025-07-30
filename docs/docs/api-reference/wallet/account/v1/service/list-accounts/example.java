import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.ListAccountsRequest;
import co.meshtrade.api.wallet.account.v1.Service.ListAccountsResponse;

import java.util.Optional;

public class ListAccountsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Create request with service-specific parameters
            ListAccountsRequest request = ListAccountsRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the ListAccounts method
            ListAccountsResponse response = service.listAccounts(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("ListAccounts successful: " + response);
        } catch (Exception e) {
            System.err.println("ListAccounts failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}