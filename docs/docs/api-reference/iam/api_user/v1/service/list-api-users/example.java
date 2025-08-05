import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.ListApiUsersRequest;
import co.meshtrade.api.iam.api_user.v1.Service.ListApiUsersResponse;

import java.util.Optional;

public class ListApiUsersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ApiUserService service = new ApiUserService()) {
            // Create request (no parameters needed for basic list)
            ListApiUsersRequest request = ListApiUsersRequest.newBuilder()
                .build();

            // Call the ListApiUsers method
            ListApiUsersResponse response = service.listApiUsers(request, Optional.empty());

            // Process the list of API users
            System.out.println("Found " + response.getApiUsersCount() + " API users");
            
            for (int i = 0; i < response.getApiUsersCount(); i++) {
                var apiUser = response.getApiUsers(i);
                System.out.println("API User " + (i + 1) + ":");
                System.out.println("  Name: " + apiUser.getName());
                System.out.println("  Display Name: " + apiUser.getDisplayName());
                System.out.println("  State: " + apiUser.getState());
                System.out.println("  Owner: " + apiUser.getOwner());
            }
        } catch (Exception e) {
            System.err.println("ListApiUsers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}