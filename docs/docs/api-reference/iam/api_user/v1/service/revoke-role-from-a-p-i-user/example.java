package co.meshtrade.api.examples.iam.api_user.v1;

import co.meshtrade.api.iam.api_user.v1.ApiUserServiceGrpc;
import co.meshtrade.api.iam.api_user.v1.RevokeRoleFromAPIUserRequest;
import co.meshtrade.api.iam.api_user.v1.APIUser;
import co.meshtrade.api.iam.role.v1.Role;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

/**
 * Example: Revoke a role from an API user.
 */
public class RevokeRoleFromAPIUserExample {

    public static void main(String[] args) {
        // Create gRPC channel with default configuration
        // Credentials come from MESH_API_CREDENTIALS environment variable
        // or default discovery methods
        ManagedChannel channel = ManagedChannelBuilder
            .forTarget("api.mesh.trade:443")
            .useTransportSecurity()
            .build();

        try {
            // Create blocking stub for synchronous calls
            ApiUserServiceGrpc.ApiUserServiceBlockingStub stub =
                ApiUserServiceGrpc.newBlockingStub(channel);

            // Revoke role from existing API user
            RevokeRoleFromAPIUserRequest request = RevokeRoleFromAPIUserRequest.newBuilder()
                .setName("api_users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6")  // API user to revoke role from
                .setRole("groups/01HN2ZXQJ8K9M0L1N3P2Q4R5T6/1000002")  // ROLE_IAM_VIEWER
                .build();

            // Call the RevokeRoleFromAPIUser method
            APIUser apiUser = stub.revokeRoleFromAPIUser(request);

            // Role has been successfully revoked
            System.out.println("Role revoked successfully:");
            System.out.println("  API User: " + apiUser.getName());
            System.out.println("  Display Name: " + apiUser.getDisplayName());
            System.out.println("  Remaining Roles: " + apiUser.getRolesCount());

        } finally {
            // Shutdown channel
            channel.shutdown();
        }
    }
}
