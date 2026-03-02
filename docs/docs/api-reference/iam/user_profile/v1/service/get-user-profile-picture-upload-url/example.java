import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.GetUserProfilePictureUploadUrlRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.GetUserProfilePictureUploadUrlResponse;

import java.util.Optional;

public class GetUserProfilePictureUploadUrlExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create request with service-specific parameters
            GetUserProfilePictureUploadUrlRequest request = GetUserProfilePictureUploadUrlRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetUserProfilePictureUploadUrl method
            GetUserProfilePictureUploadUrlResponse response = service.getUserProfilePictureUploadUrl(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetUserProfilePictureUploadUrl successful: " + response);
        } catch (Exception e) {
            System.err.println("GetUserProfilePictureUploadUrl failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}