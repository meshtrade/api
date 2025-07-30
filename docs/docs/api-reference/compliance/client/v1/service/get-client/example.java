import co.meshtrade.api.compliance.client.v1.ClientService;
import co.meshtrade.api.compliance.client.v1.Service.GetClientRequest;
import co.meshtrade.api.compliance.client.v1.Client.Client;

import java.util.Optional;

public class GetClientExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ClientService service = new ClientService()) {
            // Create request with service-specific parameters
            GetClientRequest request = GetClientRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetClient method
            Client client = service.getClient(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetClient successful: " + client);
        } catch (Exception e) {
            System.err.println("GetClient failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}