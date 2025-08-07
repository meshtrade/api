import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.SearchAccountsRequest;
import co.meshtrade.api.wallet.account.v1.Service.SearchAccountsResponse;

import java.util.Optional;

public class SearchAccountsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Create request with service-specific parameters
            SearchAccountsRequest request = SearchAccountsRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the SearchAccounts method
            SearchAccountsResponse response = service.searchAccounts(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("SearchAccounts successful: " + response);
        } catch (Exception e) {
            System.err.println("SearchAccounts failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}