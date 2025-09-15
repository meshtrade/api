import co.meshtrade.api.iam.internal_auth.v1.InternalAuthService;
import co.meshtrade.api.iam.internal_auth.v1.Service.CheckAuthorizationRequest;
import co.meshtrade.api.iam.internal_auth.v1.Service.CheckAuthorizationResponse;

import java.util.Optional;

public class CheckAuthorizationExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (InternalAuthService service = new InternalAuthService()) {
            // Create request with service-specific parameters
            CheckAuthorizationRequest request = CheckAuthorizationRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the CheckAuthorization method
            CheckAuthorizationResponse response = service.checkAuthorization(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("CheckAuthorization successful: " + response);
        } catch (Exception e) {
            System.err.println("CheckAuthorization failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}