import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.SearchAccountsRequest;
import co.meshtrade.api.wallet.account.v1.Service.SearchAccountsResponse;
import co.meshtrade.api.type.v1.Sorting.SortingOrder;

import java.util.Optional;

public class SearchAccountsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Search for accounts by display name substring
            SearchAccountsRequest request = SearchAccountsRequest.newBuilder()
                .setDisplayName("Trading")       // Search for accounts with "Trading" in name
                .setPopulateLedgerData(false)    // Set to true to fetch live blockchain data
                .setSorting(SearchAccountsRequest.Sorting.newBuilder()
                    .setField("number")                               // Sort by account number
                    .setOrder(SortingOrder.SORTING_ORDER_DESC)         // Descending order
                    .build())
                .build();

            // Call the SearchAccounts method
            SearchAccountsResponse response = service.searchAccounts(request, Optional.empty());

            // Display search results
            System.out.println("Found " + response.getAccountsCount() + 
                             " accounts matching '" + request.getDisplayName() + "':");
            response.getAccountsList().forEach(account -> {
                System.out.println("  Account " + account.getNumber() + ":");
                System.out.println("    Name: " + account.getName());
                System.out.println("    Display Name: " + account.getDisplayName());
                System.out.println("    Ledger: " + account.getLedger());
                System.out.println("    State: " + account.getState());
            });
        } catch (Exception e) {
            System.err.println("SearchAccounts failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}