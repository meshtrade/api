import co.meshtrade.api.testing.ledger.token_tap.LedgerService;
import co.meshtrade.api.testing.ledger.token_tap.Service.MintTokenRequest;
import co.meshtrade.api.type.v1.Amount;
import co.meshtrade.api.type.v1.Token;
import co.meshtrade.api.type.v1.Ledger;

import java.math.BigDecimal;
import java.util.Optional;

public class MintTokenExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (LedgerService service = new LedgerService()) {
            // Create request with service-specific parameters
            MintTokenRequest request = MintTokenRequest.newBuilder()
                .setAmount(
                    Amount.newBuilder()
                        .setToken(
                            Token.newBuilder()
                                .setCode("mZAR")
                                .setIssuer("Emcuqgub4rddZMceYqg5tJHGbtn9AhjdYnmvK9qrkR6b")
                                .setLedger(Ledger.LEDGER_SOLANA)
                                .build()
                        )
                        .setValue(
                            co.meshtrade.api.type.v1.Decimal.newBuilder()
                                .setValue(new BigDecimal("10").toPlainString())
                                .build()
                        )
                        .build()
                )
                .setAddress("2kUctW3vK9jBHVE2aUjMqqeZvCHqT5ggZBv5p3nggj1P")
                .build();

            // Call the MintToken method
            service.mintToken(request, Optional.empty());

            System.out.println("MintToken successful");
        } catch (Exception e) {
            System.err.println("MintToken failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}