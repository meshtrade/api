import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.ListApiUsersRequest;
import co.meshtrade.api.iam.api_user.v1.Service.ListApiUsersResponse;

import java.util.Optional;

public class ListApiUsersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            ListApiUsersRequest request = ListApiUsersRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the ListApiUsers method
            ListApiUsersResponse response = service.listApiUsers(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("ListApiUsers successful: " + response);
        } catch (Exception e) {
            System.err.println("ListApiUsers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}