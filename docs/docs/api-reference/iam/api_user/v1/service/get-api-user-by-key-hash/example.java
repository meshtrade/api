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
                .setKeyHash("hash_of_api_key_123456") // Hash of the API key (calculated by auth system)
                .build();

            // Call the GetApiUserByKeyHash method
            APIUser apiUser = service.getApiUserByKeyHash(request, Optional.empty());

            // Access API user details retrieved by key hash
            System.out.println("Found API user: " + apiUser.getName());
            System.out.println("Display name: " + apiUser.getDisplayName());
            System.out.println("State: " + apiUser.getState());
            System.out.println("Owner: " + apiUser.getOwner());
            
            // Note: This method is typically used by authentication systems
            // to validate API keys and retrieve associated user information
        } catch (Exception e) {
            System.err.println("GetApiUserByKeyHash failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}