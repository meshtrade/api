import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.GetMyUserProfileRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.GetMyUserProfileResponse;

import java.util.Optional;

public class GetMyUserProfileExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create request with service-specific parameters
            GetMyUserProfileRequest request = GetMyUserProfileRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetMyUserProfile method
            GetMyUserProfileResponse response = service.getMyUserProfile(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetMyUserProfile successful: " + response);
        } catch (Exception e) {
            System.err.println("GetMyUserProfile failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}