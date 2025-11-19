from meshtrade.trading.limit_order.v1 import (
    GetLimitOrderRequest,
    LimitOrderService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LimitOrderService()

    with service:
        # Get a limit order by its resource name
        # Replace with an actual limit order resource name from your system
        order_name = "groups/12345/accounts/67890/limitOrders/abc123"

        # Example 1: Get without live ledger data (faster, but status will be UNSPECIFIED)
        request = GetLimitOrderRequest(
            name=order_name,
            live_ledger_data=False,
        )

        limit_order = service.get_limit_order(request)

        print("✓ Limit order retrieved (cached data):")
        print(f"  Resource name: {limit_order.name}")
        print(f"  Account: {limit_order.account}")
        print(f"  External reference: {limit_order.external_reference}")
        print(f"  Side: {limit_order.side}")
        print(f"  Status: {limit_order.status} (UNSPECIFIED when live_ledger_data=false)")

        # Example 2: Get with live ledger data (queries the ledger for current status)
        request_with_live_data = GetLimitOrderRequest(
            name=order_name,
            live_ledger_data=True,
        )

        limit_order_with_status = service.get_limit_order(request_with_live_data)

        print("\n✓ Limit order retrieved (with live ledger data):")
        print(f"  Resource name: {limit_order_with_status.name}")
        print(f"  Status: {limit_order_with_status.status}")
        print(f"  Limit price: {limit_order_with_status.limit_price.value.value} {limit_order_with_status.limit_price.token.code}")
        print(f"  Quantity: {limit_order_with_status.quantity.value.value} {limit_order_with_status.quantity.token.code}")


if __name__ == "__main__":
    main()
