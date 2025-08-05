import co.meshtrade.api.iam.group.v1.GroupService;
import co.meshtrade.api.iam.group.v1.Service.SearchGroupsRequest;
import co.meshtrade.api.iam.group.v1.Service.SearchGroupsResponse;

import java.util.Optional;

public class SearchGroupsExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (GroupService service = new GroupService()) {
            // Create request with service-specific parameters
            SearchGroupsRequest request = SearchGroupsRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the SearchGroups method
            SearchGroupsResponse response = service.searchGroups(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("SearchGroups successful: " + response);
        } catch (Exception e) {
            System.err.println("SearchGroups failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}