import co.meshtrade.api.trading.limit_order.v1.LimitOrderOuterClass.LimitOrder;
import co.meshtrade.api.trading.limit_order.v1.LimitOrderService;
import co.meshtrade.api.trading.limit_order.v1.Service.GetLimitOrderRequest;

import java.util.Optional;

public class GetLimitOrderExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LimitOrderService service = new LimitOrderService()) {
            // Get a limit order by its resource name
            // Replace with an actual limit order resource name from your system
            String orderName = "limit_orders/01HQVBZ9F8X2T3K4M5N6P7Q8R9";

            // Example 1: Get without live ledger data (faster, but status will be UNSPECIFIED)
            GetLimitOrderRequest request = GetLimitOrderRequest.newBuilder()
                .setName(orderName)
                .setLiveLedgerData(false)
                .build();

            LimitOrder limitOrder = service.getLimitOrder(request, Optional.empty());

            System.out.println("✓ Limit order retrieved (cached data):");
            System.out.println("  Resource name: " + limitOrder.getName());
            System.out.println("  Number: " + limitOrder.getNumber());
            System.out.println("  Account: " + limitOrder.getAccount());
            System.out.println("  External reference: " + limitOrder.getExternalReference());
            System.out.println("  Side: " + limitOrder.getSide());
            System.out.println("  Status: " + limitOrder.getStatus() + " (UNSPECIFIED when live_ledger_data=false)");

            // Example 2: Get with live ledger data (queries the ledger for current status)
            GetLimitOrderRequest requestWithLiveData = GetLimitOrderRequest.newBuilder()
                .setName(orderName)
                .setLiveLedgerData(true)
                .build();

            LimitOrder limitOrderWithStatus = service.getLimitOrder(requestWithLiveData, Optional.empty());

            System.out.println("\n✓ Limit order retrieved (with live ledger data):");
            System.out.println("  Resource name: " + limitOrderWithStatus.getName());
            System.out.println("  Status: " + limitOrderWithStatus.getStatus());
            System.out.println("  Limit price: " + limitOrderWithStatus.getLimitPrice().getValue().getValue() +
                             " " + limitOrderWithStatus.getLimitPrice().getToken().getCode());
            System.out.println("  Quantity: " + limitOrderWithStatus.getQuantity().getValue().getValue() +
                             " " + limitOrderWithStatus.getQuantity().getToken().getCode());
        } catch (Exception e) {
            System.err.println("GetLimitOrder failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}