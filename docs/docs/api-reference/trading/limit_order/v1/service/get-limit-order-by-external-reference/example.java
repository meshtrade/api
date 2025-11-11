import co.meshtrade.api.trading.limit_order.v1.LimitOrderService;
import co.meshtrade.api.trading.limit_order.v1.Service.GetLimitOrderByExternalReferenceRequest;
import co.meshtrade.api.trading.limit_order.v1.LimitOrder.LimitOrder;

import java.util.Optional;

public class GetLimitOrderByExternalReferenceExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LimitOrderService service = new LimitOrderService()) {
            // Create request with service-specific parameters
            GetLimitOrderByExternalReferenceRequest request = GetLimitOrderByExternalReferenceRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetLimitOrderByExternalReference method
            LimitOrder limitOrder = service.getLimitOrderByExternalReference(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetLimitOrderByExternalReference successful: " + limitOrder);
        } catch (Exception e) {
            System.err.println("GetLimitOrderByExternalReference failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}