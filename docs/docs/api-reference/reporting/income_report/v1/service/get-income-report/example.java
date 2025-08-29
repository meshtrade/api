import co.meshtrade.api.reporting.income_report.v1.IncomeReportService;
import co.meshtrade.api.reporting.income_report.v1.Service.GetIncomeReportRequest;
import co.meshtrade.api.reporting.income_report.v1.IncomeReportOuterClass.IncomeReport;
import co.meshtrade.api.reporting.income_report.v1.EntryOuterClass.Entry;

import com.google.protobuf.Timestamp;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

public class GetIncomeReportExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (IncomeReportService service = new IncomeReportService()) {
            // Define the reporting period, for example, the last 90 days.
            Instant toInstant = Instant.now();
            Instant fromInstant = toInstant.minusSeconds(90 * 24 * 60 * 60); // 90 days ago

            // Convert to protobuf timestamps
            Timestamp fromTimestamp = Timestamp.newBuilder()
                .setSeconds(fromInstant.getEpochSecond())
                .setNanos(fromInstant.getNano())
                .build();

            Timestamp toTimestamp = Timestamp.newBuilder()
                .setSeconds(toInstant.getEpochSecond())
                .setNanos(toInstant.getNano())
                .build();

            // Create request with service-specific parameters
            GetIncomeReportRequest request = GetIncomeReportRequest.newBuilder()
                // Replace with the target account number.
                .setAccountNum("100001")
                .setFrom(fromTimestamp)
                .setTo(toTimestamp)
                .build();

            // Call the GetIncomeReport method
            System.out.println("Requesting income report for account " + request.getAccountNum() + "...");
            IncomeReport incomeReport = service.getIncomeReport(request, Optional.empty());

            // Process the response object by printing a summary and some entry details.
            System.out.println("Successfully retrieved income report for client: " + incomeReport.getClientName());
            System.out.println("Account Number: " + incomeReport.getAccountNumber());
            
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            System.out.println("Reporting Period: " + 
                Instant.ofEpochSecond(incomeReport.getPeriod().getFrom().getSeconds()).atZone(ZoneId.systemDefault()).format(formatter) + 
                " to " + 
                Instant.ofEpochSecond(incomeReport.getPeriod().getTo().getSeconds()).atZone(ZoneId.systemDefault()).format(formatter));
            System.out.println("Found " + incomeReport.getEntriesCount() + " income entries.");

            // Print details for the first few entries as an example.
            int maxEntries = Math.min(3, incomeReport.getEntriesCount()); // Limit to the first 3 entries for a concise example
            for (int i = 0; i < maxEntries; i++) {
                Entry entry = incomeReport.getEntries(i);
                System.out.println("  - Entry " + (i + 1) + ": Date=" + 
                    Instant.ofEpochSecond(entry.getDate().getSeconds()).atZone(ZoneId.systemDefault()).format(formatter) + 
                    ", Asset=" + entry.getAssetName() + 
                    ", Description=" + entry.getDescription() + 
                    ", Amount=" + entry.getAmount().getValue().getValue() + " " + entry.getAmount().getToken().getCode());
            }
        } catch (Exception e) {
            System.err.println("GetIncomeReport failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}