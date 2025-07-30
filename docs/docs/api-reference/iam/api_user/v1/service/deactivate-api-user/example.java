import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.DeactivateApiUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;

import java.util.Optional;

public class DeactivateApiUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            DeactivateApiUserRequest request = DeactivateApiUserRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the DeactivateApiUser method
            APIUser apiUser = service.deactivateApiUser(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("DeactivateApiUser successful: " + apiUser);
        } catch (Exception e) {
            System.err.println("DeactivateApiUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}