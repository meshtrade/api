import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.AssignRoleToAPIUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;

import java.util.Optional;

public class AssignRoleToUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            AssignRoleToAPIUserRequest request = AssignRoleToAPIUserRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the AssignRoleToUser method
            APIUser apiUser = service.assignRoleToUser(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("AssignRoleToUser successful: " + apiUser);
        } catch (Exception e) {
            System.err.println("AssignRoleToUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}