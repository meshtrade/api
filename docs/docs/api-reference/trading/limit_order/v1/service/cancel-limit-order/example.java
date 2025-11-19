import co.meshtrade.api.trading.limit_order.v1.LimitOrderOuterClass.LimitOrderStatus;
import co.meshtrade.api.trading.limit_order.v1.LimitOrderService;
import co.meshtrade.api.trading.limit_order.v1.Service.CancelLimitOrderRequest;
import co.meshtrade.api.trading.limit_order.v1.Service.CancelLimitOrderResponse;

import java.util.Optional;

public class CancelLimitOrderExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LimitOrderService service = new LimitOrderService()) {
            // Cancel an active limit order by its resource name
            // Replace with an actual limit order resource name from your system
            String orderName = "groups/12345/accounts/67890/limitOrders/abc123";

            CancelLimitOrderRequest request = CancelLimitOrderRequest.newBuilder()
                .setName(orderName)
                .build();

            // Call the CancelLimitOrder method
            CancelLimitOrderResponse response = service.cancelLimitOrder(request, Optional.empty());

            // Response contains the cancellation status
            System.out.println("✓ Limit order cancellation initiated:");
            System.out.println("  Order name: " + orderName);
            System.out.println("  Status: " + response.getStatus());

            // Terminal cancellation states:
            // - LIMIT_ORDER_STATUS_CANCELLATION_IN_PROGRESS: Cancel submitted to ledger
            // - LIMIT_ORDER_STATUS_CANCELLED: Cancel confirmed on ledger
            if (response.getStatus() == LimitOrderStatus.LIMIT_ORDER_STATUS_CANCELLED) {
                System.out.println("  ✓ Order successfully cancelled on ledger");
            } else if (response.getStatus() == LimitOrderStatus.LIMIT_ORDER_STATUS_CANCELLATION_IN_PROGRESS) {
                System.out.println("  ⏳ Cancellation in progress, check status later");
            }
        } catch (Exception e) {
            System.err.println("CancelLimitOrder failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}