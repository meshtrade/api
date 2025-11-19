import co.meshtrade.api.trading.limit_order.v1.LimitOrderOuterClass.LimitOrder;
import co.meshtrade.api.trading.limit_order.v1.LimitOrderService;
import co.meshtrade.api.trading.limit_order.v1.Service.ListLimitOrdersRequest;
import co.meshtrade.api.trading.limit_order.v1.Service.ListLimitOrdersResponse;

import java.util.Optional;

public class ListLimitOrdersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LimitOrderService service = new LimitOrderService()) {
            // List all limit orders in your group hierarchy
            ListLimitOrdersRequest request = ListLimitOrdersRequest.newBuilder()
                // Optional: Set to true to enrich with live ledger status (slower)
                .setLiveLedgerData(false)
                .build();

            // Call the ListLimitOrders method
            ListLimitOrdersResponse response = service.listLimitOrders(request, Optional.empty());

            // Response contains list of limit orders
            System.out.println("✓ Listed " + response.getLimitOrdersCount() + " limit orders:");
            int i = 1;
            for (LimitOrder order : response.getLimitOrdersList()) {
                System.out.println("\n  Order #" + i + ":");
                System.out.println("    Resource name: " + order.getName());
                System.out.println("    Account: " + order.getAccount());
                System.out.println("    External ref: " + order.getExternalReference());
                System.out.println("    Side: " + order.getSide());
                System.out.println("    Limit price: " + order.getLimitPrice().getValue().getValue() +
                                 " " + order.getLimitPrice().getToken().getCode());
                System.out.println("    Quantity: " + order.getQuantity().getValue().getValue() +
                                 " " + order.getQuantity().getToken().getCode());
                System.out.println("    Status: " + order.getStatus());
                i++;
            }
        } catch (Exception e) {
            System.err.println("ListLimitOrders failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}