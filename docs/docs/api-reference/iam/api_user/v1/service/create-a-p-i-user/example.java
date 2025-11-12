import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.CreateAPIUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;

import java.util.Optional;

public class CreateAPIUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            CreateAPIUserRequest request = CreateAPIUserRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the CreateAPIUser method
            APIUser apiUser = service.createAPIUser(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("CreateAPIUser successful: " + apiUser);
        } catch (Exception e) {
            System.err.println("CreateAPIUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}