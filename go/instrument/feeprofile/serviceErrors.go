package feeprofile

import "errors"

var (
	ErrFeeProfileAlreadyExists = errors.New("fee profile already exists")
	ErrFeeProfileNotFound      = errors.New("fee profile not found")
)
