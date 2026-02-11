import co.meshtrade.api.iam.user.v1.UserService;
import co.meshtrade.api.iam.user.v1.Service.SearchUsersRequest;
import co.meshtrade.api.iam.user.v1.Service.SearchUsersResponse;

import java.util.Optional;

public class SearchUsersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserService service = new UserService()) {
            // Create request with service-specific parameters
            SearchUsersRequest request = SearchUsersRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the SearchUsers method
            SearchUsersResponse response = service.searchUsers(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("SearchUsers successful: " + response);
        } catch (Exception e) {
            System.err.println("SearchUsers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}