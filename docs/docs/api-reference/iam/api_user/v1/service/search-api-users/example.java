import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.SearchAPIUsersRequest;
import co.meshtrade.api.iam.api_user.v1.Service.SearchAPIUsersResponse;

import java.util.Optional;

public class SearchAPIUsersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            SearchAPIUsersRequest request = SearchAPIUsersRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the SearchAPIUsers method
            SearchAPIUsersResponse response = service.searchAPIUsers(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("SearchAPIUsers successful: " + response);
        } catch (Exception e) {
            System.err.println("SearchAPIUsers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}