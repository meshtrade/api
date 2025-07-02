package funding

import (
	"fmt"
	"strings"
)

func (r *CreateRequest) Validate() error {
	var reasons []string

	if r.Funding == nil {
		reasons = append(reasons, "Funding is required")
	}

	if r.Funding.Amount == nil {
		reasons = append(reasons, "Funding.Amount is not set")
	} else if r.Funding.Amount.Token.IsUndefined() {
		reasons = append(reasons, "Funding.Amount.Token is undefined")
	}

	if !r.Funding.Amount.Value.IsPositive() {
		reasons = append(reasons, "Funding.Amount must be > 0")
	}

	if r.Funding.MetaData == nil {
		reasons = append(reasons, "MetaData is required")
	}

	if r.Funding.MetaData.IsValid() {
		reasons = append(reasons, "MetaData is not valid")
	}

	if r.Funding.FundingOrigin == FundingOrigin_UNDEFINED_FUNDING_ORIGIN {
		reasons = append(reasons, "Funding Origin undefined")
	}

	if r.Funding.ValueDate.IsValid() {
		reasons = append(reasons, "Value date not valid")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *UpdateRequest) Validate() error {
	var reasons []string

	if r.Funding == nil {
		reasons = append(reasons, "Funding is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *ListRequest) Validate() error {
	var reasons []string

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *GetRequest) Validate() error {
	var reasons []string

	if len(r.GetCriteria()) == 0 {
		reasons = append(reasons, "at least 1 criterion is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *SettleRequest) Validate() error {
	var reasons []string

	if r.FundingNumber == "" {
		reasons = append(reasons, "FundingNumber is required")
	}

	if r.Reason == "" {
		reasons = append(reasons, "reason is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *CancelRequest) Validate() error {
	reasons := []string{}

	if r.FundingNumber == "" {
		reasons = append(reasons, "FundingNumber is required")
	}

	if r.Reason == "" {
		reasons = append(reasons, "reason is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *ResolveStateRequest) Validate() error {
	reasons := []string{}

	if r.FundingNumber == "" {
		reasons = append(reasons, "FundingNumber is required")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}
