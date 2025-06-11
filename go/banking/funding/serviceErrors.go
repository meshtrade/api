package funding

import "errors"

var (
	ErrFundingAlreadyExists = errors.New("funding already exists")
	ErrFundingNotFound      = errors.New("funding not found")
)
