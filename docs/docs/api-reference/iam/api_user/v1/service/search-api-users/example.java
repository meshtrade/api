import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.SearchApiUsersRequest;
import co.meshtrade.api.iam.api_user.v1.Service.SearchApiUsersResponse;

import java.util.Optional;

public class SearchApiUsersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            SearchApiUsersRequest request = SearchApiUsersRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the SearchApiUsers method
            SearchApiUsersResponse response = service.searchApiUsers(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("SearchApiUsers successful: " + response);
        } catch (Exception e) {
            System.err.println("SearchApiUsers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}