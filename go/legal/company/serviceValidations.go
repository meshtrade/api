package company

import (
	"fmt"
	"strings"
)

func (r *ListRequest) Validate() error {
	reasons := []string{}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}
