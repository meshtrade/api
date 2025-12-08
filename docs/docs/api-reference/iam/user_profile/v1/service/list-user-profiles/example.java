import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.ListUserProfilesRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.ListUserProfilesResponse;

import java.util.Optional;

public class ListUserProfilesExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create request with service-specific parameters
            ListUserProfilesRequest request = ListUserProfilesRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the ListUserProfiles method
            ListUserProfilesResponse response = service.listUserProfiles(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("ListUserProfiles successful: " + response);
        } catch (Exception e) {
            System.err.println("ListUserProfiles failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}