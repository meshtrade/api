import co.meshtrade.api.iam.group.v1.GroupService;
import co.meshtrade.api.iam.group.v1.Service.GetGroupRequest;
import co.meshtrade.api.iam.group.v1.Group.Group;

import java.util.Optional;

public class GetGroupExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (GroupService service = new GroupService()) {
            // Create request with service-specific parameters
            GetGroupRequest request = GetGroupRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetGroup method
            Group group = service.getGroup(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetGroup successful: " + group);
        } catch (Exception e) {
            System.err.println("GetGroup failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}