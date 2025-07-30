from meshtrade.reporting.income_report.v1 import (
    GetExcelIncomeReportRequest,
    IncomeReportService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = IncomeReportService()

    with service:
        # Create request with service-specific parameters
        request = GetExcelIncomeReportRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetExcelIncomeReport method
        response = service.get_excel_income_report(request)

        # FIXME: Add relevant response object usage
        print("GetExcelIncomeReport successful:", response)


if __name__ == "__main__":
    main()
