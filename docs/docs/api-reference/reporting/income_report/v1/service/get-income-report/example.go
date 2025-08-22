package main

import (
	"context"
	"log"
	"time"

	income_reportv1 "github.com/meshtrade/api/go/reporting/income_report/v1"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	// NOTE: The NewIncomeReportService function is a placeholder for your actual
	// gRPC client initialization.
	service, err := income_reportv1.NewIncomeReportService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Define the reporting period, for example, the last 90 days.
	to := time.Now()
	from := to.AddDate(0, -3, 0)

	// Create request with service-specific parameters
	request := &income_reportv1.GetIncomeReportRequest{
		// Replace with the target account number.
		AccountNum: "100001",
		From:       timestamppb.New(from),
		To:         timestamppb.New(to),
	}

	// Call the GetIncomeReport method
	log.Printf("Requesting income report for account %s...", request.AccountNum)
	response, err := service.GetIncomeReport(ctx, request)
	if err != nil {
		log.Fatalf("GetIncomeReport failed: %v", err)
	}

	// Process the response object by printing a summary and some entry details.
	log.Printf("Successfully retrieved income report for client: %s", response.GetClientName())
	log.Printf("Account Number: %s", response.GetAccountNumber())
	log.Printf("Reporting Period: %s to %s", response.GetPeriod().GetFrom().AsTime().Format("2006-01-02"), response.GetPeriod().GetTo().AsTime().Format("2006-01-02"))
	log.Printf("Found %d income entries.", len(response.GetEntries()))

	// Print details for the first few entries as an example.
	for i, entry := range response.GetEntries() {
		if i >= 3 { // Limit to the first 3 entries for a concise example
			break
		}
		log.Printf(
			"  - Entry %d: Date=%s, Asset=%s, Description=%s, Amount=%s %s",
			i+1,
			entry.GetDate().AsTime().Format("2006-01-02"),
			entry.GetAssetName(),
			entry.GetDescription(),
			entry.GetAmount().GetValue().GetValue(),
			entry.GetAmount().GetToken().GetCode(),
		)
	}
}
