import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.RevokeRoleFromAPIUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;
import co.meshtrade.api.iam.role.v1.RoleUtils;
import co.meshtrade.api.iam.role.v1.RoleOuterClass.Role;

import java.util.Optional;

public class RevokeRoleFromAPIUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Revoke role from existing API user
            RevokeRoleFromAPIUserRequest request = RevokeRoleFromAPIUserRequest.newBuilder()
                .setName("api_users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6")  // API user to revoke role from
                .setRole(RoleUtils.fullResourceNameFromGroupName(Role.ROLE_IAM_VIEWER, service.getGroup()))
                .build();

            // Call the RevokeRoleFromAPIUser method
            APIUser apiUser = service.revokeRoleFromAPIUser(request, Optional.empty());

            // Role has been successfully revoked
            System.out.println("Role revoked successfully:");
            System.out.println("  API User: " + apiUser.getName());
            System.out.println("  Display Name: " + apiUser.getDisplayName());
            System.out.println("  Remaining Roles: " + apiUser.getRolesCount());
        } catch (Exception e) {
            System.err.println("RevokeRoleFromAPIUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
