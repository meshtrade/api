import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.GetAccountRequest;
import co.meshtrade.api.wallet.account.v1.Service.UpdateAccountRequest;
import co.meshtrade.api.wallet.account.v1.Account.Account;

import java.util.Optional;

public class UpdateAccountExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Get the existing account first
            GetAccountRequest getRequest = GetAccountRequest.newBuilder()
                .setName("accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C")
                .setPopulateLedgerData(false)
                .build();
            
            Account existingAccount = service.getAccount(getRequest, Optional.empty());

            // Update only the display name
            Account updatedAccount = existingAccount.toBuilder()
                .setDisplayName("Updated Trading Account Name")
                .build();

            // Create request with updated account
            UpdateAccountRequest request = UpdateAccountRequest.newBuilder()
                .setAccount(updatedAccount)
                .build();

            // Call the UpdateAccount method
            Account account = service.updateAccount(request, Optional.empty());

            // Display the updated account
            System.out.println("Account updated successfully:");
            System.out.println("  Name: " + account.getName());
            System.out.println("  Display Name: " + account.getDisplayName());
            System.out.println("  Number: " + account.getNumber());
            System.out.println("  Ledger: " + account.getLedger());
        } catch (Exception e) {
            System.err.println("UpdateAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}