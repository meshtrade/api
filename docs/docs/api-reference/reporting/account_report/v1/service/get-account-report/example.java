import co.meshtrade.api.reporting.account_report.v1.AccountReportService;
import co.meshtrade.api.reporting.account_report.v1.Service.GetAccountReportRequest;
import co.meshtrade.api.reporting.account_report.v1.AccountReport.AccountReport;

import java.util.Optional;

public class GetAccountReportExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountReportService service = new AccountReportService()) {
            // Create request with service-specific parameters
            GetAccountReportRequest request = GetAccountReportRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetAccountReport method
            AccountReport accountReport = service.getAccountReport(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetAccountReport successful: " + accountReport);
        } catch (Exception e) {
            System.err.println("GetAccountReport failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}