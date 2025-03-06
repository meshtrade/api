package instrument

import (
	fmt "fmt"
	"strings"
)

func (r *MintRequest) Validate() error {
	reasons := []string{}

	if r.FeeAccountNumber == "" {
		reasons = append(reasons, "feeAccountNumber not set")
	}

	if r.DestinationAccountNumber == "" {
		reasons = append(reasons, "destination account number not set")
	}

	if r.Amount == nil {
		reasons = append(reasons, "amount not set")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}

func (r *BurnRequest) Validate() error {
	reasons := []string{}

	if r.FeeAccountNumber == "" {
		reasons = append(reasons, "feeAccountNumber not set")
	}

	if r.SourceAccountNumber == "" {
		reasons = append(reasons, "source account number not set")
	}

	if r.Amount == nil {
		reasons = append(reasons, "amount not set")
	}

	if len(reasons) > 0 {
		return fmt.Errorf("validation failed: %s ", strings.Join(reasons, "; "))
	}

	return nil
}
