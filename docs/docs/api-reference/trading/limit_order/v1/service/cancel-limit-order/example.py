from meshtrade.trading.limit_order.v1 import (
    CancelLimitOrderRequest,
    LimitOrderService,
    LimitOrderStatus,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LimitOrderService()

    with service:
        # Cancel an active limit order by its resource name
        # Replace with an actual limit order resource name from your system
        order_name = "groups/12345/accounts/67890/limitOrders/abc123"

        request = CancelLimitOrderRequest(
            name=order_name,
        )

        # Call the CancelLimitOrder method
        response = service.cancel_limit_order(request)

        # Response contains the cancellation status
        print("✓ Limit order cancellation initiated:")
        print(f"  Order name: {order_name}")
        print(f"  Status: {response.status}")

        # Terminal cancellation states:
        # - LIMIT_ORDER_STATUS_CANCELLATION_IN_PROGRESS: Cancel submitted to ledger
        # - LIMIT_ORDER_STATUS_CANCELLED: Cancel confirmed on ledger
        if response.status == LimitOrderStatus.LIMIT_ORDER_STATUS_CANCELLED:
            print("  ✓ Order successfully cancelled on ledger")
        elif response.status == LimitOrderStatus.LIMIT_ORDER_STATUS_CANCELLATION_IN_PROGRESS:
            print("  ⏳ Cancellation in progress, check status later")


if __name__ == "__main__":
    main()
