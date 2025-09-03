import co.meshtrade.api.reporting.account_report.v1.AccountReportService;
import co.meshtrade.api.reporting.account_report.v1.Service.GetExcelAccountReportRequest;
import co.meshtrade.api.reporting.account_report.v1.Service.GetExcelAccountReportResponse;
import com.google.protobuf.Timestamp;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Optional;

// main is the entry point of the program.
// It demonstrates how to use the AccountReportService to retrieve an account report in Excel format.
public class GetExcelAccountReportExample {
  public static void main(String[] args) {
    // Create a new AccountReportService client.
    // In a real-world application, you would typically configure this with proper authentication and connection details.
    // For this example, we assume the service is available at "localhost:8080" and we are using an insecure connection.
    try (AccountReportService service = new AccountReportService()) {
      // Define the start and end dates for the report.
      Instant startDate = Instant.parse("2023-01-01T00:00:00Z");
      Instant endDate = Instant.parse("2023-12-31T00:00:00Z");

      // Create Timestamps for the request.
      Timestamp fromTimestamp = Timestamp.newBuilder().setSeconds(startDate.getEpochSecond()).build();
      Timestamp toTimestamp = Timestamp.newBuilder().setSeconds(endDate.getEpochSecond()).build();

      // Create a request to get an Excel account report.
      // The request includes the account number and the desired date range for the report.
      GetExcelAccountReportRequest request =
          GetExcelAccountReportRequest.newBuilder()
              .setAccountNum("100005")
              .setFrom(fromTimestamp)
              .setTo(toTimestamp)
              .build();

      // Call the GetExcelAccountReport method to retrieve the report.
      // The Optional.empty() is used as a default context.
      GetExcelAccountReportResponse response = service.getExcelAccountReport(request, Optional.empty());

      // The response contains the Excel file content as a base64-encoded string.
      // We need to decode it before we can save it as a file.
      byte[] excelData = Base64.getDecoder().decode(response.getExcelBase64());

      // Define the name for the output Excel file.
      String fileName = "account_report.xlsx";

      // Save the decoded Excel data to a file.
      // We use Files.write which is the recommended way to write files in Java.
      Files.write(Paths.get(fileName), excelData);

      System.out.printf("Successfully saved Excel report to %s\n", fileName);

    } catch (Exception e) {
      System.err.println("Failed to get Excel account report: " + e.getMessage());
      e.printStackTrace();
    }
  }
}
