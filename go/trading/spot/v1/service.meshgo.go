// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: meshtrade/trading/spot/v1/service.proto
package spotv1

import (
	context "context"
)

type SpotService interface {
	GetSpot(ctx context.Context, request *GetSpotRequest) (*Spot, error)
}

const SpotServiceServiceProviderName = "meshtrade-trading-spot-v1-SpotService"
