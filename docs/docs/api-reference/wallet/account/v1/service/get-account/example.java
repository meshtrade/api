import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.GetAccountRequest;
import co.meshtrade.api.wallet.account.v1.Account.Account;

import java.util.Optional;

public class GetAccountExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Create request with service-specific parameters
            GetAccountRequest request = GetAccountRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetAccount method
            Account account = service.getAccount(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetAccount successful: " + account);
        } catch (Exception e) {
            System.err.println("GetAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}