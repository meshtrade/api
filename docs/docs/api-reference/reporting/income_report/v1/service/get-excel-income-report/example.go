package main

import (
	"context"
	"encoding/base64"
	"log"
	"os"
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
	request := &income_reportv1.GetExcelIncomeReportRequest{
		// Replace with the target account number.
		AccountNum: "100001",
		From:       timestamppb.New(from),
		To:         timestamppb.New(to),
	}

	// Call the GetExcelIncomeReport method
	log.Printf("Requesting income report for account %s...", request.AccountNum)
	response, err := service.GetExcelIncomeReport(ctx, request)
	if err != nil {
		log.Fatalf("GetExcelIncomeReport failed: %v", err)
	}

	// The response contains the Excel file as a base64 encoded string.
	// We will decode it and save it to a file.
	excelData, err := base64.StdEncoding.DecodeString(response.GetExcelBase64())
	if err != nil {
		log.Fatalf("Failed to decode base64 response: %v", err)
	}

	outputFilename := "income_report.xlsx"
	if err := os.WriteFile(outputFilename, excelData, 0644); err != nil {
		log.Fatalf("Failed to write Excel file '%s': %v", outputFilename, err)
	}

	log.Printf("Successfully generated and saved income report to %s", outputFilename)
}
