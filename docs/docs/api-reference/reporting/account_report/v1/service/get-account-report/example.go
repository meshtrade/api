package main

import (
	"context"
	"fmt"
	"log"
	"time"

	accountreportv1 "github.com/meshtrade/api/go/reporting/account_report/v1"
	typev1 "github.com/meshtrade/api/go/type/v1"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func main() {
	// Create a new context, which is used to manage cancellation and deadlines
	// for API calls.
	ctx := context.Background()

	// Create a new AccountReportService client.
	// By default, the client will use the credentials from the MESH_API_CREDENTIALS
	// environment variable or other default discovery methods.
	// No specific configuration is required unless you need to customize client behavior.
	service, err := accountreportv1.NewAccountReportService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	// It's a good practice to close the service client when you're done with it
	// to release any underlying resources.
	defer func() {
		if err := service.Close(); err != nil {
			log.Printf("failed to close the client: %v", err)
		}
	}()

	// Define the start and end dates for the report.
	// In this example, we're requesting a report for the last 30 days.
	endDate := time.Now()
	startDate := endDate.AddDate(0, 0, -30)

	// Create a new GetAccountReportRequest.
	// This request object is used to specify the parameters for the report.
	request := &accountreportv1.GetAccountReportRequest{
		// Specify the account for which to generate the report.
		// Example: "12345"
		AccountNumber: "100005",

		// Specify the start and end dates for the report period.
		// The dates are specified using the google.protobuf.Timestamp format.
		PeriodStart: timestamppb.New(startDate),
		PeriodEnd:   timestamppb.New(endDate),

		// Specify the reporting currency token - all report values will be denominated in this currency.
		// This example uses mZAR (South African Rand) issued on the Stellar network.
		// Learn more: https://mzar.mesh.trade
		// Stellar Explorer: https://stellar.expert/explorer/public/asset/mZAR-GCBNWTCCMC32UHZ5OCC2PNMFDGXRVPA7MFFBFFTCVW77SX5PMRB7Q4BY
		ReportingAssetToken: &typev1.Token{
			Code:   "mZAR",
			Issuer: "GCBNWTCCMC32UHZ5OCC2PNMFDGXRVPA7MFFBFFTCVW77SX5PMRB7Q4BY",
			Ledger: typev1.Ledger_LEDGER_STELLAR,
		},
	}

	// Call the GetAccountReport method to generate the report.
	// This method sends the request to the Mesh API and returns the generated report.
	accountReport, err := service.GetAccountReport(ctx, request)
	if err != nil {
		log.Fatalf("GetAccountReport failed: %v", err)
	}

	// The response will contain the generated report data.
	// In this example, we're simply printing some of the report's metadata.
	// In a real-world application, you would likely process the entries of the report.
	fmt.Printf("Successfully generated report for account: %s\n", accountReport.GetAccountNumber())
	fmt.Printf("Report generated at: %s\n", accountReport.GetGenerationDate().AsTime().String())
	fmt.Printf("Number of income entries: %d\n", len(accountReport.GetIncomeEntries()))
	fmt.Printf("Number of fee entries: %d\n", len(accountReport.GetFeeEntries()))
	fmt.Printf("Number of trading statement entries: %d\n", len(accountReport.GetTradingStatementEntries()))

	// You can now iterate through the entries and process them.
	// For example, to print the details of the first income entry:
	if len(accountReport.GetIncomeEntries()) > 0 {
		firstIncome := accountReport.GetIncomeEntries()[0]
		fmt.Printf("First income entry: %+v\n", firstIncome)
	}
}
