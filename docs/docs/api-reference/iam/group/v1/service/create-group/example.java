import co.meshtrade.api.iam.group.v1.GroupService;
import co.meshtrade.api.iam.group.v1.Service.CreateGroupRequest;
import co.meshtrade.api.iam.group.v1.Group.Group;

import java.util.Optional;

public class CreateGroupExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (GroupService service = new GroupService()) {
            // Create request with service-specific parameters
            CreateGroupRequest request = CreateGroupRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the CreateGroup method
            Group group = service.createGroup(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("CreateGroup successful: " + group);
        } catch (Exception e) {
            System.err.println("CreateGroup failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}