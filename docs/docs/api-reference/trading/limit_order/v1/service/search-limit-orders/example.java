import co.meshtrade.api.trading.limit_order.v1.LimitOrderOuterClass.LimitOrder;
import co.meshtrade.api.trading.limit_order.v1.LimitOrderService;
import co.meshtrade.api.trading.limit_order.v1.Service.SearchLimitOrdersRequest;
import co.meshtrade.api.trading.limit_order.v1.Service.SearchLimitOrdersResponse;

import java.util.Optional;

public class SearchLimitOrdersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LimitOrderService service = new LimitOrderService()) {
            // Search limit orders with optional filters
            // Replace with an actual account resource name from your system
            String accountName = "groups/12345/accounts/67890";

            SearchLimitOrdersRequest request = SearchLimitOrdersRequest.newBuilder()
                // Optional: Filter by account (returns only orders for this account)
                .setAccount(accountName)
                // Optional: Filter by external reference
                // .setExternalReference("my-trading-system-order-123")
                // Optional: Set to true to enrich with live ledger status
                .setLiveLedgerData(true)
                // Optional: Page size for pagination (default: 50, max: 1000)
                .setPageSize(100)
                // Optional: Page token from previous response for next page
                // .setPageToken("previous-page-token")
                .build();

            // Call the SearchLimitOrders method
            SearchLimitOrdersResponse response = service.searchLimitOrders(request, Optional.empty());

            // Response contains filtered list of limit orders
            System.out.println("✓ Found " + response.getLimitOrdersCount() + " limit orders matching filters:");
            int i = 1;
            for (LimitOrder order : response.getLimitOrdersList()) {
                System.out.println("\n  Order #" + i + ":");
                System.out.println("    Resource name: " + order.getName());
                System.out.println("    Account: " + order.getAccount());
                System.out.println("    External ref: " + order.getExternalReference());
                System.out.println("    Side: " + order.getSide());
                System.out.println("    Status: " + order.getStatus());
                System.out.println("    Limit price: " + order.getLimitPrice().getValue().getValue() +
                                 " " + order.getLimitPrice().getToken().getCode());
                System.out.println("    Quantity: " + order.getQuantity().getValue().getValue() +
                                 " " + order.getQuantity().getToken().getCode());
                i++;
            }

            // Check if there are more pages
            if (!response.getNextPageToken().isEmpty()) {
                System.out.println("\n  Next page token: " + response.getNextPageToken());
                System.out.println("  Use this token in the next request to fetch more orders");
            }
        } catch (Exception e) {
            System.err.println("SearchLimitOrders failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}