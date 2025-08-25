import co.meshtrade.api.reporting.income_report.v1.IncomeReportService;
import co.meshtrade.api.reporting.income_report.v1.Service.GetExcelIncomeReportRequest;
import co.meshtrade.api.reporting.income_report.v1.Service.GetExcelIncomeReportResponse;

import java.util.Optional;

public class GetExcelIncomeReportExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (IncomeReportService service = new IncomeReportService()) {
            // Create request with service-specific parameters
            GetExcelIncomeReportRequest request = GetExcelIncomeReportRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetExcelIncomeReport method
            GetExcelIncomeReportResponse response = service.getExcelIncomeReport(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetExcelIncomeReport successful: " + response);
        } catch (Exception e) {
            System.err.println("GetExcelIncomeReport failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}