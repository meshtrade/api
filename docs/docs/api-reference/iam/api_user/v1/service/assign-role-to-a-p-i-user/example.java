import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.AssignRoleToAPIUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;
import co.meshtrade.api.iam.role.v1.RoleUtils;
import co.meshtrade.api.iam.role.v1.RoleOuterClass.Role;

import java.util.Optional;

public class AssignRoleToAPIUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Assign role to existing API user
            AssignRoleToAPIUserRequest request = AssignRoleToAPIUserRequest.newBuilder()
                .setName("api_users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6")  // API user to assign role to
                .setRole(RoleUtils.fullResourceNameFromGroupName(Role.ROLE_IAM_VIEWER, service.getGroup()))
                .build();

            // Call the AssignRoleToAPIUser method
            APIUser apiUser = service.assignRoleToAPIUser(request, Optional.empty());

            // Role has been successfully assigned
            System.out.println("Role assigned successfully:");
            System.out.println("  API User: " + apiUser.getName());
            System.out.println("  Display Name: " + apiUser.getDisplayName());
            System.out.println("  Total Roles: " + apiUser.getRolesCount());
        } catch (Exception e) {
            System.err.println("AssignRoleToAPIUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}