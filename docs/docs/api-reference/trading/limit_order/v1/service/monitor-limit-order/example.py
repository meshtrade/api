from meshtrade.trading.limit_order.v1 import (
    LimitOrderService,
    MonitorLimitOrderRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = LimitOrderService()

    with service:
        # Create request with service-specific parameters
        request = MonitorLimitOrderRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the MonitorLimitOrder streaming method
        stream = service.monitor_limit_order(request)

        try:
            # Consume stream responses using iterator pattern
            for limit_order in stream:
                # Process each response as it arrives
                print("Received:", limit_order)

            print("Stream completed successfully")
        except Exception as e:
            print("Stream error:", e)
            raise


if __name__ == "__main__":
    main()
