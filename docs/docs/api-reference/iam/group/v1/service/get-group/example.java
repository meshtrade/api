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
            // Create request with group resource name
            GetGroupRequest request = GetGroupRequest.newBuilder()
                .setName("groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU")  // Group ULIDv2 identifier
                .build();

            // Call the GetGroup method
            Group group = service.getGroup(request, Optional.empty());

            // Access group details and hierarchy information
            System.out.println("Group retrieved successfully:");
            System.out.println("  Name: " + group.getName());
            System.out.println("  Display Name: " + group.getDisplayName());
            System.out.println("  Description: " + group.getDescription());
            System.out.println("  Direct Owner: " + group.getOwner());
            System.out.println("  Full Ownership Path: " + group.getOwnersList());
            
            // Use group information for resource ownership validation
            if (group.getOwnersCount() > 1) {
                System.out.println("Group has " + group.getOwnersCount() + " levels in the hierarchy");
            }
        } catch (Exception e) {
            System.err.println("GetGroup failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}