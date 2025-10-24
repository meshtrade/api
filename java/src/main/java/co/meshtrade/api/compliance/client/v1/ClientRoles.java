package co.meshtrade.api.compliance.client.v1;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.google.protobuf.Descriptors;

import co.meshtrade.api.compliance.client.v1.ClientOuterClass.Client;
import co.meshtrade.api.iam.role.v1.RoleOuterClass;

/**
 * Utility methods for accessing Client default roles via protobuf extensions.
 *
 * <p>This class provides methods to extract roles declared on the Client message
 * using the {@code meshtrade.iam.role.v1.message_roles} protobuf option.
 *
 * <p><b>Thread-safety:</b> Methods are thread-safe. Role extraction is performed
 * on first access and cached for subsequent calls.
 *
 */
public final class ClientRoles {

    private static volatile List<RoleOuterClass.Role> cachedRoles;
    private static volatile List<RoleOuterClass.Role> cachedUnmodifiableRoles;
    private static volatile Set<RoleOuterClass.Role> cachedRoleSet;
    private static volatile Set<RoleOuterClass.Role> cachedUnmodifiableRoleSet;

    private ClientRoles() {
        throw new UnsupportedOperationException("Utility class - cannot be instantiated");
    }

    /**
     * Returns the roles declared on the Client message via the message_roles option.
     *
     * <p>The returned list is an immutable copy, so callers can safely use it
     * without affecting subsequent calls.
     *
     * <p>This method uses lazy initialization with double-checked locking for thread-safe
     * role extraction on first access.
     *
         *
     * @return Immutable list of roles declared on the Client message
     * @throws IllegalStateException if the message_roles extension cannot be read
     *
     * <p><b>Example:</b>
     * <pre>{@code
     * List<Role> roles = ClientRoles.getClientDefaultRoles();
     * // Returns roles like [ROLE_COMPLIANCE_ADMIN, ROLE_COMPLIANCE_VIEWER, ...]
     * }</pre>
     */
    public static List<RoleOuterClass.Role> getClientDefaultRoles() {
        if (cachedUnmodifiableRoles == null) {
            synchronized (ClientRoles.class) {
                if (cachedUnmodifiableRoles == null) {
                    if (cachedRoles == null) {
                        cachedRoles = extractClientRoles();
                    }
                    cachedUnmodifiableRoles = Collections.unmodifiableList(cachedRoles);
                }
            }
        }
        return cachedUnmodifiableRoles;
    }

    /**
     * Returns the roles declared on the Client message as a Set for O(1) membership checks.
     *
     * <p>The returned set is an immutable copy. This method is useful for efficiently
     * checking if a specific role is in the default roles list.
     *
         *
     * @return Immutable set of roles declared on the Client message
     * @throws IllegalStateException if the message_roles extension cannot be read
     *
     * <p><b>Example:</b>
     * <pre>{@code
     * Set<Role> roleSet = ClientRoles.getClientDefaultRoleSet();
     * if (roleSet.contains(Role.ROLE_COMPLIANCE_ADMIN)) {
     *     // Role is a client default role
     * }
     * }</pre>
     */
    public static Set<RoleOuterClass.Role> getClientDefaultRoleSet() {
        if (cachedUnmodifiableRoleSet == null) {
            synchronized (ClientRoles.class) {
                if (cachedUnmodifiableRoleSet == null) {
                    if (cachedRoleSet == null) {
                        cachedRoleSet = new HashSet<>(getClientDefaultRoles());
                    }
                    cachedUnmodifiableRoleSet = Collections.unmodifiableSet(cachedRoleSet);
                }
            }
        }
        return cachedUnmodifiableRoleSet;
    }

    /**
     * Extracts client default roles from the protobuf message descriptor.
     *
     * <p>Note: This method does not catch exceptions because protobuf descriptor operations
     * don't throw checked exceptions. Any RuntimeExceptions are programming errors that
     * should propagate naturally for debugging.
     *
     * @return List of roles from the message_roles extension
     * @throws IllegalStateException if the message_roles extension is not defined
     */
    private static List<RoleOuterClass.Role> extractClientRoles() {
        // Get the Client message descriptor
        Descriptors.Descriptor descriptor = Client.getDescriptor();
        Descriptors.FieldDescriptor messageRolesField = RoleOuterClass.messageRoles.getDescriptor();

        // Get the message options
        com.google.protobuf.DescriptorProtos.MessageOptions options = descriptor.getOptions();

        // Check if the extension exists
        if (!options.hasExtension(RoleOuterClass.messageRoles)) {
            throw new IllegalStateException(
                String.format(
                    "Proto message %s does not define extension %s",
                    descriptor.getFullName(),
                    messageRolesField.getFullName()
                )
            );
        }

        // Get the extension value (RoleList)
        RoleOuterClass.RoleList roleList = options.getExtension(RoleOuterClass.messageRoles);

        // Extract roles from the RoleList
        return new ArrayList<>(roleList.getRolesList());
    }
}
