import co.meshtrade.api.iam.role.v1.RoleUtils;
import co.meshtrade.api.iam.role.v1.RoleOuterClass.Role;
import co.meshtrade.api.iam.user.v1.UserService;
import co.meshtrade.api.iam.user.v1.Service.AssignRoleToUserRequest;
import co.meshtrade.api.iam.user.v1.User.User;

import java.util.Optional;

public class AssignRoleToUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserService service = new UserService()) {
            // Assign role to existing user
            AssignRoleToUserRequest request = AssignRoleToUserRequest.newBuilder()
                .setName("users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6")  // User to assign role to
                .setRole(RoleUtils.fullResourceNameFromGroupName(Role.ROLE_IAM_ADMIN, service.getGroup()))
                .build();

            // Call the AssignRoleToUser method
            User user = service.assignRoleToUser(request, Optional.empty());

            // Role has been successfully assigned
            System.out.println("Role assigned successfully:");
            System.out.println("  User: " + user.getName());
            System.out.println("  Email: " + user.getEmail());
            System.out.println("  Total Roles: " + user.getRolesCount());
        } catch (Exception e) {
            System.err.println("AssignRoleToUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}