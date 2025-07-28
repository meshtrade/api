from meshtrade.issuance_hub.instrument.v1 import (
    InstrumentService,
    MintInstrumentRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = InstrumentService()

    with service:
        # Create request with service-specific parameters
        request = MintInstrumentRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the MintInstrument method
        response = service.mint_instrument(request)

        # FIXME: Add relevant response object usage
        print("MintInstrument successful:", response)


if __name__ == "__main__":
    main()
