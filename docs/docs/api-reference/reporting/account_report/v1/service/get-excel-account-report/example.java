import co.meshtrade.api.reporting.account_report.v1.AccountReportService;
import co.meshtrade.api.reporting.account_report.v1.Service.GetExcelAccountReportRequest;
import co.meshtrade.api.reporting.account_report.v1.Service.GetExcelAccountReportResponse;

import java.util.Optional;

public class GetExcelAccountReportExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountReportService service = new AccountReportService()) {
            // Create request with service-specific parameters
            GetExcelAccountReportRequest request = GetExcelAccountReportRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetExcelAccountReport method
            GetExcelAccountReportResponse response = service.getExcelAccountReport(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetExcelAccountReport successful: " + response);
        } catch (Exception e) {
            System.err.println("GetExcelAccountReport failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}