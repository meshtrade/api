package optionv1

import "fmt"

// FullResourceNameFromGroupID returns the full qualified resource name of the role given a particular owner group id.
func (r Role) FullResourceNameFromGroupID(groupID string) string {
	return fmt.Sprintf("groups/%s/%d", groupID, r)
}
