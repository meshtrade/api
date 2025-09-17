import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.GetAccountByNumberRequest;
import co.meshtrade.api.wallet.account.v1.Account.Account;

import java.util.Optional;

public class GetAccountByNumberExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Look up account using its 7-digit Account Number
            GetAccountByNumberRequest request = GetAccountByNumberRequest.newBuilder()
                .setAccountNumber("1234567")  // 7-digit account number
                .setPopulateLedgerData(true)   // Fetch live blockchain data
                .build();

            // Call the GetAccountByNumber method
            Account account = service.getAccountByNumber(request, Optional.empty());

            // Display account information retrieved by number
            System.out.println("Account found by number " + request.getAccountNumber() + ":");
            System.out.println("  Name: " + account.getName());
            System.out.println("  Display Name: " + account.getDisplayName());
            System.out.println("  Ledger: " + account.getLedger());
            System.out.println("  State: " + account.getState());

            // Display balances if live data was populated
            if (request.getPopulateLedgerData() && !account.getBalancesList().isEmpty()) {
                System.out.println("  Balances:");
                account.getBalancesList().forEach(balance -> 
                    System.out.println("    " + balance.getInstrumentMetadata().getName() + 
                                     ": " + balance.getAmount().getValue())
                );
            }
        } catch (Exception e) {
            System.err.println("GetAccountByNumber failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}