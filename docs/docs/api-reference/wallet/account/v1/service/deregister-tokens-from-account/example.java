import co.meshtrade.api.type.v1.Type.Ledger;
import co.meshtrade.api.type.v1.Type.Token;
import co.meshtrade.api.wallet.account.v1.AccountService;
import co.meshtrade.api.wallet.account.v1.Service.DeregisterTokensFromAccountRequest;
import co.meshtrade.api.wallet.account.v1.Service.DeregisterTokensFromAccountResponse;

import java.util.Optional;

public class DeregisterTokensFromAccountExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (AccountService service = new AccountService()) {
            // Create request with tokens to deregister
            // IMPORTANT: Token balances must be zero before deregistration will succeed
            // You can deregister 1-10 tokens in a single request
            DeregisterTokensFromAccountRequest request = DeregisterTokensFromAccountRequest.newBuilder()
                // Resource name of account to deregister tokens from
                .setName("accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C")
                // Add tokens to deregister from the account
                .addTokens(Token.newBuilder()
                    .setCode("USDC")
                    .setIssuer("GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN")
                    .setLedger(Ledger.LEDGER_STELLAR)
                    .build())
                .addTokens(Token.newBuilder()
                    .setCode("EURC")
                    .setIssuer("GDHU6WRG4IEQXM5NZ4BMPKOXHW76MZM4Y2IEMFDVXBSDP6SJY4ITNPP2")
                    .setLedger(Ledger.LEDGER_STELLAR)
                    .build())
                .build();

            // Call the DeregisterTokensFromAccount method
            DeregisterTokensFromAccountResponse response = service.deregisterTokensFromAccount(request, Optional.empty());

            // The response contains a ledger transaction reference to monitor
            System.out.println("DeregisterTokensFromAccount submitted: " + response.getLedgerTransaction());
            System.out.println("Monitor the transaction state to confirm completion");
        } catch (Exception e) {
            System.err.println("DeregisterTokensFromAccount failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
