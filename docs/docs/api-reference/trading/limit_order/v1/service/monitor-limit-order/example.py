from meshtrade.trading.limit_order.v1 import (
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
        # Monitor a limit order in real-time via server-side streaming
        # You can use either the resource name or external reference

        # Option 1: Monitor by resource name
        request = MonitorLimitOrderRequest(
            name="limit_orders/01HQVBZ9F8X2T3K4M5N6P7Q8R9",
        )

        # Option 2: Monitor by external reference (commented out)
        # request = MonitorLimitOrderRequest(
        #     external_reference="my-trading-system-order-123",
        # )

        # Call the MonitorLimitOrder streaming method
        # This opens a long-lived server-side stream that pushes order updates
        stream = service.monitor_limit_order(request)

        print("✓ Monitoring limit order for real-time updates...")
        print("  Listening for status changes... (Ctrl+C to stop)")

        try:
            # Consume stream responses
            # The server pushes updates whenever order status changes on the ledger
            for limit_order in stream:
                # Process each order update as it arrives
                print(f"\n📡 Status update received: {limit_order.status}")
                print(f"  Resource name: {limit_order.name}")
                print(f"  Account: {limit_order.account}")
                print(f"  External ref: {limit_order.external_reference}")
                print(f"  Side: {limit_order.side}")
                print(f"  Limit price: {limit_order.limit_price.value.value} {limit_order.limit_price.token.code}")
                print(f"  Quantity: {limit_order.quantity.value.value} {limit_order.quantity.token.code}")

                # Handle order state transitions
                if limit_order.status == LimitOrderStatus.LIMIT_ORDER_STATUS_SUBMISSION_IN_PROGRESS:
                    print("  ⏳ Order submission in progress...")

                elif limit_order.status == LimitOrderStatus.LIMIT_ORDER_STATUS_SUBMISSION_FAILED:
                    print("  ❌ Order submission failed")
                    break

                elif limit_order.status == LimitOrderStatus.LIMIT_ORDER_STATUS_OPEN:
                    print("  ✓ Order open on ledger and available for matching")
                    # Order is active - continue monitoring for fills

                elif limit_order.status == LimitOrderStatus.LIMIT_ORDER_STATUS_COMPLETE_IN_PROGRESS:
                    print("  ⏳ Order completion in progress...")

                elif limit_order.status == LimitOrderStatus.LIMIT_ORDER_STATUS_COMPLETE:
                    print("  🎉 Order completed (fully filled)!")
                    break

                elif limit_order.status == LimitOrderStatus.LIMIT_ORDER_STATUS_CANCELLATION_IN_PROGRESS:
                    print("  ⏳ Order cancellation in progress...")

                elif limit_order.status == LimitOrderStatus.LIMIT_ORDER_STATUS_CANCELLED:
                    print("  ❌ Order cancelled")
                    break

                else:
                    print(f"  ⚠️  Unexpected order status: {limit_order.status}")

            print("\n✓ Stream completed successfully")
        except Exception as e:
            print(f"Stream error: {e}")
            raise


if __name__ == "__main__":
    main()
