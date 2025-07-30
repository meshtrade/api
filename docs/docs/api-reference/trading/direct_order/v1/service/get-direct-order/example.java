import co.meshtrade.api.trading.direct_order.v1.DirectOrderService;
import co.meshtrade.api.trading.direct_order.v1.Service.GetDirectOrderRequest;
import co.meshtrade.api.trading.direct_order.v1.DirectOrder.DirectOrder;

import java.util.Optional;

public class GetDirectOrderExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (DirectOrderService service = new DirectOrderService()) {
            // Create request with service-specific parameters
            GetDirectOrderRequest request = GetDirectOrderRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetDirectOrder method
            DirectOrder directOrder = service.getDirectOrder(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetDirectOrder successful: " + directOrder);
        } catch (Exception e) {
            System.err.println("GetDirectOrder failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}