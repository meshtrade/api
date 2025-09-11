import co.meshtrade.api.iam.user.v1.UserService;
import co.meshtrade.api.iam.user.v1.Service.GetUserRequest;
import co.meshtrade.api.iam.user.v1.User.User;

import java.util.Optional;

public class GetUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserService service = new UserService()) {
            // Create request with service-specific parameters
            GetUserRequest request = GetUserRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetUser method
            User user = service.getUser(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetUser successful: " + user);
        } catch (Exception e) {
            System.err.println("GetUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}