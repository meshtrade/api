import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.GetUserProfileRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.GetUserProfileResponse;

import java.util.Optional;

public class GetUserProfileExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create request with service-specific parameters
            GetUserProfileRequest request = GetUserProfileRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetUserProfile method
            GetUserProfileResponse response = service.getUserProfile(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetUserProfile successful: " + response);
        } catch (Exception e) {
            System.err.println("GetUserProfile failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}