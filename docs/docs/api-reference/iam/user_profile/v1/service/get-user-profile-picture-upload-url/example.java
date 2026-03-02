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
            // Create request with the user profile resource name
            // Replace the ULIDv2 with your actual user profile ID
            GetUserProfilePictureUploadUrlRequest request = GetUserProfilePictureUploadUrlRequest.newBuilder()
                .setName("user_profiles/01HQZXYZ9ABCDEFGHIJKLMNPQR")
                .build();

            // Call the GetUserProfilePictureUploadUrl method to get presigned upload URL
            GetUserProfilePictureUploadUrlResponse response = service.getUserProfilePictureUploadUrl(request, Optional.empty());

            // Use the presigned URL to upload the profile picture
            System.out.println("Upload URL: " + response.getUploadUrl());
            System.out.println("Expires at: " + response.getExpiresAt());

            // The URL can now be used with an HTTP PUT request to upload an image file
            // Example: HttpClient.newHttpClient().send(HttpRequest.newBuilder().uri(URI.create(response.getUploadUrl())).PUT(...).build(), ...)
        } catch (Exception e) {
            System.err.println("GetUserProfilePictureUploadUrl failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}