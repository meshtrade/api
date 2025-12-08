import co.meshtrade.api.market_data.price.v1.PriceService;
import co.meshtrade.api.market_data.price.v1.Service.GetCurrentPriceByTokenPairRequest;
import co.meshtrade.api.market_data.price.v1.Price.Price;
import co.meshtrade.api.type.v1.Token.Token;

import java.util.Optional;

public class GetCurrentPriceByTokenPairExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (PriceService service = new PriceService()) {
            // Create request to get gold (XAU) price in ZAR
            GetCurrentPriceByTokenPairRequest request = GetCurrentPriceByTokenPairRequest.newBuilder()
                .setBaseToken(Token.newBuilder()
                    .setCode("XAU")  // Gold - the token to price
                    .build())
                .setQuoteToken(Token.newBuilder()
                    .setCode("ZAR")  // South African Rand - the currency to price it in
                    .build())
                .build();

            // Call the GetCurrentPriceByTokenPair method
            Price price = service.getCurrentPriceByTokenPair(request, Optional.empty());

            // Display the price information
            System.out.println("Price retrieved successfully:");
            System.out.println("  Base Token: " + price.getBaseToken().getCode());
            System.out.println("  Quote Token: " + price.getQuoteToken().getCode());
            System.out.println("  Mid Price: " + price.getMidPrice().getValue());
            System.out.println("  Timestamp: " + price.getTime());
        } catch (Exception e) {
            System.err.println("GetCurrentPriceByTokenPair failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}