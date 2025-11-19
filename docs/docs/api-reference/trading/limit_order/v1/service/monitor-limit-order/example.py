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
        # Monitor limit orders in real-time via server-side streaming
        # Replace with an actual account resource name from your system
        account_name = "groups/12345/accounts/67890"

        request = MonitorLimitOrderRequest(
            # Optional: Filter by account (monitor only orders for this account)
            account=account_name,
            # Optional: Filter by external reference
            # external_reference="my-trading-system-order-123",
        )

        # Call the MonitorLimitOrder streaming method
        # This opens a long-lived server-side stream that pushes order updates
        stream = service.monitor_limit_order(request)

        print(f"✓ Monitoring limit orders for account: {account_name}")
        print("  Listening for real-time updates... (Ctrl+C to stop)")

        try:
            # Consume stream responses
            # The server pushes updates whenever order status changes on the ledger
            for update_count, limit_order in enumerate(stream, start=1):
                # Process each order update as it arrives
                print(f"\n📡 Update #{update_count} received:")
                print(f"  Resource name: {limit_order.name}")
                print(f"  Account: {limit_order.account}")
                print(f"  External ref: {limit_order.external_reference}")
                print(f"  Side: {limit_order.side}")
                print(f"  Status: {limit_order.status}")
                print(f"  Limit price: {limit_order.limit_price.value.value} {limit_order.limit_price.token.code}")
                print(f"  Quantity: {limit_order.quantity.value.value} {limit_order.quantity.token.code}")

                # Example: React to specific status changes
                if limit_order.status == LimitOrderStatus.LIMIT_ORDER_STATUS_FILLED:
                    print("  🎉 Order fully filled!")
                elif limit_order.status == LimitOrderStatus.LIMIT_ORDER_STATUS_CANCELLED:
                    print("  ❌ Order cancelled")
                elif limit_order.status == LimitOrderStatus.LIMIT_ORDER_STATUS_PARTIALLY_FILLED:
                    print("  ⏳ Order partially filled")

            print("\n✓ Stream completed successfully")
        except Exception as e:
            print(f"Stream error: {e}")
            raise


if __name__ == "__main__":
    main()
