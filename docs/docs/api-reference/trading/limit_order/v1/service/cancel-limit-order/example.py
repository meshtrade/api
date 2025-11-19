from meshtrade.trading.limit_order.v1 import (
    CancelLimitOrderRequest,
    LimitOrderService,
    LimitOrderStatus,
    MonitorLimitOrderRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LimitOrderService()

    with service:
        # Cancel an active limit order by its resource name
        # Replace with an actual limit order resource name from your system
        order_name = "limit_orders/01HQVBZ9F8X2T3K4M5N6P7Q8R9"

        request = CancelLimitOrderRequest(
            name=order_name,
        )

        # Call the CancelLimitOrder method
        response = service.cancel_limit_order(request)

        # Response contains the cancellation status
        print("✓ Limit order cancellation initiated:")
        print(f"  Order name: {order_name}")
        print(f"  Status: {response.status}")

        # Monitor the order until cancellation is complete
        print("\n📡 Monitoring order until cancellation is complete...")
        monitor_request = MonitorLimitOrderRequest(
            name=order_name,
        )

        stream = service.monitor_limit_order(monitor_request)

        for update in stream:
            print(f"  Status: {update.status}")

            if update.status == LimitOrderStatus.LIMIT_ORDER_STATUS_CANCELLATION_IN_PROGRESS:
                print("  ⏳ Order cancellation in progress...")

            elif update.status == LimitOrderStatus.LIMIT_ORDER_STATUS_CANCELLED:
                print("  ✓ Order successfully cancelled on ledger!")
                break


if __name__ == "__main__":
    main()
