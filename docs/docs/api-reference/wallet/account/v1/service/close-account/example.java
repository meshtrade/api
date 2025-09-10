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
            // Close an existing account on the blockchain
            CloseAccountRequest request = CloseAccountRequest.newBuilder()
                .setName("accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C")  // Account to close
                .build();

            // Call the CloseAccount method
            CloseAccountResponse response = service.closeAccount(request, Optional.empty());

            // Account is now closed on the blockchain
            System.out.println("Account closed successfully on blockchain:");
            System.out.println("  Account Name: " + response.getAccount().getName());
            System.out.println("  Account Number: " + response.getAccount().getNumber());
            System.out.println("  State: " + response.getAccount().getState());
            System.out.println("  Transaction: " + response.getLedgerTransaction());
            System.out.println("\nAccount remains queryable for historical purposes.");
        } catch (Exception e) {
            System.err.println("CloseAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}