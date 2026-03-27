import co.meshtrade.api.compliance.client.v1.ClientService;
import co.meshtrade.api.compliance.client.v1.Service.UpdateClientRequest;
import co.meshtrade.api.compliance.client.v1.Client.Client;

import java.util.Optional;

public class UpdateClientExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ClientService service = new ClientService()) {
            // Update the client's display name
            UpdateClientRequest request = UpdateClientRequest.newBuilder()
                .setClient(Client.newBuilder()
                    .setName("compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR")
                    .setDisplayName("Updated Client Name")
                    .setShortName("UCN")
                    .build())
                .build();

            // Call the UpdateClient method
            Client client = service.updateClient(request, Optional.empty());

            System.out.println("Client updated: " + client.getDisplayName());
        } catch (Exception e) {
            System.err.println("UpdateClient failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
