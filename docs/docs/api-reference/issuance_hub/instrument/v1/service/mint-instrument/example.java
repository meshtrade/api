import co.meshtrade.api.issuance_hub.instrument.v1.InstrumentService;
import co.meshtrade.api.issuance_hub.instrument.v1.Service.MintInstrumentRequest;
import co.meshtrade.api.issuance_hub.instrument.v1.Service.MintInstrumentResponse;

import java.util.Optional;

public class MintInstrumentExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (InstrumentService service = new InstrumentService()) {
            // Create request with service-specific parameters
            MintInstrumentRequest request = MintInstrumentRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the MintInstrument method
            MintInstrumentResponse response = service.mintInstrument(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("MintInstrument successful: " + response);
        } catch (Exception e) {
            System.err.println("MintInstrument failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}