from meshtrade.ledger.transaction.v1 import (
    GetTransactionStateRequest,
    TransactionService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = TransactionService()

    with service:
        # Create request with service-specific parameters
        request = GetTransactionStateRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetTransactionState method
        response = service.get_transaction_state(request)

        # FIXME: Add relevant response object usage
        print("GetTransactionState successful:", response)


if __name__ == "__main__":
    main()
