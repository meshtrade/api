import co.meshtrade.api.trading.limit_order.v1.LimitOrderOuterClass.LimitOrder;
import co.meshtrade.api.trading.limit_order.v1.LimitOrderOuterClass.LimitOrderSide;
import co.meshtrade.api.trading.limit_order.v1.LimitOrderService;
import co.meshtrade.api.trading.limit_order.v1.Service.CreateLimitOrderRequest;
import co.meshtrade.api.type.v1.AmountOuterClass.Amount;
import co.meshtrade.api.type.v1.DecimalOuterClass.Decimal;
import co.meshtrade.api.type.v1.LedgerOuterClass.Ledger;
import co.meshtrade.api.type.v1.TokenOuterClass.Token;

import java.util.Optional;

public class CreateLimitOrderExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LimitOrderService service = new LimitOrderService()) {
            // Create a buy limit order for 10 USDC at a limit price of 100.50 USDC
            // Note: You need a valid account resource name from the Wallet Account service

            // Build the limit price amount (100.50 USDC)
            Amount limitPrice = Amount.newBuilder()
                .setValue(Decimal.newBuilder()
                    .setValue("100.50")
                    .build())
                .setToken(Token.newBuilder()
                    .setCode("USDC")
                    .setIssuer("GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN")
                    .setLedger(Ledger.LEDGER_STELLAR)
                    .build())
                .build();

            // Build the quantity amount (10 USDC)
            Amount quantity = Amount.newBuilder()
                .setValue(Decimal.newBuilder()
                    .setValue("10")
                    .build())
                .setToken(Token.newBuilder()
                    .setCode("USDC")
                    .setIssuer("GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN")
                    .setLedger(Ledger.LEDGER_STELLAR)
                    .build())
                .build();

            // Build the limit order
            LimitOrder limitOrderToCreate = LimitOrder.newBuilder()
                // Account must be a valid Stellar account owned by your group
                .setAccount("groups/12345/accounts/67890")
                // Optional: External reference for tracking in your system
                .setExternalReference("my-trading-system-order-123")
                // Buy side - use LIMIT_ORDER_SIDE_SELL for selling
                .setSide(LimitOrderSide.LIMIT_ORDER_SIDE_BUY)
                .setLimitPrice(limitPrice)
                .setQuantity(quantity)
                .build();

            // Create the request
            CreateLimitOrderRequest request = CreateLimitOrderRequest.newBuilder()
                .setLimitOrder(limitOrderToCreate)
                .build();

            // Call the CreateLimitOrder method
            LimitOrder limitOrder = service.createLimitOrder(request, Optional.empty());

            // Response contains the created order with system-generated resource name
            System.out.println("✓ Limit order created successfully!");
            System.out.println("  Resource name: " + limitOrder.getName());
            System.out.println("  External reference: " + limitOrder.getExternalReference());
            System.out.println("  Account: " + limitOrder.getAccount());
            System.out.println("  Side: " + limitOrder.getSide());
            System.out.println("  Limit price: " + limitOrder.getLimitPrice().getValue().getValue() +
                             " " + limitOrder.getLimitPrice().getToken().getCode());
            System.out.println("  Quantity: " + limitOrder.getQuantity().getValue().getValue() +
                             " " + limitOrder.getQuantity().getToken().getCode());
        } catch (Exception e) {
            System.err.println("CreateLimitOrder failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}