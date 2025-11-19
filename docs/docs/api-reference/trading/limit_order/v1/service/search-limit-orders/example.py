from meshtrade.trading.limit_order.v1 import (
    LimitOrderService,
    SearchLimitOrdersRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LimitOrderService()

    with service:
        # Search limit orders with optional filters
        # Replace with an actual account resource name from your system
        account_name = "accounts/01HQVBZ9F8X2T3K4M5N6P7Q8R9"

        request = SearchLimitOrdersRequest(
            # Optional: Filter by token code
            token="USDC",
            # Optional: Filter by account (returns only orders for this account)
            account=account_name,
            # Optional: Set to true to enrich with live ledger status
            live_ledger_data=True,
        )

        # Call the SearchLimitOrders method
        response = service.search_limit_orders(request)

        # Response contains filtered list of limit orders
        print(f"✓ Found {len(response.limit_orders)} limit orders matching filters:")
        for i, order in enumerate(response.limit_orders, 1):
            print(f"\n  Order #{i}:")
            print(f"    Resource name: {order.name}")
            print(f"    Account: {order.account}")
            print(f"    External ref: {order.external_reference}")
            print(f"    Side: {order.side}")
            print(f"    Status: {order.status}")
            print(f"    Limit price: {order.limit_price.value.value} {order.limit_price.token.code}")
            print(f"    Quantity: {order.quantity.value.value} {order.quantity.token.code}")


if __name__ == "__main__":
    main()
