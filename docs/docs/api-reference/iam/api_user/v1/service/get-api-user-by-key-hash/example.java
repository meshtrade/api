import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.GetApiUserByKeyHashRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;

import java.util.Optional;

public class GetApiUserByKeyHashExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            GetApiUserByKeyHashRequest request = GetApiUserByKeyHashRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetApiUserByKeyHash method
            APIUser apiUser = service.getApiUserByKeyHash(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetApiUserByKeyHash successful: " + apiUser);
        } catch (Exception e) {
            System.err.println("GetApiUserByKeyHash failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}