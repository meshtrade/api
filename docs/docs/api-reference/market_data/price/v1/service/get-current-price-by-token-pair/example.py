from meshtrade.market_data.price.v1 import (
    GetCurrentPriceByTokenPairRequest,
    PriceService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = PriceService()

    with service:
        # Create request with service-specific parameters
        request = GetCurrentPriceByTokenPairRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetCurrentPriceByTokenPair method
        price = service.get_current_price_by_token_pair(request)

        # FIXME: Add relevant response object usage
        print("GetCurrentPriceByTokenPair successful:", price)


if __name__ == "__main__":
    main()
