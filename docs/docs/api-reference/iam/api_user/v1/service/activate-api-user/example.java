import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.ActivateAPIUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;

import java.util.Optional;

public class ActivateAPIUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            ActivateAPIUserRequest request = ActivateAPIUserRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the ActivateAPIUser method
            APIUser apiUser = service.activateAPIUser(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("ActivateAPIUser successful: " + apiUser);
        } catch (Exception e) {
            System.err.println("ActivateAPIUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}