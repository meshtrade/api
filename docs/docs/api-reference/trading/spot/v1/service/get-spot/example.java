import co.meshtrade.api.trading.spot.v1.SpotService;
import co.meshtrade.api.trading.spot.v1.Service.GetSpotRequest;
import co.meshtrade.api.trading.spot.v1.Spot.Spot;

import java.util.Optional;

public class GetSpotExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (SpotService service = new SpotService()) {
            // Create request with service-specific parameters
            GetSpotRequest request = GetSpotRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetSpot method
            Spot spot = service.getSpot(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetSpot successful: " + spot);
        } catch (Exception e) {
            System.err.println("GetSpot failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}