import co.meshtrade.api.reporting.income_report.v1.IncomeReportService;
import co.meshtrade.api.reporting.income_report.v1.Service.GetIncomeReportRequest;
import co.meshtrade.api.reporting.income_report.v1.Service.GetIncomeReportResponse;

import java.util.Optional;

public class GetIncomeReportExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (IncomeReportService service = new IncomeReportService()) {
            // Create request with service-specific parameters
            GetIncomeReportRequest request = GetIncomeReportRequest.newBuilder()
                // FIXME: Populate service-specific request fields
                .build();

            // Call the GetIncomeReport method
            GetIncomeReportResponse response = service.getIncomeReport(request, Optional.empty());

            // FIXME: Add relevant response object usage
            System.out.println("GetIncomeReport successful: " + response);
        } catch (Exception e) {
            System.err.println("GetIncomeReport failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}