import co.meshtrade.api.compliance.client.v1.ClientService;
import co.meshtrade.api.compliance.client.v1.Service.MarkClientVerifiedRequest;
import co.meshtrade.api.compliance.client.v1.Client.Client;
import com.google.protobuf.Timestamp;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

public class MarkClientVerifiedExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (ClientService service = new ClientService()) {
            // Mark client as verified with next review date in one year
            Instant nextReview = Instant.now().plus(365, ChronoUnit.DAYS);
            Timestamp nextVerificationDate = Timestamp.newBuilder()
                .setSeconds(nextReview.getEpochSecond())
                .setNanos(nextReview.getNano())
                .build();

            MarkClientVerifiedRequest request = MarkClientVerifiedRequest.newBuilder()
                .setClient("compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR")
                .setNextVerificationDate(nextVerificationDate)
                .build();

            // Call the MarkClientVerified method
            Client client = service.markClientVerified(request, Optional.empty());

            System.out.println("Client verified, next review: " + client.getNextVerificationDate());
        } catch (Exception e) {
            System.err.println("MarkClientVerified failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
