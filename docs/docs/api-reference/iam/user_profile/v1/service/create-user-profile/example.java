import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.CreateUserProfileRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.CreateUserProfileResponse;

import java.util.Optional;

public class CreateUserProfileExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create request with service-specific parameters
            CreateUserProfileRequest request = CreateUserProfileRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the CreateUserProfile method
            CreateUserProfileResponse response = service.createUserProfile(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("CreateUserProfile successful: " + response);
        } catch (Exception e) {
            System.err.println("CreateUserProfile failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}