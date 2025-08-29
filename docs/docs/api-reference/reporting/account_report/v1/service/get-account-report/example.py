from meshtrade.reporting.account_report.v1 import (
    AccountReportService,
    GetAccountReportRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = AccountReportService()
    
    with service:
        # Create request with service-specific parameters
        request = GetAccountReportRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the GetAccountReport method  
        account_report = service.get_account_report(request)
        
        # FIXME: Add relevant response object usage
        print("GetAccountReport successful:", account_report)


if __name__ == "__main__":
    main()