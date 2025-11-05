import co.meshtrade.api.iam.user.v1.UserService;
import co.meshtrade.api.iam.user.v1.Service.RevokeRolesFromUserRequest;
import co.meshtrade.api.iam.user.v1.User.User;

import java.util.Optional;

public class RevokeRolesFromUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserService service = new UserService()) {
            // Create request with service-specific parameters
            RevokeRolesFromUserRequest request = RevokeRolesFromUserRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the RevokeRolesFromUser method
            User user = service.revokeRolesFromUser(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("RevokeRolesFromUser successful: " + user);
        } catch (Exception e) {
            System.err.println("RevokeRolesFromUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}