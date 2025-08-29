from meshtrade.reporting.account_report.v1 import (
    AccountReportService,
    GetExcelAccountReportRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = AccountReportService()
    
    with service:
        # Create request with service-specific parameters
        request = GetExcelAccountReportRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the GetExcelAccountReport method  
        response = service.get_excel_account_report(request)
        
        # FIXME: Add relevant response object usage
        print("GetExcelAccountReport successful:", response)


if __name__ == "__main__":
    main()