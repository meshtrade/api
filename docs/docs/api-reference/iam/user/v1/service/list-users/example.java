import co.meshtrade.api.iam.user.v1.UserService;
import co.meshtrade.api.iam.user.v1.Service.ListUsersRequest;
import co.meshtrade.api.iam.user.v1.Service.ListUsersResponse;

import java.util.Optional;

public class ListUsersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserService service = new UserService()) {
            // Create request with service-specific parameters
            ListUsersRequest request = ListUsersRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the ListUsers method
            ListUsersResponse response = service.listUsers(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("ListUsers successful: " + response);
        } catch (Exception e) {
            System.err.println("ListUsers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}