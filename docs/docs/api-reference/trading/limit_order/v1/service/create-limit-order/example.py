from meshtrade.trading.limit_order.v1 import (
    CreateLimitOrderRequest,
    LimitOrder,
    LimitOrderService,
    LimitOrderSide,
    LimitOrderStatus,
    MonitorLimitOrderRequest,
)
from meshtrade.type.v1 import Amount, Decimal, Ledger, Token


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LimitOrderService()

    with service:
        # Create a buy limit order for 10 USDC at a limit price of 100.50 USDC
        # Note: You need a valid account resource name from the Wallet Account service
        request = CreateLimitOrderRequest(
            limit_order=LimitOrder(
                # Owner must be a valid group resource name
                owner="groups/01HQVBZ9F8X2T3K4M5N6P7Q8R9",
                # Account must be a valid Stellar account owned by your group
                account="accounts/01HQVBZ9F8X2T3K4M5N6P7Q8R9",
                # Optional: External reference for tracking in your system
                external_reference="my-trading-system-order-123",
                # Buy side - use LIMIT_ORDER_SIDE_SELL for selling
                side=LimitOrderSide.LIMIT_ORDER_SIDE_BUY,
                # Limit price: maximum price you're willing to pay (100.50 USDC)
                limit_price=Amount(
                    value=Decimal(value="100.50"),
                    token=Token(
                        code="USDC",
                        issuer="GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
                        ledger=Ledger.LEDGER_STELLAR,
                    ),
                ),
                # Quantity: amount you want to buy (10 USDC)
                quantity=Amount(
                    value=Decimal(value="10"),
                    token=Token(
                        code="USDC",
                        issuer="GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
                        ledger=Ledger.LEDGER_STELLAR,
                    ),
                ),
            )
        )

        # Call the CreateLimitOrder method
        limit_order = service.create_limit_order(request)

        # Response contains the created order with system-generated resource name and number
        print("✓ Limit order created successfully!")
        print(f"  Resource name: {limit_order.name}")
        print(f"  Number: {limit_order.number}")
        print(f"  External reference: {limit_order.external_reference}")
        print(f"  Account: {limit_order.account}")
        print(f"  Side: {limit_order.side}")
        print(f"  Limit price: {limit_order.limit_price.value.value} {limit_order.limit_price.token.code}")
        print(f"  Quantity: {limit_order.quantity.value.value} {limit_order.quantity.token.code}")

        # Monitor the order until it opens on the ledger
        print("\n📡 Monitoring order until it opens on the ledger...")
        monitor_request = MonitorLimitOrderRequest(
            name=limit_order.name,
        )

        stream = service.monitor_limit_order(monitor_request)

        for update in stream:
            print(f"  Status: {update.status}")

            if update.status == LimitOrderStatus.LIMIT_ORDER_STATUS_SUBMISSION_IN_PROGRESS:
                print("  ⏳ Order submission in progress...")

            elif update.status == LimitOrderStatus.LIMIT_ORDER_STATUS_SUBMISSION_FAILED:
                print("  ❌ Order submission failed")
                raise RuntimeError("Order submission failed")

            elif update.status == LimitOrderStatus.LIMIT_ORDER_STATUS_OPEN:
                print("  ✓ Order is now open on the ledger and available for matching!")
                break


if __name__ == "__main__":
    main()
