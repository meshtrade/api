import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.ListUserProfilesRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.ListUserProfilesResponse;
import co.meshtrade.api.iam.user_profile.v1.UserProfile.UserProfile;

import java.util.Optional;

public class ListUserProfilesExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create request - no parameters needed for simple list
            ListUserProfilesRequest request = ListUserProfilesRequest.newBuilder()
                .build();

            // Call the ListUserProfiles method
            ListUserProfilesResponse response = service.listUserProfiles(request, Optional.empty());

            // Process the user profile directory
            System.out.println("Found " + response.getUserProfilesCount() + " user profiles in the accessible hierarchy:");
            int i = 1;
            for (UserProfile profile : response.getUserProfilesList()) {
                System.out.println("User Profile " + i + ":");
                System.out.println("  Name: " + profile.getName());
                System.out.println("  Display Name: " + profile.getDisplayName());
                System.out.println("  User: " + profile.getUserName());
                System.out.println("  Owner: " + profile.getOwner());
                if (!profile.getContactDetails().getEmailAddress().isEmpty()) {
                    System.out.println("  Email: " + profile.getContactDetails().getEmailAddress());
                }
                System.out.println();
                i++;
            }
        } catch (Exception e) {
            System.err.println("ListUserProfiles failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}