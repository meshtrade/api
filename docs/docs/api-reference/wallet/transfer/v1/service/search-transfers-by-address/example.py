from meshtrade.wallet.transfer.v1 import (
    SearchTransfersByAddressRequest,
    TransferService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = TransferService()

    with service:
        # Search for all transfers involving a specific ledger address
        request = SearchTransfersByAddressRequest(
            address="GBZH4LMGAYUDNFPNFGOBKU76DDRJHIAKGKGO2LNZFLQB6DMKV7EYHT",  # Ledger address to search
        )

        # Call the SearchTransfersByAddress method
        response = service.search_transfers_by_address(request)

        # Display all transfers involving this address (as sender or receiver)
        print(f"Found {len(response.transfers)} transfers for address:")
        for transfer in response.transfers:
            print(f"  Transfer {transfer.number}:")
            print(f"    From: {transfer.from_}")
            print(f"    To: {transfer.to}")
            print(f"    Amount: {transfer.amount.value} {transfer.amount.token.code}")
            print(f"    State: {transfer.state}")


if __name__ == "__main__":
    main()
