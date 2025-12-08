from meshtrade.market_data.price.v1 import (
    GetCurrentPriceByTokenPairRequest,
    PriceService,
)
from meshtrade.type.v1 import Token


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = PriceService()

    with service:
        # Create request to get gold (XAU) price in ZAR
        request = GetCurrentPriceByTokenPairRequest(
            base_token=Token(code="XAU"),  # Gold - the token to price
            quote_token=Token(code="ZAR"),  # South African Rand - the currency to price it in
        )

        # Call the GetCurrentPriceByTokenPair method
        price = service.get_current_price_by_token_pair(request)

        # Display the price information
        print("Price retrieved successfully:")
        print(f"  Base Token: {price.base_token.code}")
        print(f"  Quote Token: {price.quote_token.code}")
        print(f"  Mid Price: {price.mid_price.value}")
        print(f"  Timestamp: {price.time.ToDatetime()}")


if __name__ == "__main__":
    main()
