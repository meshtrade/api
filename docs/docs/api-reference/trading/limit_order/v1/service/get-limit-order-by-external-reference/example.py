from meshtrade.trading.limit_order.v1 import (
    GetLimitOrderByExternalReferenceRequest,
    LimitOrderService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LimitOrderService()

    with service:
        # Get a limit order by its external reference identifier
        # This is useful when you track orders in your own system using custom IDs
        external_ref = "my-trading-system-order-123"

        request = GetLimitOrderByExternalReferenceRequest(
            external_reference=external_ref,
        )

        # Call the GetLimitOrderByExternalReference method
        limit_order = service.get_limit_order_by_external_reference(request)

        # Response contains the limit order matching the external reference
        print("✓ Limit order found by external reference:")
        print(f"  External reference: {limit_order.external_reference}")
        print(f"  Resource name: {limit_order.name}")
        print(f"  Account: {limit_order.account}")
        print(f"  Side: {limit_order.side}")
        print(f"  Limit price: {limit_order.limit_price.value.value} {limit_order.limit_price.token.code}")
        print(f"  Quantity: {limit_order.quantity.value.value} {limit_order.quantity.token.code}")
        print("\nNote: External references must be unique within your group hierarchy")


if __name__ == "__main__":
    main()
