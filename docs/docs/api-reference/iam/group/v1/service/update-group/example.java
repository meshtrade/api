import co.meshtrade.api.iam.group.v1.GroupService;
import co.meshtrade.api.iam.group.v1.Service.UpdateGroupRequest;
import co.meshtrade.api.iam.group.v1.Service.GetGroupRequest;
import co.meshtrade.api.iam.group.v1.Group.Group;

import java.util.Optional;

public class UpdateGroupExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (GroupService service = new GroupService()) {
            // Get the existing group to update (example assumes you know the group name)
            // Note: Group names are in format "groups/{ULIDv2}" (e.g. "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU")
            // In practice, you would get this from a previous createGroup call or listGroups result
            String existingGroupName = "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU";  // Example group name
            Group existingGroup = service.getGroup(GetGroupRequest.newBuilder()
                .setName(existingGroupName)
                .build(), Optional.empty());

            // Create request with complete group data (immutable fields must match existing)
            UpdateGroupRequest request = UpdateGroupRequest.newBuilder()
                .setGroup(Group.newBuilder()
                    .setName(existingGroup.getName())        // Must match existing
                    .setOwner(existingGroup.getOwner())       // Must match existing
                    .setDisplayName("Trading Team Alpha - Updated")  // Can be modified
                    .setDescription("Primary trading team specializing in equity markets, derivatives, and fixed income instruments")  // Can be modified
                    .build())
                .build();

            // Call the UpdateGroup method
            Group group = service.updateGroup(request, Optional.empty());

            // Verify the updated group information
            System.out.println("Group updated successfully:");
            System.out.println("  Name: " + group.getName() + " (immutable)");
            System.out.println("  Display Name: " + group.getDisplayName() + " (updated)");
            System.out.println("  Description: " + group.getDescription() + " (updated)");
            System.out.println("  Owner: " + group.getOwner() + " (immutable)");
            System.out.println("  Full Ownership Path: " + group.getOwnersList());
            
            // Updated group retains all existing relationships and permissions
            System.out.println("Group identity preserved, metadata updated successfully");
        } catch (Exception e) {
            System.err.println("UpdateGroup failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}