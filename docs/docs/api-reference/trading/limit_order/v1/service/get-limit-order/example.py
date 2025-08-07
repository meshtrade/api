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
        # Create request with service-specific parameters
        request = GetLimitOrderRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetLimitOrder method
        order = service.get_limit_order(request)

        # FIXME: Add relevant response object usage
        print("GetLimitOrder successful:", order)


if __name__ == "__main__":
    main()
