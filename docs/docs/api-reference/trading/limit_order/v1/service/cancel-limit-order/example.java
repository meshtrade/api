import co.meshtrade.api.trading.limit_order.v1.LimitOrderOuterClass.LimitOrder;
import co.meshtrade.api.trading.limit_order.v1.LimitOrderOuterClass.LimitOrderStatus;
import co.meshtrade.api.trading.limit_order.v1.LimitOrderService;
import co.meshtrade.api.trading.limit_order.v1.Service.CancelLimitOrderRequest;
import co.meshtrade.api.trading.limit_order.v1.Service.MonitorLimitOrderRequest;

import java.util.Iterator;
import java.util.Optional;

public class CancelLimitOrderExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LimitOrderService service = new LimitOrderService()) {
            // Cancel an active limit order by its resource name
            // Replace with an actual limit order resource name from your system
            String orderName = "limit_orders/01HQVBZ9F8X2T3K4M5N6P7Q8R9";

            CancelLimitOrderRequest request = CancelLimitOrderRequest.newBuilder()
                .setName(orderName)
                .build();

            // Call the CancelLimitOrder method
            LimitOrder response = service.cancelLimitOrder(request, Optional.empty());

            // Response contains the cancellation status
            System.out.println("✓ Limit order cancellation initiated:");
            System.out.println("  Order name: " + orderName);
            System.out.println("  Status: " + response.getStatus());

            // Monitor the order until cancellation is complete
            System.out.println("\n📡 Monitoring order until cancellation is complete...");
            MonitorLimitOrderRequest monitorRequest = MonitorLimitOrderRequest.newBuilder()
                .setName(orderName)
                .build();

            Iterator<LimitOrder> stream = service.monitorLimitOrder(monitorRequest, Optional.empty());

            monitorOrder:
            while (stream.hasNext()) {
                LimitOrder update = stream.next();
                System.out.println("  Status: " + update.getStatus());

                switch (update.getStatus()) {
                    case LIMIT_ORDER_STATUS_CANCELLATION_IN_PROGRESS:
                        System.out.println("  ⏳ Order cancellation in progress...");
                        break;

                    case LIMIT_ORDER_STATUS_CANCELLED:
                        System.out.println("  ✓ Order successfully cancelled on ledger!");
                        break monitorOrder;

                    default:
                        break;
                }
            }
        } catch (Exception e) {
            System.err.println("CancelLimitOrder failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}