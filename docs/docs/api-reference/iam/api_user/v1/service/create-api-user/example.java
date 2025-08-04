import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.CreateApiUserRequest;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUser;
import co.meshtrade.api.iam.role.v1.RoleOuterClass.Role;
import co.meshtrade.api.iam.role.v1.RoleUtils;

import java.util.Optional;

public class CreateApiUserExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request with service-specific parameters
            APIUser apiUserToCreate = APIUser.newBuilder()
                .setOwner(service.group()) // Current group from service context
                .setDisplayName("My Integration API Key")
                .addRoles(RoleUtils.fullResourceNameFromGroupName(Role.ROLE_IAM_ADMIN, service.group()))
                .build();
            
            CreateApiUserRequest request = CreateApiUserRequest.newBuilder()
                .setApiUser(apiUserToCreate)
                .build();

            // Call the CreateApiUser method
            APIUser apiUser = service.createApiUser(request, Optional.empty());

            // Access the created API user details
            System.out.println("Successfully created API user: " + apiUser.getName());
            System.out.println("API key: " + apiUser.getApiKey()); // Only available in creation response
            System.out.println("Display name: " + apiUser.getDisplayName());
            System.out.println("State: " + apiUser.getState()); // Initially INACTIVE
            System.out.println("Owner: " + apiUser.getOwner());
            
            // Note: Store the API key securely - it's only returned once during creation
        } catch (Exception e) {
            System.err.println("CreateApiUser failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}