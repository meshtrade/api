package main

import (
	"context"
	"log"

	account_reportv1 "github.com/meshtrade/api/go/reporting/account_report/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := account_reportv1.NewAccountReportService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &account_reportv1.GetAccountReportRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the GetAccountReport method
	accountReport, err := service.GetAccountReport(ctx, request)
	if err != nil {
		log.Fatalf("GetAccountReport failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("GetAccountReport successful: %+v", accountReport)
}
