// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: meshtrade/trading/limit_order/v1/service.proto
package limitorderv1

import (
	context "context"
)

type LimitOrderService interface {
	GetLimitOrder(ctx context.Context, request *GetLimitOrderRequest) (*LimitOrder, error)
}

const LimitOrderServiceServiceProviderName = "meshtrade-trading-limit_order-v1-LimitOrderService"
