from meshtrade.trading.limit_order.v1 import (
    LimitOrderService,
    ListLimitOrdersRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LimitOrderService()

    with service:
        # List all limit orders in your group hierarchy
        # Use pagination to iterate through large result sets
        request = ListLimitOrdersRequest(
            # Optional: Set to true to enrich with live ledger status (slower)
            live_ledger_data=False,
            # Optional: Page size for pagination (default: 50, max: 1000)
            page_size=100,
            # Optional: Page token from previous response for next page
            # page_token="previous-page-token",
        )

        # Call the ListLimitOrders method
        response = service.list_limit_orders(request)

        # Response contains paginated list of limit orders
        print(f"✓ Listed {len(response.limit_orders)} limit orders:")
        for i, order in enumerate(response.limit_orders, 1):
            print(f"\n  Order #{i}:")
            print(f"    Resource name: {order.name}")
            print(f"    Account: {order.account}")
            print(f"    External ref: {order.external_reference}")
            print(f"    Side: {order.side}")
            print(f"    Limit price: {order.limit_price.value.value} {order.limit_price.token.code}")
            print(f"    Quantity: {order.quantity.value.value} {order.quantity.token.code}")
            print(f"    Status: {order.status}")

        # Check if there are more pages
        if response.next_page_token:
            print(f"\n  Next page token: {response.next_page_token}")
            print("  Use this token in the next request to fetch more orders")


if __name__ == "__main__":
    main()
