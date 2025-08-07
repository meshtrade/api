import co.meshtrade.api.compliance.client.v1.ClientService;
import co.meshtrade.api.compliance.client.v1.Service.ListClientsRequest;
import co.meshtrade.api.compliance.client.v1.Service.ListClientsResponse;

import java.util.Optional;

public class ListClientsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ClientService service = new ClientService()) {
            // Create request with service-specific parameters
            ListClientsRequest request = ListClientsRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the ListClients method
            ListClientsResponse response = service.listClients(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("ListClients successful: " + response);
        } catch (Exception e) {
            System.err.println("ListClients failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}