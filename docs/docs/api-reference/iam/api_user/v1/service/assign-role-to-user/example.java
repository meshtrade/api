import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.AssignRoleToAPIUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;

import java.util.Optional;

public class AssignRoleToUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Assign role to existing API user
            AssignRoleToAPIUserRequest request = AssignRoleToAPIUserRequest.newBuilder()
                .setName("api_users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6")  // API user to assign role to
                .setRole("groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU/1000001")  // ROLE_IAM_VIEWER
                .build();

            // Call the AssignRoleToUser method
            APIUser apiUser = service.assignRoleToUser(request, Optional.empty());

            // Role has been successfully assigned
            System.out.println("Role assigned successfully:");
            System.out.println("  API User: " + apiUser.getName());
            System.out.println("  Display Name: " + apiUser.getDisplayName());
            System.out.println("  Total Roles: " + apiUser.getRolesCount());
        } catch (Exception e) {
            System.err.println("AssignRoleToUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}