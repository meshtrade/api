from meshtrade.wallet.transfer.v1 import (
    MonitorTransferRequest,
    TransferService,
    TransferState,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = TransferService()

    with service:
        # Monitor a specific transfer for real-time state updates
        request = MonitorTransferRequest(
            name="wallet/transfers/01HQ3K5M8XYZ2NFVJT9BKR7P4C",  # Transfer resource name
        )

        # Call the MonitorTransfer streaming method
        stream = service.monitor_transfer(request)

        try:
            # Consume stream responses as the transfer state changes
            for transfer in stream:
                # React to state changes
                print(f"Transfer {transfer.number} state: {transfer.state}")

                if transfer.state == TransferState.TRANSFER_STATE_SUCCESSFUL:
                    print("Transfer completed successfully")
                    print(f"  Fee: {transfer.fee.amount.value}")
                    break
                if transfer.state == TransferState.TRANSFER_STATE_FAILED:
                    print("Transfer failed")
                    break
        except Exception as e:
            print("Stream error:", e)
            raise


if __name__ == "__main__":
    main()
