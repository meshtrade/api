package fee

import (
	"fmt"
	"strings"
)

func (r *GetRequest) Validate() error {
	reasons := []string{}

	if r.Criteria == nil {
		reasons = append(reasons, "FeeProfile is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *ListRequest) Validate() error {
	reasons := []string{}

	if r.Criteria == nil {
		reasons = append(reasons, "Fee is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *CalculateMintingFeesRequest) Validate() error {
	reasons := []string{}

	if r.Amount == nil {
		reasons = append(reasons, "Amount is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *CalculateBurningFeesRequest) Validate() error {
	reasons := []string{}

	if r.Amount == nil {
		reasons = append(reasons, "Amount is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}
