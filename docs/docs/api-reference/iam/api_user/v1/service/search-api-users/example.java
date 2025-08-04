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
                .setDisplayName("Integration") // Search for API users with "Integration" in display name
                .build();

            // Call the SearchApiUsers method
            SearchApiUsersResponse response = service.searchApiUsers(request, Optional.empty());

            // Process search results
            System.out.println("Found " + response.getApiUsersCount() + " API users matching search criteria");
            
            for (int i = 0; i < response.getApiUsersCount(); i++) {
                var apiUser = response.getApiUsers(i);
                System.out.println("Match " + (i + 1) + ":");
                System.out.println("  Name: " + apiUser.getName());
                System.out.println("  Display Name: " + apiUser.getDisplayName());
                System.out.println("  State: " + apiUser.getState());
                System.out.println("  Owner: " + apiUser.getOwner());
            }
            
            if (response.getApiUsersCount() == 0) {
                System.out.println("No API users found matching the search criteria");
            }
        } catch (Exception e) {
            System.err.println("SearchApiUsers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}