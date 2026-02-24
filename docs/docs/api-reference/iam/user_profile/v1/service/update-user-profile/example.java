import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.UpdateUserProfileRequest;
import co.meshtrade.api.iam.user_profile.v1.UserProfile.UserProfile;

import java.util.Optional;

public class UpdateUserProfileExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create request with service-specific parameters
            UpdateUserProfileRequest request = UpdateUserProfileRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the UpdateUserProfile method
            UserProfile userProfile = service.updateUserProfile(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("UpdateUserProfile successful: " + userProfile);
        } catch (Exception e) {
            System.err.println("UpdateUserProfile failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}