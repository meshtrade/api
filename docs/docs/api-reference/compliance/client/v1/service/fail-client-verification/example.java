import co.meshtrade.api.compliance.client.v1.ClientService;
import co.meshtrade.api.compliance.client.v1.Service.FailClientVerificationRequest;
import co.meshtrade.api.compliance.client.v1.Client.Client;

import java.util.Optional;

public class FailClientVerificationExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ClientService service = new ClientService()) {
            // Fail verification with comments explaining the reason
            FailClientVerificationRequest request = FailClientVerificationRequest.newBuilder()
                .setClient("compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR")
                .addComments("Missing proof of address documentation")
                .build();

            // Call the FailClientVerification method
            Client client = service.failClientVerification(request, Optional.empty());

            System.out.println("Verification failed, status: " + client.getVerificationStatus());
        } catch (Exception e) {
            System.err.println("FailClientVerification failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
