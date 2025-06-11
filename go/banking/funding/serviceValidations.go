package funding

import (
	"fmt"
	"strings"
)

func (r *CreateRequest) Validate() error {
	reasons := []string{}

	if r.Funding == nil {
		reasons = append(reasons, "Funding is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *UpdateRequest) Validate() error {
	reasons := []string{}

	if r.Funding == nil {
		reasons = append(reasons, "Funding is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *ListRequest) Validate() error {
	reasons := []string{}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *GetRequest) Validate() error {
	reasons := []string{}

	if len(r.GetCriteria()) == 0 {
		reasons = append(reasons, "at least 1 criterion is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *SettleRequest) Validate() error {
	reasons := []string{}

	if r.FundingNumber == "" {
		reasons = append(reasons, "FundingNumber is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}
