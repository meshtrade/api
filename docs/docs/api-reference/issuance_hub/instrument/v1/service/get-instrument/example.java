import co.meshtrade.api.issuance_hub.instrument.v1.InstrumentService;
import co.meshtrade.api.issuance_hub.instrument.v1.Service.GetInstrumentRequest;
import co.meshtrade.api.issuance_hub.instrument.v1.Instrument.Instrument;

import java.util.Optional;

public class GetInstrumentExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (InstrumentService service = new InstrumentService()) {
            // Create request with service-specific parameters
            GetInstrumentRequest request = GetInstrumentRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetInstrument method
            Instrument instrument = service.getInstrument(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetInstrument successful: " + instrument);
        } catch (Exception e) {
            System.err.println("GetInstrument failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}