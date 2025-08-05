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
                .setName("api_users/01234567890123456789012345") // API user resource name
                .build();

            // Call the ActivateApiUser method
            APIUser apiUser = service.activateApiUser(request, Optional.empty());

            // Verify activation was successful
            System.out.println("Successfully activated API user: " + apiUser.getName());
            System.out.println("API user state: " + apiUser.getState());
            System.out.println("Display name: " + apiUser.getDisplayName());
        } catch (Exception e) {
            System.err.println("ActivateApiUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}