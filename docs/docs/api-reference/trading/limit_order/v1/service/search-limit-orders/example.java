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
            // Create request with service-specific parameters
            SearchLimitOrdersRequest request = SearchLimitOrdersRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the SearchLimitOrders method
            SearchLimitOrdersResponse response = service.searchLimitOrders(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("SearchLimitOrders successful: " + response);
        } catch (Exception e) {
            System.err.println("SearchLimitOrders failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}