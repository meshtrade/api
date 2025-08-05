import co.meshtrade.api.iam.group.v1.GroupService;
import co.meshtrade.api.iam.group.v1.Service.ListGroupsRequest;
import co.meshtrade.api.iam.group.v1.Service.ListGroupsResponse;

import java.util.Optional;

public class ListGroupsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (GroupService service = new GroupService()) {
            // Create request with service-specific parameters
            ListGroupsRequest request = ListGroupsRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the ListGroups method
            ListGroupsResponse response = service.listGroups(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("ListGroups successful: " + response);
        } catch (Exception e) {
            System.err.println("ListGroups failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}