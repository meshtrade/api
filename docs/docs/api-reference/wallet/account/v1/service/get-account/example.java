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
                .setName("accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C")  // Account resource name
                .setPopulateLedgerData(true)  // Fetch live blockchain data
                .build();

            // Call the GetAccount method
            Account account = service.getAccount(request, Optional.empty());

            // Display account information
            System.out.println("Account retrieved successfully:");
            System.out.println("  Name: " + account.getName());
            System.out.println("  Number: " + account.getNumber());
            System.out.println("  Display Name: " + account.getDisplayName());
            System.out.println("  Ledger: " + account.getLedger());
            System.out.println("  State: " + account.getState());

            // Display balances if live data was populated
            if (request.getPopulateLedgerData() && !account.getBalancesList().isEmpty()) {
                System.out.println("  Balances:");
                account.getBalancesList().forEach(balance -> 
                    System.out.println("    " + balance.getInstrumentMetadata().getName() + 
                                     ": " + balance.getAmount().getValue())
                );
            }
        } catch (Exception e) {
            System.err.println("GetAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}