import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.GetUserProfileRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.GetUserProfileResponse;
import co.meshtrade.api.iam.user_profile.v1.UserProfile.UserProfile;

import java.util.Optional;

public class GetUserProfileExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create request to get a specific user profile by name (resource identifier)
            GetUserProfileRequest request = GetUserProfileRequest.newBuilder()
                .setName("user_profiles/01JCXYZ1234567890ABCDEFGHJK")  // User profile resource name
                .build();

            // Call the GetUserProfile method
            GetUserProfileResponse response = service.getUserProfile(request, Optional.empty());

            // Use the retrieved user profile information
            UserProfile userProfile = response.getUserProfile();
            System.out.println("Retrieved user profile successfully:");
            System.out.println("  Name: " + userProfile.getName());           // System-generated identifier
            System.out.println("  Display Name: " + userProfile.getDisplayName());
            System.out.println("  User: " + userProfile.getUserName());
            System.out.println("  Owner: " + userProfile.getOwner());         // Direct group owner
            if (!userProfile.getContactDetails().getEmailAddress().isEmpty()) {
                System.out.println("  Email: " + userProfile.getContactDetails().getEmailAddress());
            }
            if (!userProfile.getContactDetails().getMobileNumber().isEmpty()) {
                System.out.println("  Mobile: " + userProfile.getContactDetails().getMobileNumber());
            }

            // User profile information can be used for display or management
            System.out.println("User profile for " + userProfile.getDisplayName() + " loaded successfully");
        } catch (Exception e) {
            System.err.println("GetUserProfile failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}