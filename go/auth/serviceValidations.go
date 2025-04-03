package auth

import (
	fmt "fmt"
	"strings"
)

func (r *LoginWithFirebaseTokenRequest) Validate() error {
	// A slice of reasons for the validation failure
	reasons := []string{}

	if r.GetFirebaseToken() == "" {
		reasons = append(reasons, "firebase token is not set")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s", strings.Join(reasons, "; "))
	}

	return nil
}
