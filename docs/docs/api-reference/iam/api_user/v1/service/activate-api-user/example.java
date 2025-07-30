import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.ActivateApiUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;

import java.util.Optional;

public class ActivateApiUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            ActivateApiUserRequest request = ActivateApiUserRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the ActivateApiUser method
            APIUser apiUser = service.activateApiUser(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("ActivateApiUser successful: " + apiUser);
        } catch (Exception e) {
            System.err.println("ActivateApiUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}