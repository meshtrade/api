import co.meshtrade.api.reporting.account_report.v1.AccountReportOuterClass.AccountReport;
import co.meshtrade.api.reporting.account_report.v1.AccountReportService;
import co.meshtrade.api.reporting.account_report.v1.Service.GetAccountReportRequest;
import co.meshtrade.api.type.v1.Token.Token;
import co.meshtrade.api.type.v1.Ledger.Ledger;
import com.google.protobuf.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

public class GetAccountReportExample {
  public static void main(String[] args) {
    // Create a new AccountReportService client.
    // By default, the client will use the credentials from the MESH_API_CREDENTIALS
    // environment variable or other default discovery methods.
    // No specific configuration is required unless you need to customize client behavior.
    try (AccountReportService service = new AccountReportService()) {
      // Define the start and end dates for the report.
      // In this example, we're requesting a report for the last 30 days.
      Instant endDate = Instant.now();
      Instant startDate = endDate.minus(30, ChronoUnit.DAYS);

      // Create Timestamps for the request.
      Timestamp fromTimestamp = Timestamp.newBuilder().setSeconds(startDate.getEpochSecond()).build();
      Timestamp toTimestamp = Timestamp.newBuilder().setSeconds(endDate.getEpochSecond()).build();

      // Create a new GetAccountReportRequest.
      // This request object is used to specify the parameters for the report.
      GetAccountReportRequest request =
          GetAccountReportRequest.newBuilder()
              // Specify the account for which to generate the report.
              // Example: "12345"
              .setAccountNumber("100005")
              // Specify the start and end dates for the report period.
              // The dates are specified using the com.google.protobuf.Timestamp format.
              .setFrom(fromTimestamp)
              .setTo(toTimestamp)
              // Specify the reporting currency token - all report values will be denominated in this currency.
              // This example uses mZAR (South African Rand) issued on the Stellar network.
              // Learn more: https://mzar.mesh.trade
              // Stellar Explorer: https://stellar.expert/explorer/public/asset/mZAR-GCBNWTCCMC32UHZ5OCC2PNMFDGXRVPA7MFFBFFTCVW77SX5PMRB7Q4BY
              .setReportingAssetToken(
                  Token.newBuilder()
                      .setCode("mZAR")
                      .setIssuer("GCBNWTCCMC32UHZ5OCC2PNMFDGXRVPA7MFFBFFTCVW77SX5PMRB7Q4BY")
                      .setLedger(Ledger.LEDGER_STELLAR)
                      .build())
              .build();

      // Call the GetAccountReport method to generate the report.
      // This method sends the request to the Mesh API and returns the generated report.
      AccountReport accountReport = service.getAccountReport(request, Optional.empty());

      // The response will contain the generated report data.
      // In this example, we're simply printing some of the report's metadata.
      // In a real-world application, you would likely process the entries of the report.
      System.out.println(
          "Successfully generated report for account: " + accountReport.getAccountNumber());
      System.out.println(
          "Report generated at: "
              + Instant.ofEpochSecond(accountReport.getGenerationDate().getSeconds()));
      System.out.println("Number of income entries: " + accountReport.getIncomeEntriesCount());
      System.out.println("Number of fee entries: " + accountReport.getFeeEntriesCount());
      System.out.println(
          "Number of trading statement entries: " + accountReport.getTradingStatementEntriesCount());

      // You can now iterate through the entries and process them.
      // For example, to print the details of the first income entry:
      if (accountReport.getIncomeEntriesCount() > 0) {
        System.out.println("First income entry: " + accountReport.getIncomeEntries(0));
      }

    } catch (Exception e) {
      System.err.println("GetAccountReport failed: " + e.getMessage());
      e.printStackTrace();
    }
  }
}
