package instrument

import (
	fmt "fmt"
	"strings"
)

func (r *MintRequest) Validate() error {
	reasons := []string{}

	if r.GetFeeAccountNumber() == "" {
		reasons = append(reasons, "feeAccountNumber not set")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *BurnRequest) Validate() error {
	reasons := []string{}

	if r.GetFeeAccountNumber() == "" {
		reasons = append(reasons, "feeAccountNumber not set")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}
