import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.AssignRolesToAPIUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;

import java.util.Optional;

public class AssignRolesToAPIUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            AssignRolesToAPIUserRequest request = AssignRolesToAPIUserRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the AssignRolesToAPIUser method
            APIUser apiUser = service.assignRolesToAPIUser(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("AssignRolesToAPIUser successful: " + apiUser);
        } catch (Exception e) {
            System.err.println("AssignRolesToAPIUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}