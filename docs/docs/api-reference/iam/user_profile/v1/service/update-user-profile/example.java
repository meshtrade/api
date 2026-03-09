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
            // Update user profile with modified information
            UpdateUserProfileRequest request = UpdateUserProfileRequest.newBuilder()
                .setUserProfile(UserProfile.newBuilder()
                    .setName("iam/user_profiles/01JCXYZ1234567890ABCDEFGHJK")  // Existing profile identifier
                    .setOwner(service.getGroup())  // Owner must match current ownership
                    .setUserName("users/01JCXYZ1234567890ABCDEFGHJK")  // Associated user resource
                    .setFirstName("Sarah")
                    .setLastName("Thompson-Johnson")
                    .setProfilePictureUrl("https://cdn.example.com/profiles/sarah-new.jpg")
                    .build())
                .build();

            // Call the UpdateUserProfile method
            UserProfile userProfile = service.updateUserProfile(request, Optional.empty());

            // Use the updated user profile
            System.out.println("User profile updated successfully:");
            System.out.println("  Name: " + userProfile.getName());
            System.out.println("  First Name: " + userProfile.getFirstName());
            System.out.println("  Last Name: " + userProfile.getLastName());
        } catch (Exception e) {
            System.err.println("UpdateUserProfile failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}