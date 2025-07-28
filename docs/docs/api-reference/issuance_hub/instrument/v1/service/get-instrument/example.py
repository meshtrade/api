from meshtrade.issuance_hub.instrument.v1 import (
    GetInstrumentRequest,
    InstrumentService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = InstrumentService()

    with service:
        # Create request with service-specific parameters
        request = GetInstrumentRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetInstrument method
        instrument = service.get_instrument(request)

        # FIXME: Add relevant response object usage
        print("GetInstrument successful:", instrument)


if __name__ == "__main__":
    main()
