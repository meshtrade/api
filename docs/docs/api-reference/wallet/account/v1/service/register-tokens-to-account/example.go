package main

import (
	"context"
	"io"
	"log"

	transaction_v1 "github.com/meshtrade/api/go/ledger/transaction/v1"
	type_v1 "github.com/meshtrade/api/go/type/v1"
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

	// Call the RegisterTokensToAccount method
	// You can register 1-10 tokens in a single request
	response, err := accountService.RegisterTokensToAccount(
		ctx,
		&account_v1.RegisterTokensToAccountRequest{
			// Resource name of account to register tokens on
			Name: "accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C",
			// Tokens to register on the account (supports 1-10 tokens)
			Tokens: []*type_v1.Token{
				{
					Code:   "USDC",
					Issuer: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
					Ledger: type_v1.Ledger_LEDGER_STELLAR,
				},
				{
					Code:   "EURC",
					Issuer: "GDHU6WRG4IEQXM5NZ4BMPKOXHW76MZM4Y2IEMFDVXBSDP6SJY4ITNPP2",
					Ledger: type_v1.Ledger_LEDGER_STELLAR,
				},
			},
		},
	)
	if err != nil {
		log.Fatalf("RegisterTokensToAccount failed: %v", err)
	}
	log.Printf(
		"RegisterTokensToAccount completed successfully with ledger transaction %s submitted",
		response.GetLedgerTransaction(),
	)

	// get a stream to monitor the state of the RegisterTokensToAccount transaction
	stream, err := transactionService.MonitorTransactionState(
		ctx,
		&transaction_v1.MonitorTransactionStateRequest{
			Name: response.GetLedgerTransaction(),
		},
	)
	if err != nil {
		log.Fatalf("MonitorTransactionState failed: %v", err)
	}
	log.Printf("Stream opened to monitor RegisterTokensToAccount transaction state")

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
			log.Printf("RegisterTokensToAccount transaction in state %s, keep waiting...", transactionResponse.GetState())

		case transaction_v1.TransactionState_TRANSACTION_STATE_SUCCESSFUL:
			log.Printf("RegisterTokensToAccount transaction successful - tokens registered on account")
			break monitorTransaction

		case transaction_v1.TransactionState_TRANSACTION_STATE_FAILED:
			log.Printf("RegisterTokensToAccount transaction failed")
			break monitorTransaction

		default:
			log.Fatalf("Received unexpected transaction state: %v", transactionResponse.GetState())
		}
	}
}
