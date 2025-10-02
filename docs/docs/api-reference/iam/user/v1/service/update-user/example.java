import co.meshtrade.api.iam.user.v1.UserService;
import co.meshtrade.api.iam.user.v1.Service.UpdateUserRequest;
import co.meshtrade.api.iam.user.v1.User.User;
import co.meshtrade.api.iam.role.v1.RoleUtils;
import co.meshtrade.api.iam.role.v1.RoleOuterClass.Role;

import java.util.Optional;

public class UpdateUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserService service = new UserService()) {
            // Update user with modified information
            UpdateUserRequest request = UpdateUserRequest.newBuilder()
                .setUser(User.newBuilder()
                    .setName("users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6")  // Existing user identifier
                    .setOwner(service.getGroup())  // Owner must match current ownership
                    .setEmail("sarah.t.johnson@company.com")  // Updated email address
                    .addRoles(RoleUtils.fullResourceNameFromGroupName(Role.ROLE_IAM_ADMIN, service.getGroup()))
                    .addRoles(RoleUtils.fullResourceNameFromGroupName(Role.ROLE_TRADING_ADMIN, service.getGroup()))
                    .addRoles(RoleUtils.fullResourceNameFromGroupName(Role.ROLE_COMPLIANCE_VIEWER, service.getGroup()))
                    .build())
                .build();

            // Call the UpdateUser method
            User user = service.updateUser(request, Optional.empty());

            // Use the updated user
            System.out.println("User updated successfully:");
            System.out.println("  Name: " + user.getName());
            System.out.println("  Email: " + user.getEmail());
            System.out.println("  Owner: " + user.getOwner());
            System.out.println("  Roles: " + user.getRolesList());
            System.out.println("User permissions updated with " + user.getRolesCount() + " active roles");
        } catch (Exception e) {
            System.err.println("UpdateUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}