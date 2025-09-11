import co.meshtrade.api.iam.user.v1.UserService;
import co.meshtrade.api.iam.user.v1.Service.SearchUsersRequest;
import co.meshtrade.api.iam.user.v1.Service.SearchUsersResponse;
import co.meshtrade.api.iam.user.v1.User.User;
import co.meshtrade.api.type.v1.Sorting.SortingOrder;

import java.util.Optional;

public class SearchUsersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserService service = new UserService()) {
            // Search for users by email substring
            SearchUsersRequest request = SearchUsersRequest.newBuilder()
                .setEmail("thompson")  // Substring to search for in email addresses
                .setSorting(SearchUsersRequest.Sorting.newBuilder()
                    .setField("email")  // Sort results by email address
                    .setOrder(SortingOrder.SORTING_ORDER_ASC)
                    .build())
                .build();

            // Call the SearchUsers method
            SearchUsersResponse response = service.searchUsers(request, Optional.empty());

            // Process search results
            if (response.getUsersCount() == 0) {
                System.out.println("No users found matching email pattern: " + request.getEmail());
            } else {
                System.out.println("Found " + response.getUsersCount() + " users matching '" + request.getEmail() + "':");
                for (int i = 0; i < response.getUsersCount(); i++) {
                    User user = response.getUsers(i);
                    System.out.println("User " + (i + 1) + ":");
                    System.out.println("  Name: " + user.getName());
                    System.out.println("  Email: " + user.getEmail());
                    System.out.println("  Owner: " + user.getOwner());
                    System.out.println("  Roles: " + user.getRolesCount() + " assigned");
                    System.out.println();
                }
            }
        } catch (Exception e) {
            System.err.println("SearchUsers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}