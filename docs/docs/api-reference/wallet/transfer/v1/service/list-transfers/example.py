from meshtrade.type.v1 import SortingOrder
from meshtrade.wallet.transfer.v1 import (
    ListTransfersRequest,
    TransferService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = TransferService()

    with service:
        # Create request with optional sorting
        request = ListTransfersRequest(
            sorting=ListTransfersRequest.Sorting(
                field="number",  # Sort by transfer number
                order=SortingOrder.SORTING_ORDER_ASC,  # Ascending order
            )
        )

        # Call the ListTransfers method
        response = service.list_transfers(request)

        # Display all transfers in the hierarchy
        print(f"Found {len(response.transfers)} transfers:")
        for transfer in response.transfers:
            print(f"  Transfer {transfer.number}:")
            print(f"    Name: {transfer.name}")
            print(f"    From: {transfer.from_}")
            print(f"    To: {transfer.to}")
            print(f"    Amount: {transfer.amount.value} {transfer.amount.token.code}")
            print(f"    State: {transfer.state}")


if __name__ == "__main__":
    main()
