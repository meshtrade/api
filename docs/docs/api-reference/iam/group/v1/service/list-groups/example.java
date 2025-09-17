import co.meshtrade.api.iam.group.v1.GroupService;
import co.meshtrade.api.iam.group.v1.Service.ListGroupsRequest;
import co.meshtrade.api.iam.group.v1.Service.ListGroupsResponse;
import co.meshtrade.api.iam.group.v1.Group.Group;
import co.meshtrade.api.type.v1.Sorting.SortingOrder;

import java.util.Optional;

public class ListGroupsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (GroupService service = new GroupService()) {
            // Create request with optional sorting
            ListGroupsRequest request = ListGroupsRequest.newBuilder()
                .setSorting(ListGroupsRequest.Sorting.newBuilder()
                    .setField("display_name")  // Sort by human-readable name
                    .setOrder(SortingOrder.SORTING_ORDER_ASC)
                    .build())
                .build();

            // Call the ListGroups method
            ListGroupsResponse response = service.listGroups(request, Optional.empty());

            // Process the complete organizational hierarchy
            System.out.println("Found " + response.getGroupsCount() + " groups in the accessible hierarchy:");
            for (int i = 0; i < response.getGroupsCount(); i++) {
                Group group = response.getGroups(i);
                System.out.println("Group " + (i + 1) + ":");
                System.out.println("  Name: " + group.getName());
                System.out.println("  Display Name: " + group.getDisplayName());
                System.out.println("  Owner: " + group.getOwner());
                System.out.println("  Hierarchy Depth: " + group.getOwnersCount() + " levels");
                if (!group.getDescription().isEmpty()) {
                    System.out.println("  Description: " + group.getDescription());
                }
                System.out.println();
            }
            
            // Use groups for resource ownership and access control
            System.out.println("All groups are available for owning resources and managing access");
        } catch (Exception e) {
            System.err.println("ListGroups failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}