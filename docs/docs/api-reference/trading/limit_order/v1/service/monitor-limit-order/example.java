import co.meshtrade.api.trading.limit_order.v1.LimitOrderOuterClass.LimitOrder;
import co.meshtrade.api.trading.limit_order.v1.LimitOrderOuterClass.LimitOrderStatus;
import co.meshtrade.api.trading.limit_order.v1.LimitOrderService;
import co.meshtrade.api.trading.limit_order.v1.Service.MonitorLimitOrderRequest;

import java.util.Iterator;
import java.util.Optional;

public class MonitorLimitOrderExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LimitOrderService service = new LimitOrderService()) {
            // Monitor limit orders in real-time via server-side streaming
            // Replace with an actual account resource name from your system
            String accountName = "groups/12345/accounts/67890";

            MonitorLimitOrderRequest request = MonitorLimitOrderRequest.newBuilder()
                // Optional: Filter by account (monitor only orders for this account)
                .setAccount(accountName)
                // Optional: Filter by external reference
                // .setExternalReference("my-trading-system-order-123")
                .build();

            // Call the MonitorLimitOrder streaming method
            // This opens a long-lived server-side stream that pushes order updates
            Iterator<LimitOrder> stream = service.monitorLimitOrder(request, Optional.empty());

            System.out.println("✓ Monitoring limit orders for account: " + accountName);
            System.out.println("  Listening for real-time updates... (Ctrl+C to stop)");

            // Consume stream responses
            // The server pushes updates whenever order status changes on the ledger
            int updateCount = 0;
            while (stream.hasNext()) {
                LimitOrder limitOrder = stream.next();

                // Process each order update as it arrives
                updateCount++;
                System.out.println("\n📡 Update #" + updateCount + " received:");
                System.out.println("  Resource name: " + limitOrder.getName());
                System.out.println("  Account: " + limitOrder.getAccount());
                System.out.println("  External ref: " + limitOrder.getExternalReference());
                System.out.println("  Side: " + limitOrder.getSide());
                System.out.println("  Status: " + limitOrder.getStatus());
                System.out.println("  Limit price: " + limitOrder.getLimitPrice().getValue().getValue() +
                                 " " + limitOrder.getLimitPrice().getToken().getCode());
                System.out.println("  Quantity: " + limitOrder.getQuantity().getValue().getValue() +
                                 " " + limitOrder.getQuantity().getToken().getCode());

                // Example: React to specific status changes
                if (limitOrder.getStatus() == LimitOrderStatus.LIMIT_ORDER_STATUS_FILLED) {
                    System.out.println("  🎉 Order fully filled!");
                } else if (limitOrder.getStatus() == LimitOrderStatus.LIMIT_ORDER_STATUS_CANCELLED) {
                    System.out.println("  ❌ Order cancelled");
                } else if (limitOrder.getStatus() == LimitOrderStatus.LIMIT_ORDER_STATUS_PARTIALLY_FILLED) {
                    System.out.println("  ⏳ Order partially filled");
                }
            }

            System.out.println("\n✓ Stream completed successfully");
        } catch (Exception e) {
            System.err.println("MonitorLimitOrder stream failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
