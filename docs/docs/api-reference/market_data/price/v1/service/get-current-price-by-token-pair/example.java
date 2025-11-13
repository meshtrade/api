import co.meshtrade.api.market_data.price.v1.PriceService;
import co.meshtrade.api.market_data.price.v1.Service.GetCurrentPriceByTokenPairRequest;
import co.meshtrade.api.market_data.price.v1.Price.Price;

import java.util.Optional;

public class GetCurrentPriceByTokenPairExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (PriceService service = new PriceService()) {
            // Create request with service-specific parameters
            GetCurrentPriceByTokenPairRequest request = GetCurrentPriceByTokenPairRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetCurrentPriceByTokenPair method
            Price price = service.getCurrentPriceByTokenPair(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetCurrentPriceByTokenPair successful: " + price);
        } catch (Exception e) {
            System.err.println("GetCurrentPriceByTokenPair failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}