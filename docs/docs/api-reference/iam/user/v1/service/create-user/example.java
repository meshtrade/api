import co.meshtrade.api.iam.user.v1.UserService;
import co.meshtrade.api.iam.user.v1.Service.CreateUserRequest;
import co.meshtrade.api.iam.user.v1.User.User;

import java.util.Optional;

public class CreateUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserService service = new UserService()) {
            // Create request with user configuration
            CreateUserRequest request = CreateUserRequest.newBuilder()
                .setUser(User.newBuilder()
                    .setOwner("groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU")  // Group that will own this user
                    .setEmail("sarah.thompson@company.com")  // Unique email address
                    .addRoles("groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU/1000001")  // ROLE_IAM_VIEWER
                    .addRoles("groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU/2000002")  // ROLE_TRADING_VIEWER
                    .build())
                .build();

            // Call the CreateUser method
            User user = service.createUser(request, Optional.empty());

            // Use the newly created user
            System.out.println("User created successfully:");
            System.out.println("  Name: " + user.getName());
            System.out.println("  Email: " + user.getEmail());
            System.out.println("  Owner: " + user.getOwner());
            System.out.println("  Roles: " + user.getRolesList());
            System.out.println("User is ready for authentication with " + user.getRolesCount() + " assigned roles");
        } catch (Exception e) {
            System.err.println("CreateUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}