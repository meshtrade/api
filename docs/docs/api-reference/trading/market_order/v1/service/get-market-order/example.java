import co.meshtrade.api.trading.market_order.v1.MarketOrderService;
import co.meshtrade.api.trading.market_order.v1.Service.GetMarketOrderRequest;
import co.meshtrade.api.trading.market_order.v1.MarketOrder.MarketOrder;

import java.util.Optional;

public class GetMarketOrderExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (MarketOrderService service = new MarketOrderService()) {
            // Create request with service-specific parameters
            GetMarketOrderRequest request = GetMarketOrderRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetMarketOrder method
            MarketOrder marketOrder = service.getMarketOrder(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetMarketOrder successful: " + marketOrder);
        } catch (Exception e) {
            System.err.println("GetMarketOrder failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}