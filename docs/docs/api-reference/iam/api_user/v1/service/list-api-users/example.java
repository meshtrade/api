import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.ListAPIUsersRequest;
import co.meshtrade.api.iam.api_user.v1.Service.ListAPIUsersResponse;

import java.util.Optional;

public class ListAPIUsersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            ListAPIUsersRequest request = ListAPIUsersRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the ListAPIUsers method
            ListAPIUsersResponse response = service.listAPIUsers(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("ListAPIUsers successful: " + response);
        } catch (Exception e) {
            System.err.println("ListAPIUsers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}