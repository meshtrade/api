import co.meshtrade.api.trading.limit_order.v1.LimitOrderOuterClass.LimitOrder;
import co.meshtrade.api.trading.limit_order.v1.LimitOrderService;
import co.meshtrade.api.trading.limit_order.v1.Service.GetLimitOrderByExternalReferenceRequest;

import java.util.Optional;

public class GetLimitOrderByExternalReferenceExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LimitOrderService service = new LimitOrderService()) {
            // Get a limit order by its external reference identifier
            // This is useful when you track orders in your own system using custom IDs
            String externalRef = "my-trading-system-order-123";

            GetLimitOrderByExternalReferenceRequest request = GetLimitOrderByExternalReferenceRequest.newBuilder()
                .setExternalReference(externalRef)
                .build();

            // Call the GetLimitOrderByExternalReference method
            LimitOrder limitOrder = service.getLimitOrderByExternalReference(request, Optional.empty());

            // Response contains the limit order matching the external reference
            System.out.println("✓ Limit order found by external reference:");
            System.out.println("  External reference: " + limitOrder.getExternalReference());
            System.out.println("  Resource name: " + limitOrder.getName());
            System.out.println("  Account: " + limitOrder.getAccount());
            System.out.println("  Side: " + limitOrder.getSide());
            System.out.println("  Limit price: " + limitOrder.getLimitPrice().getValue().getValue() +
                             " " + limitOrder.getLimitPrice().getToken().getCode());
            System.out.println("  Quantity: " + limitOrder.getQuantity().getValue().getValue() +
                             " " + limitOrder.getQuantity().getToken().getCode());
            System.out.println("\nNote: External references must be unique within your group hierarchy");
        } catch (Exception e) {
            System.err.println("GetLimitOrderByExternalReference failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}