import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.BatchGetUserProfilesByUserRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.BatchGetUserProfilesByUserResponse;
import co.meshtrade.api.iam.user_profile.v1.UserProfile.UserProfile;

import java.util.Arrays;
import java.util.Optional;

public class BatchGetUserProfilesByUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Batch retrieve profiles for multiple users
            BatchGetUserProfilesByUserRequest request = BatchGetUserProfilesByUserRequest.newBuilder()
                .addAllUsers(Arrays.asList(
                    "users/01HQZXYZ9ABCDEFGHIJKLMNPQR",
                    "users/01HQZXYZ9ABCDEFGHIJKLMNPQS"
                ))
                .build();

            // Call the BatchGetUserProfilesByUser method
            BatchGetUserProfilesByUserResponse response = service.batchGetUserProfilesByUser(request, Optional.empty());

            for (UserProfile profile : response.getUserProfilesList()) {
                System.out.println("Profile: " + profile.getFirstName() + " " + profile.getLastName() + " (user: " + profile.getUser() + ")");
            }
        } catch (Exception e) {
            System.err.println("BatchGetUserProfilesByUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
