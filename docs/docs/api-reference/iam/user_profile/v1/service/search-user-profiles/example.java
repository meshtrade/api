import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.SearchUserProfilesRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.SearchUserProfilesResponse;
import co.meshtrade.api.iam.user_profile.v1.UserProfile.UserProfile;

import java.util.Optional;

public class SearchUserProfilesExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Search user profiles by last name
            SearchUserProfilesRequest request = SearchUserProfilesRequest.newBuilder()
                .setLastName("Smith")
                .build();

            // Call the SearchUserProfiles method
            SearchUserProfilesResponse response = service.searchUserProfiles(request, Optional.empty());

            for (UserProfile profile : response.getUserProfilesList()) {
                System.out.println("Found: " + profile.getFirstName() + " " + profile.getLastName() + " (" + profile.getName() + ")");
            }
        } catch (Exception e) {
            System.err.println("SearchUserProfiles failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
