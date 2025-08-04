from meshtrade.trading.market_order.v1 import (
    GetMarketOrderRequest,
    MarketOrderService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = MarketOrderService()

    with service:
        # Create request with service-specific parameters
        request = GetMarketOrderRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetMarketOrder method
        market_order = service.get_market_order(request)

        # FIXME: Add relevant response object usage
        print("GetMarketOrder successful:", market_order)


if __name__ == "__main__":
    main()
