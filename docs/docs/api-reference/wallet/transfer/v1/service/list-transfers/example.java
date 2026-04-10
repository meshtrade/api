import co.meshtrade.api.type.v1.Sorting.SortingOrder;
import co.meshtrade.api.wallet.transfer.v1.TransferService;
import co.meshtrade.api.wallet.transfer.v1.Service.ListTransfersRequest;
import co.meshtrade.api.wallet.transfer.v1.Service.ListTransfersResponse;
import co.meshtrade.api.wallet.transfer.v1.Transfer.Transfer;

import java.util.Optional;

public class ListTransfersExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (TransferService service = new TransferService()) {
            // Create request with optional sorting
            ListTransfersRequest request = ListTransfersRequest.newBuilder()
                .setSorting(ListTransfersRequest.Sorting.newBuilder()
                    .setField("number")  // Sort by transfer number
                    .setOrder(SortingOrder.SORTING_ORDER_ASC)  // Ascending order
                    .build())
                .build();

            // Call the ListTransfers method
            ListTransfersResponse response = service.listTransfers(request, Optional.empty());

            // Display all transfers in the hierarchy
            System.out.println("Found " + response.getTransfersList().size() + " transfers:");
            for (Transfer transfer : response.getTransfersList()) {
                System.out.println("  Transfer " + transfer.getNumber() + ":");
                System.out.println("    Name: " + transfer.getName());
                System.out.println("    From: " + transfer.getFrom());
                System.out.println("    To: " + transfer.getTo());
                System.out.println("    Amount: " + transfer.getAmount().getValue()
                    + " " + transfer.getAmount().getToken().getCode());
                System.out.println("    State: " + transfer.getState());
            }
        } catch (Exception e) {
            System.err.println("ListTransfers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}