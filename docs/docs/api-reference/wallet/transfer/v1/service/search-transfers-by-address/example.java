import co.meshtrade.api.wallet.transfer.v1.TransferService;
import co.meshtrade.api.wallet.transfer.v1.Service.SearchTransfersByAddressRequest;
import co.meshtrade.api.wallet.transfer.v1.Service.SearchTransfersByAddressResponse;
import co.meshtrade.api.wallet.transfer.v1.Transfer.Transfer;

import java.util.Optional;

public class SearchTransfersByAddressExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (TransferService service = new TransferService()) {
            // Search for all transfers involving a specific ledger address
            SearchTransfersByAddressRequest request = SearchTransfersByAddressRequest.newBuilder()
                .setAddress("GBZH4LMGAYUDNFPNFGOBKU76DDRJHIAKGKGO2LNZFLQB6DMKV7EYHT")  // Ledger address to search
                .build();

            // Call the SearchTransfersByAddress method
            SearchTransfersByAddressResponse response = service.searchTransfersByAddress(request, Optional.empty());

            // Display all transfers involving this address (as sender or receiver)
            System.out.println("Found " + response.getTransfersList().size() + " transfers for address:");
            for (Transfer transfer : response.getTransfersList()) {
                System.out.println("  Transfer " + transfer.getNumber() + ":");
                System.out.println("    From: " + transfer.getFrom());
                System.out.println("    To: " + transfer.getTo());
                System.out.println("    Amount: " + transfer.getAmount().getValue()
                    + " " + transfer.getAmount().getToken().getCode());
                System.out.println("    State: " + transfer.getState());
            }
        } catch (Exception e) {
            System.err.println("SearchTransfersByAddress failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}