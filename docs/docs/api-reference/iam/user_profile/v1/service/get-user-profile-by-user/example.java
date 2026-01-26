import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.GetUserProfileByUserRequest;
import co.meshtrade.api.iam.user_profile.v1.UserProfile.UserProfile;

import java.util.Optional;

public class GetUserProfileByUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create request with service-specific parameters
            GetUserProfileByUserRequest request = GetUserProfileByUserRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetUserProfileByUser method
            UserProfile userProfile = service.getUserProfileByUser(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetUserProfileByUser successful: " + userProfile);
        } catch (Exception e) {
            System.err.println("GetUserProfileByUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}