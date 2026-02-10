import co.meshtrade.api.compliance.client.v1.ClientService;
import co.meshtrade.api.compliance.client.v1.Service.GetGroupClientRequest;
import co.meshtrade.api.compliance.client.v1.Client.Client;

import java.util.Optional;

public class GetGroupClientExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ClientService service = new ClientService()) {
            // Create request with service-specific parameters
            GetGroupClientRequest request = GetGroupClientRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetGroupClient method
            Client client = service.getGroupClient(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetGroupClient successful: " + client);
        } catch (Exception e) {
            System.err.println("GetGroupClient failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}