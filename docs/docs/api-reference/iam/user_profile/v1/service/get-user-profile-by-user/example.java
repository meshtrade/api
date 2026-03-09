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
            // Create request with the user resource name
            // Replace the ULIDv2 with your actual user ID
            GetUserProfileByUserRequest request = GetUserProfileByUserRequest.newBuilder()
                .setUser("users/01HQZXYZ9ABCDEFGHIJKLMNPQR")
                .build();

            // Call the GetUserProfileByUser method
            UserProfile userProfile = service.getUserProfileByUser(request, Optional.empty());

            // Use the retrieved user profile
            System.out.println("User Profile Retrieved:");
            System.out.println("  Name: " + userProfile.getName());
            System.out.println("  First Name: " + userProfile.getFirstName());
            System.out.println("  Last Name: " + userProfile.getLastName());
            System.out.println("  User: " + userProfile.getUserName());
            System.out.println("  Locale: " + userProfile.getLocale());
        } catch (Exception e) {
            System.err.println("GetUserProfileByUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}