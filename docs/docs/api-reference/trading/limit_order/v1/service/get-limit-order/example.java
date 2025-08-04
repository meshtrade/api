import co.meshtrade.api.trading.limit_order.v1.LimitOrderService;
import co.meshtrade.api.trading.limit_order.v1.Service.GetLimitOrderRequest;
import co.meshtrade.api.trading.limit_order.v1.LimitOrder.LimitOrder;

import java.util.Optional;

public class GetLimitOrderExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LimitOrderService service = new LimitOrderService()) {
            // Create request with service-specific parameters
            GetLimitOrderRequest request = GetLimitOrderRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetLimitOrder method
            LimitOrder limitOrder = service.getLimitOrder(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetLimitOrder successful: " + limitOrder);
        } catch (Exception e) {
            System.err.println("GetLimitOrder failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}