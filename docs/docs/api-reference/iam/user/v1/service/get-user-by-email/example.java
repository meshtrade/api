import co.meshtrade.api.iam.user.v1.UserService;
import co.meshtrade.api.iam.user.v1.Service.GetUserByEmailRequest;
import co.meshtrade.api.iam.user.v1.User.User;

import java.util.Optional;

public class GetUserByEmailExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserService service = new UserService()) {
            // Create request with service-specific parameters
            GetUserByEmailRequest request = GetUserByEmailRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetUserByEmail method
            User user = service.getUserByEmail(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetUserByEmail successful: " + user);
        } catch (Exception e) {
            System.err.println("GetUserByEmail failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}