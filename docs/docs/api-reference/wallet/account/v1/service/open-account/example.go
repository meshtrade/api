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
		log.Fatalf("Failed to create service: %v", err)
	}
	defer accountService.Close()
	transactionService, err := transaction_v1.NewTransactionService()
	if err != nil {
		log.Fatalf("Failed to create transaction service: %v", err)
	}
	defer accountService.Close()

	// Call the OpenAccount method
	response, err := accountService.OpenAccount(
		ctx,
		&account_v1.OpenAccountRequest{
			// Resource name of account to open
			Name: "accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C",
		},
	)
	if err != nil {
		log.Fatalf("OpenAccount failed: %v", err)
	}
	log.Printf(
		"OpenAccount completed successfully with ledger transaction %s submitted",
		response.GetLedgerTransaction(),
	)

	// get a stream to monitor the state of the account opening transaction
	stream, err := transactionService.MonitorTransactionState(
		ctx,
		&transaction_v1.MonitorTransactionStateRequest{
			Name: response.GetLedgerTransaction(),
		},
	)
	if err != nil {
		log.Fatalf("MonitorTransactionState failed: %v", err)
	}
	log.Printf("Stream opened to monitor AddSignatoryToAccount transaction state")

	// read from the stream until completion
monitorTransction:
	for {
		response, err := stream.Recv()
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
		log.Printf("Received: %+v", response.GetState())

		// Check for transaction end state
		switch response.GetState() {
		case transaction_v1.TransactionState_TRANSACTION_STATE_SIGNING_IN_PROGRESS,
			transaction_v1.TransactionState_TRANSACTION_STATE_SUBMISSION_IN_PROGRESS,
			transaction_v1.TransactionState_TRANSACTION_STATE_INDETERMINATE:
			log.Printf("OpenAccount transaction in state %s, keep waiting...", response.GetState())

		case transaction_v1.TransactionState_TRANSACTION_STATE_SUCCESSFUL:
			log.Printf("OpenAccount transaction successful")
			break monitorTransction

		case transaction_v1.TransactionState_TRANSACTION_STATE_FAILED:
			log.Printf("OpenAccount transaction failed")
			break monitorTransction

		default:
			log.Fatalf("Received unexpected transaction state: %v", response.GetState())
		}
	}
}
