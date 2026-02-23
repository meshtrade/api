package main

import (
	"context"
	"io"
	"log"

	transaction_v1 "github.com/meshtrade/api/go/ledger/transaction/v1"
	account_v1 "github.com/meshtrade/api/go/wallet/account/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	accountService, err := account_v1.NewAccountService()
	if err != nil {
		log.Fatalf("Failed to create account service: %v", err)
	}
	defer accountService.Close()
	transactionService, err := transaction_v1.NewTransactionService()
	if err != nil {
		log.Fatalf("Failed to create transaction service: %v", err)
	}
	defer transactionService.Close()

	// Call the AddSignatoriesToAccount method
	// You can add 1-100 signatories in a single request
	response, err := accountService.AddSignatoriesToAccount(
		ctx,
		&account_v1.AddSignatoriesToAccountRequest{
			// Resource name of account to add identified (api)users as signatories to
			Name: "accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C",
			// Resource names of (api)Users to add as signatories (supports 1-100 users)
			Users: []string{
				"users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6",
				"iam/api_users/01HN2ZXQJ8K9M0L1N3P2Q4R5T7",
				"users/01HN2ZXQJ8K9M0L1N3P2Q4R5T8",
			},
		},
	)
	if err != nil {
		log.Fatalf("AddSignatoriesToAccount failed: %v", err)
	}
	log.Printf(
		"AddSignatoriesToAccount completed successfully with ledger transaction %s submitted",
		response.GetLedgerTransaction(),
	)

	// get a stream to monitor the state of the AddSignatoriesToAccount transaction
	stream, err := transactionService.MonitorTransactionState(
		ctx,
		&transaction_v1.MonitorTransactionStateRequest{
			Name: response.GetLedgerTransaction(),
		},
	)
	if err != nil {
		log.Fatalf("MonitorTransactionState failed: %v", err)
	}
	log.Printf("Stream opened to monitor AddSignatoriesToAccount transaction state")

	// read from the stream until completion
monitorTransaction:
	for {
		transactionResponse, err := stream.Recv()
		if err == io.EOF {
			break // Stream completed normally
		}
		if err != nil {
			// Other errors:
			// - timeout of ctx passed to MonitorTransactionState
			// - arbitrary network errors
			// - other arbitrary errors
			log.Fatalf("MonitorTransactionState failed: %v", err)
		}

		// Process each response as it arrives
		log.Printf("Received: %+v", transactionResponse.GetState())

		// Check for transaction end state
		switch transactionResponse.GetState() {
		case transaction_v1.TransactionState_TRANSACTION_STATE_SIGNING_IN_PROGRESS,
			transaction_v1.TransactionState_TRANSACTION_STATE_SUBMISSION_IN_PROGRESS,
			transaction_v1.TransactionState_TRANSACTION_STATE_INDETERMINATE:
			log.Printf("AddSignatoriesToAccount transaction in state %s, keep waiting...", transactionResponse.GetState())

		case transaction_v1.TransactionState_TRANSACTION_STATE_SUCCESSFUL:
			log.Printf("AddSignatoriesToAccount transaction successful - signatories added to account")
			break monitorTransaction

		case transaction_v1.TransactionState_TRANSACTION_STATE_FAILED:
			log.Printf("AddSignatoriesToAccount transaction failed")
			break monitorTransaction

		default:
			log.Fatalf("Received unexpected transaction state: %v", transactionResponse.GetState())
		}
	}
}
