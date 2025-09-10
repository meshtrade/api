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
            // Create request with optional parameters
            ListAccountsRequest request = ListAccountsRequest.newBuilder()
                .setPopulateLedgerData(false)  // Set to true to fetch live blockchain data
                .setSorting(ListAccountsRequest.Sorting.newBuilder()
                    .setField("number")        // Sort by account number
                    .build())
                .build();

            // Call the ListAccounts method
            ListAccountsResponse response = service.listAccounts(request, Optional.empty());

            // Display all accounts in the hierarchy
            System.out.println("Found " + response.getAccountsCount() + " accounts:");
            response.getAccountsList().forEach(account -> {
                System.out.println("  Account " + account.getNumber() + ":");
                System.out.println("    Name: " + account.getName());
                System.out.println("    Display Name: " + account.getDisplayName());
                System.out.println("    Ledger: " + account.getLedger());
                System.out.println("    State: " + account.getState());
            });
        } catch (Exception e) {
            System.err.println("ListAccounts failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}