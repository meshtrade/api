import co.meshtrade.api.type.v1.Ledger;
import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.CreateAccountRequest;
import co.meshtrade.api.wallet.account.v1.Account.Account;

import java.util.Optional;

public class CreateAccountExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Create request with service-specific parameters
            CreateAccountRequest request = CreateAccountRequest.newBuilder()
                .setAccount(Account.newBuilder()
                    .setOwner("groups/01HQ3K5M8XYZ2NFVJT9BKR7P4C")  // Your group ID
                    .setLedger(Ledger.LEDGER_STELLAR)  // Choose ledger network
                    .setDisplayName("Primary Trading Account")
                    .build())
                .build();

            // Call the CreateAccount method
            Account account = service.createAccount(request, Optional.empty());

            // The account is created but not yet open on-chain
            System.out.println("Account created successfully:");
            System.out.println("  Name: " + account.getName());
            System.out.println("  Number: " + account.getNumber());
            System.out.println("  Ledger: " + account.getLedger());
            System.out.println("  State: " + account.getState());
        } catch (Exception e) {
            System.err.println("CreateAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}