import co.meshtrade.api.iam.user.v1.UserService;
import co.meshtrade.api.iam.user.v1.Service.AssignRolesToUserRequest;
import co.meshtrade.api.iam.user.v1.User.User;

import java.util.Optional;

public class AssignRolesToUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserService service = new UserService()) {
            // Create request with service-specific parameters
            AssignRolesToUserRequest request = AssignRolesToUserRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the AssignRolesToUser method
            User user = service.assignRolesToUser(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("AssignRolesToUser successful: " + user);
        } catch (Exception e) {
            System.err.println("AssignRolesToUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}