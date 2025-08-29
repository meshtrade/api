import co.meshtrade.api.reporting.income_report.v1.IncomeReportService;
import co.meshtrade.api.reporting.income_report.v1.Service.GetExcelIncomeReportRequest;
import co.meshtrade.api.reporting.income_report.v1.Service.GetExcelIncomeReportResponse;

import com.google.protobuf.Timestamp;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Base64;
import java.util.Optional;

public class GetExcelIncomeReportExample {
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
            GetExcelIncomeReportRequest request = GetExcelIncomeReportRequest.newBuilder()
                // Replace with the target account number.
                .setAccountNum("100001")
                .setFrom(fromTimestamp)
                .setTo(toTimestamp)
                .build();

            // Call the GetExcelIncomeReport method
            System.out.println("Requesting income report for account " + request.getAccountNum() + "...");
            GetExcelIncomeReportResponse response = service.getExcelIncomeReport(request, Optional.empty());

            // The response contains the Excel file as a base64 encoded string.
            // We will decode it and save it to a file.
            byte[] excelData = Base64.getDecoder().decode(response.getExcelBase64());

            String outputFilename = "income_report.xlsx";
            try (FileOutputStream fos = new FileOutputStream(outputFilename)) {
                fos.write(excelData);
            }

            System.out.println("Successfully generated and saved income report to " + outputFilename);
        } catch (Exception e) {
            System.err.println("GetExcelIncomeReport failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}