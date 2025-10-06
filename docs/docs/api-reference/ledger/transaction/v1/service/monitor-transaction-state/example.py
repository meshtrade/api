from meshtrade.ledger.transaction.v1 import (
    MonitorTransactionStateRequest,
    TransactionService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = TransactionService()

    with service:
        # Create request with service-specific parameters
        request = MonitorTransactionStateRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the MonitorTransactionState streaming method
        stream = service.monitor_transaction_state(request)

        try:
            # Consume stream responses using iterator pattern
            for response in stream:
                # Process each response as it arrives
                print("Received:", response)

            print("Stream completed successfully")
        except Exception as e:
            print("Stream error:", e)
            raise


if __name__ == "__main__":
    main()
