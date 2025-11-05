import co.meshtrade.api.trading.limit_order.v1.LimitOrderService;
import co.meshtrade.api.trading.limit_order.v1.Service.MonitorLimitOrderByExternalReferenceRequest;
import co.meshtrade.api.trading.limit_order.v1.LimitOrder.LimitOrder;

import java.util.Iterator;
import java.util.Optional;

public class MonitorLimitOrderByExternalReferenceExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LimitOrderService service = new LimitOrderService()) {
            // Create request with service-specific parameters
            MonitorLimitOrderByExternalReferenceRequest request = MonitorLimitOrderByExternalReferenceRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the MonitorLimitOrderByExternalReference streaming method
            Iterator<LimitOrder> stream = service.monitorLimitOrderByExternalReference(request, Optional.empty());

            // Consume stream responses using iterator pattern
            while (stream.hasNext()) {
                LimitOrder limitOrder = stream.next();

                // Process each response as it arrives
                System.out.println("Received: " + limitOrder);
            }

            System.out.println("Stream completed successfully");
        } catch (Exception e) {
            System.err.println("MonitorLimitOrderByExternalReference stream failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
