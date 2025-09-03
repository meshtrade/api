package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"os"
	"time"

	"google.golang.org/protobuf/types/known/timestamppb"

	accountreportv1 "github.com/meshtrade/api/go/reporting/account_report/v1"
)

// main is the entry point of the program.
// It demonstrates how to use the AccountReportService to retrieve an account report in Excel format.
func main() {
	// Create a new AccountReportService client.
	// In a real-world application, you would typically configure this with proper authentication and connection details.
	// For this example, we assume the service is available at "localhost:8080" and we are using an insecure connection.
	service, err := accountreportv1.NewAccountReportService()
	if err != nil {
		log.Fatalf("Failed to create AccountReportService client: %v", err)
	}
	defer func() {
		if err := service.Close(); err != nil {
			log.Printf("Failed to close service connection: %v", err)
		}
	}()

	// Create a request to get an Excel account report.
	// The request includes the account number and the desired date range for the report.
	req := &accountreportv1.GetExcelAccountReportRequest{
		AccountNum: "100005",
		From:       timestamppb.New(time.Date(2023, 1, 1, 0, 0, 0, 0, time.UTC)),
		To:         timestamppb.New(time.Date(2023, 12, 31, 0, 0, 0, 0, time.UTC)),
	}

	// Call the GetExcelAccountReport method to retrieve the report.
	// The context.Background() is used as a default context.
	response, err := service.GetExcelAccountReport(context.Background(), req)
	if err != nil {
		log.Fatalf("Failed to get Excel account report: %v", err)
	}

	// The response contains the Excel file content as a base64-encoded string.
	// We need to decode it before we can save it as a file.
	excelData, err := base64.StdEncoding.DecodeString(response.ExcelBase64)
	if err != nil {
		log.Fatalf("Failed to decode base64 response: %v", err)
	}

	// Define the name for the output Excel file.
	fileName := "account_report.xlsx"

	// Save the decoded Excel data to a file.
	// We use os.WriteFile which is the recommended way to write files in Go 1.16+
	// 0644 is the standard file permission for a file that is readable by everyone and writable by the owner.
	if err := os.WriteFile(fileName, excelData, 0644); err != nil {
		log.Fatalf("Failed to write Excel file: %v", err)
	}

	fmt.Printf("Successfully saved Excel report to %s\n", fileName)
}
