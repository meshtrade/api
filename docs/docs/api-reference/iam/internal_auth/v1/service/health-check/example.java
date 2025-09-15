import co.meshtrade.api.iam.internal_auth.v1.InternalAuthService;
import co.meshtrade.api.iam.internal_auth.v1.Service.HealthCheckRequest;
import co.meshtrade.api.iam.internal_auth.v1.Service.HealthCheckResponse;

import java.util.Optional;

public class HealthCheckExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (InternalAuthService service = new InternalAuthService()) {
            // Create request with service-specific parameters
            HealthCheckRequest request = HealthCheckRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the HealthCheck method
            HealthCheckResponse response = service.healthCheck(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("HealthCheck successful: " + response);
        } catch (Exception e) {
            System.err.println("HealthCheck failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}