import co.meshtrade.api.iam.user.v1.UserService;
import co.meshtrade.api.iam.user.v1.Service.ListUsersRequest;
import co.meshtrade.api.iam.user.v1.Service.ListUsersResponse;
import co.meshtrade.api.iam.user.v1.User.User;
import co.meshtrade.api.type.v1.Sorting.SortingOrder;

import java.util.Optional;

public class ListUsersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserService service = new UserService()) {
            // Create request with optional sorting
            ListUsersRequest request = ListUsersRequest.newBuilder()
                .setSorting(ListUsersRequest.Sorting.newBuilder()
                    .setField("email")  // Sort by email address
                    .setOrder(SortingOrder.SORTING_ORDER_ASC)
                    .build())
                .build();

            // Call the ListUsers method
            ListUsersResponse response = service.listUsers(request, Optional.empty());

            // Process the user directory
            System.out.println("Found " + response.getUsersCount() + " users in the accessible hierarchy:");
            for (int i = 0; i < response.getUsersCount(); i++) {
                User user = response.getUsers(i);
                System.out.println("User " + (i + 1) + ":");
                System.out.println("  Name: " + user.getName());
                System.out.println("  Email: " + user.getEmail());
                System.out.println("  Owner: " + user.getOwner());
                System.out.println("  Roles: " + user.getRolesCount() + " assigned");
                System.out.println();
            }
        } catch (Exception e) {
            System.err.println("ListUsers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}