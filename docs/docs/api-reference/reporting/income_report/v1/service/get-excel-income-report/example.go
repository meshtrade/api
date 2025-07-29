package main

import (
	"context"
	"log"

	income_reportv1 "github.com/meshtrade/api/go/reporting/income_report/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := income_reportv1.NewIncomeReportService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &income_reportv1.GetExcelIncomeReportRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the GetExcelIncomeReport method
	response, err := service.GetExcelIncomeReport(ctx, request)
	if err != nil {
		log.Fatalf("GetExcelIncomeReport failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("GetExcelIncomeReport successful: %+v", response)
}
