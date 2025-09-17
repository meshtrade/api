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
            // Create request to get a specific user by name (resource identifier)
            GetUserRequest request = GetUserRequest.newBuilder()
                .setName("users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6")  // User resource name
                .build();

            // Call the GetUser method
            User user = service.getUser(request, Optional.empty());

            // Use the retrieved user information
            System.out.println("Retrieved user successfully:");
            System.out.println("  Name: " + user.getName());           // System-generated identifier
            System.out.println("  Email: " + user.getEmail());         // Email address for identification
            System.out.println("  Owner: " + user.getOwner());         // Direct group owner
            System.out.println("  Owners: " + user.getOwnersList());   // Full ownership hierarchy
            System.out.println("  Roles: " + user.getRolesList());     // Assigned roles across groups
            
            // User information can be used for profile display or access validation
            System.out.println("User " + user.getEmail() + " profile loaded for management interface");
        } catch (Exception e) {
            System.err.println("GetUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}