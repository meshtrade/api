import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.SearchUserProfilesRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.SearchUserProfilesResponse;

import java.util.Optional;

public class SearchUserProfilesExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create request with service-specific parameters
            SearchUserProfilesRequest request = SearchUserProfilesRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the SearchUserProfiles method
            SearchUserProfilesResponse response = service.searchUserProfiles(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("SearchUserProfiles successful: " + response);
        } catch (Exception e) {
            System.err.println("SearchUserProfiles failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}