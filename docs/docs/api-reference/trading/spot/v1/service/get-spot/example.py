from meshtrade.trading.spot.v1 import (
    GetSpotRequest,
    SpotService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = SpotService()

    with service:
        # Create request with service-specific parameters
        request = GetSpotRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetSpot method
        spot = service.get_spot(request)

        # FIXME: Add relevant response object usage
        print("GetSpot successful:", spot)


if __name__ == "__main__":
    main()
