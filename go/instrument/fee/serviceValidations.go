package fee

import (
	"fmt"
	"strings"

	"github.com/meshtrade/api/go/instrument/feeprofile"
)

func (r *GetRequest) Validate() error {
	reasons := []string{}

	if len(r.GetCriteria()) == 0 {
		reasons = append(reasons, "at least 1 criteria is required")
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

func (r *CalculateMintingFeesRequest) Validate() error {
	reasons := []string{}

	amount := r.GetAmount()
	if amount == nil || amount.IsUndefined() || amount.GetValue().IsZero() {
		reasons = append(reasons, "amount must be provided and be > 0")
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

func (r *CalculateLifecycleFeesRequest) Validate() error {
	reasons := []string{}

	if r.InstrumentName == "" {
		reasons = append(reasons, "InstrumentName is required")
	}

	if r.LifecycleEventCategory == feeprofile.LifecycleEventCategory_UNDEFINED_LIFECYCLE_EVENT_CATEGORY {
		reasons = append(reasons, "LifecycleEventCategory is undefined")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}
