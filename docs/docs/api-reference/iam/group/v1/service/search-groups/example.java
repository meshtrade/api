import co.meshtrade.api.iam.group.v1.GroupService;
import co.meshtrade.api.iam.group.v1.Service.SearchGroupsRequest;
import co.meshtrade.api.iam.group.v1.Service.SearchGroupsResponse;
import co.meshtrade.api.iam.group.v1.Group.Group;
import co.meshtrade.api.type.v1.Sorting.SortingOrder;

import java.util.Optional;

public class SearchGroupsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (GroupService service = new GroupService()) {
            // Create request with search criteria
            SearchGroupsRequest request = SearchGroupsRequest.newBuilder()
                .setDisplayName("trading")      // Search for groups with "trading" in display name
                .setDescription("derivatives")  // OR groups with "derivatives" in description
                .setSorting(SearchGroupsRequest.Sorting.newBuilder()
                    .setField("display_name")
                    .setOrder(SortingOrder.SORTING_ORDER_ASC)
                    .build())
                .build();

            // Call the SearchGroups method
            SearchGroupsResponse response = service.searchGroups(request, Optional.empty());

            // Process search results with OR logic
            System.out.println("Found " + response.getGroupsCount() + " groups matching search criteria:");
            System.out.println("(Groups matching 'trading' in name OR 'derivatives' in description)");
            
            for (int i = 0; i < response.getGroupsCount(); i++) {
                Group group = response.getGroups(i);
                System.out.println("Result " + (i + 1) + ":");
                System.out.println("  Name: " + group.getName());
                System.out.println("  Display Name: " + group.getDisplayName());
                System.out.println("  Description: " + group.getDescription());
                System.out.println("  Owner: " + group.getOwner());
                System.out.println();
            }
            
            // Use filtered results for targeted operations
            if (response.getGroupsCount() > 0) {
                System.out.println("Search found relevant groups for specialized operations");
            }
        } catch (Exception e) {
            System.err.println("SearchGroups failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}