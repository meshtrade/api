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

        # Call the MonitorTransactionState method
        response = service.monitor_transaction_state(request)

        # FIXME: Add relevant response object usage
        print("MonitorTransactionState successful:", response)


if __name__ == "__main__":
    main()
