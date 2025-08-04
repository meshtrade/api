import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.GetApiUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;

import java.util.Optional;

public class GetApiUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            GetApiUserRequest request = GetApiUserRequest.newBuilder()
                .setName("api_users/01234567890123456789012345") // API user resource name
                .build();

            // Call the GetApiUser method
            APIUser apiUser = service.getApiUser(request, Optional.empty());

            // Access API user details
            System.out.println("Retrieved API user: " + apiUser.getName());
            System.out.println("Display name: " + apiUser.getDisplayName());
            System.out.println("State: " + apiUser.getState());
            System.out.println("Owner: " + apiUser.getOwner());
            System.out.println("Roles: " + apiUser.getRolesList());
            
            // Note: API key is not returned in get operations for security reasons
        } catch (Exception e) {
            System.err.println("GetApiUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}