import co.meshtrade.api.compliance.client.v1.ClientService;
import co.meshtrade.api.compliance.client.v1.Service.StartClientVerificationRequest;
import co.meshtrade.api.compliance.client.v1.Client.Client;

import java.util.Optional;

public class StartClientVerificationExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ClientService service = new ClientService()) {
            // Start verification for a client
            StartClientVerificationRequest request = StartClientVerificationRequest.newBuilder()
                .setClient("compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR")
                .build();

            // Call the StartClientVerification method
            Client client = service.startClientVerification(request, Optional.empty());

            System.out.println("Verification started, status: " + client.getVerificationStatus());
        } catch (Exception e) {
            System.err.println("StartClientVerification failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
