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
            // Monitor a limit order in real-time via server-side streaming
            // You can use either the resource name or external reference

            // Option 1: Monitor by resource name
            MonitorLimitOrderRequest request = MonitorLimitOrderRequest.newBuilder()
                .setName("limit_orders/01HQVBZ9F8X2T3K4M5N6P7Q8R9")
                .build();

            // Option 2: Monitor by external reference (commented out)
            // MonitorLimitOrderRequest request = MonitorLimitOrderRequest.newBuilder()
            //     .setExternalReference("my-trading-system-order-123")
            //     .build();

            // Call the MonitorLimitOrder streaming method
            // This opens a long-lived server-side stream that pushes order updates
            Iterator<LimitOrder> stream = service.monitorLimitOrder(request, Optional.empty());

            System.out.println("✓ Monitoring limit order for real-time updates...");
            System.out.println("  Listening for status changes... (Ctrl+C to stop)");

            // Consume stream responses
            // The server pushes updates whenever order status changes on the ledger
            monitorOrder:
            while (stream.hasNext()) {
                LimitOrder limitOrder = stream.next();

                // Process each order update as it arrives
                System.out.println("\n📡 Status update received: " + limitOrder.getStatus());
                System.out.println("  Resource name: " + limitOrder.getName());
                System.out.println("  Account: " + limitOrder.getAccount());
                System.out.println("  External ref: " + limitOrder.getExternalReference());
                System.out.println("  Side: " + limitOrder.getSide());
                System.out.println("  Limit price: " + limitOrder.getLimitPrice().getValue().getValue() +
                                 " " + limitOrder.getLimitPrice().getToken().getCode());
                System.out.println("  Quantity: " + limitOrder.getQuantity().getValue().getValue() +
                                 " " + limitOrder.getQuantity().getToken().getCode());

                // Handle order state transitions
                switch (limitOrder.getStatus()) {
                    case LIMIT_ORDER_STATUS_SUBMISSION_IN_PROGRESS:
                        System.out.println("  ⏳ Order submission in progress...");
                        break;

                    case LIMIT_ORDER_STATUS_SUBMISSION_FAILED:
                        System.out.println("  ❌ Order submission failed");
                        break monitorOrder;

                    case LIMIT_ORDER_STATUS_OPEN:
                        System.out.println("  ✓ Order open on ledger and available for matching");
                        // Order is active - continue monitoring for fills
                        break;

                    case LIMIT_ORDER_STATUS_COMPLETE_IN_PROGRESS:
                        System.out.println("  ⏳ Order completion in progress...");
                        break;

                    case LIMIT_ORDER_STATUS_COMPLETE:
                        System.out.println("  🎉 Order completed (fully filled)!");
                        break monitorOrder;

                    case LIMIT_ORDER_STATUS_CANCELLATION_IN_PROGRESS:
                        System.out.println("  ⏳ Order cancellation in progress...");
                        break;

                    case LIMIT_ORDER_STATUS_CANCELLED:
                        System.out.println("  ❌ Order cancelled");
                        break monitorOrder;

                    default:
                        System.out.println("  ⚠️  Unexpected order status: " + limitOrder.getStatus());
                        break;
                }
            }

            System.out.println("\n✓ Stream completed successfully");
        } catch (Exception e) {
            System.err.println("MonitorLimitOrder stream failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
