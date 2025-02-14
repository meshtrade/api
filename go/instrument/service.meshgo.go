package instrument

import (
	context "context"
)

type Service interface {
	Mint(ctx context.Context, request *MintRequest) (*MintResponse, error)
	Burn(ctx context.Context, request *BurnRequest) (*BurnResponse, error)
}

const ServiceProviderName = "instrument-Service"
