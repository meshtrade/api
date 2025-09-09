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
            // Get current executing group to use as owner for the new child group
            // Note: Owner format is "groups/{ULIDv2}" (e.g. "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU")
            // but you can only create groups owned by your authenticated context
            Group currentGroup = service.getCurrentGroup(Optional.empty());

            // Create request with group configuration
            CreateGroupRequest request = CreateGroupRequest.newBuilder()
                .setGroup(Group.newBuilder()
                    .setOwner(currentGroup.getName())  // Current executing group becomes the parent
                    .setDisplayName("Trading Team Alpha")
                    .setDescription("Primary trading team for equity markets and derivatives")
                    .build())
                .build();

            // Call the CreateGroup method
            Group group = service.createGroup(request, Optional.empty());

            // Use the newly created group
            System.out.println("Group created successfully:");
            System.out.println("  Name: " + group.getName());
            System.out.println("  Display Name: " + group.getDisplayName());
            System.out.println("  Owner: " + group.getOwner());
            System.out.println("  Description: " + group.getDescription());
            
            // The group can now be used to own resources and manage users
            System.out.println("Group is ready to own API users, accounts, and trading resources");
        } catch (Exception e) {
            System.err.println("CreateGroup failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}