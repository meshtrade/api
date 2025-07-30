import co.meshtrade.api.issuance_hub.instrument.v1.InstrumentService;
import co.meshtrade.api.issuance_hub.instrument.v1.Service.BurnInstrumentRequest;
import co.meshtrade.api.issuance_hub.instrument.v1.Service.BurnInstrumentResponse;

import java.util.Optional;

public class BurnInstrumentExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (InstrumentService service = new InstrumentService()) {
            // Create request with service-specific parameters
            BurnInstrumentRequest request = BurnInstrumentRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the BurnInstrument method
            BurnInstrumentResponse response = service.burnInstrument(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("BurnInstrument successful: " + response);
        } catch (Exception e) {
            System.err.println("BurnInstrument failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}