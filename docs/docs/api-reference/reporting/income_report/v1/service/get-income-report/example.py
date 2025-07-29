from meshtrade.reporting.income_report.v1 import (
    IncomeReportService,
    GetIncomeReportRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = IncomeReportService()
    
    with service:
        # Create request with service-specific parameters
        request = GetIncomeReportRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the GetIncomeReport method  
        response = service.get_income_report(request)
        
        # FIXME: Add relevant response object usage
        print("GetIncomeReport successful:", response)


if __name__ == "__main__":
    main()