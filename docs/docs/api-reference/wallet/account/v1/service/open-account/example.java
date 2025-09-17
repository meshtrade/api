import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.OpenAccountRequest;
import co.meshtrade.api.wallet.account.v1.Service.OpenAccountResponse;

import java.util.Optional;

public class OpenAccountExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Open a previously created account on the blockchain
            OpenAccountRequest request = OpenAccountRequest.newBuilder()
                .setName("accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C")  // Account to open
                .build();

            // Call the OpenAccount method
            OpenAccountResponse response = service.openAccount(request, Optional.empty());

            // Account is now open on the blockchain
            System.out.println("Account opened successfully on blockchain:");
            System.out.println("  Account Name: " + response.getAccount().getName());
            System.out.println("  Account Number: " + response.getAccount().getNumber());
            System.out.println("  Ledger ID: " + response.getAccount().getLedgerId());
            System.out.println("  State: " + response.getAccount().getState());
            System.out.println("  Transaction: " + response.getLedgerTransaction());
            System.out.println("\nUse the transaction reference to monitor the blockchain operation.");
        } catch (Exception e) {
            System.err.println("OpenAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}