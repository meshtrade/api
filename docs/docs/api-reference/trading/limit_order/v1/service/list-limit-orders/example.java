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
            // Create request with service-specific parameters
            ListLimitOrdersRequest request = ListLimitOrdersRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the ListLimitOrders method
            ListLimitOrdersResponse response = service.listLimitOrders(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("ListLimitOrders successful: " + response);
        } catch (Exception e) {
            System.err.println("ListLimitOrders failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}