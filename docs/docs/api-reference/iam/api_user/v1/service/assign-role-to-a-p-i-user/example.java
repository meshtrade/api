import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.AssignRoleToAPIUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;

import java.util.Optional;

public class AssignRoleToAPIUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            AssignRoleToAPIUserRequest request = AssignRoleToAPIUserRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the AssignRoleToAPIUser method
            APIUser apiUser = service.assignRoleToAPIUser(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("AssignRoleToAPIUser successful: " + apiUser);
        } catch (Exception e) {
            System.err.println("AssignRoleToAPIUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}