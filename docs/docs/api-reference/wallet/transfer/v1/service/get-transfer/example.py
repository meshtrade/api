from meshtrade.wallet.transfer.v1 import (
    GetTransferRequest,
    TransferService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = TransferService()

    with service:
        # Create request with the transfer resource name
        request = GetTransferRequest(
            name="wallet/transfers/01HQ3K5M8XYZ2NFVJT9BKR7P4C",  # Transfer resource name
        )

        # Call the GetTransfer method
        transfer = service.get_transfer(request)

        # Display transfer details
        print("Transfer retrieved successfully:")
        print(f"  Name: {transfer.name}")
        print(f"  Number: {transfer.number}")
        print(f"  From: {transfer.from_}")
        print(f"  To: {transfer.to}")
        print(f"  Amount: {transfer.amount.value} {transfer.amount.token.code}")
        print(f"  State: {transfer.state}")
        print(f"  Transaction: {transfer.transaction}")


if __name__ == "__main__":
    main()
