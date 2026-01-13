import co.meshtrade.api.testing.ledger.tap.v1.TokenTapService;
import co.meshtrade.api.testing.ledger.tap.v1.Service.MintTokenRequest;
import co.meshtrade.api.testing.ledger.tap.v1.Service.MintTokenResponse;
import co.meshtrade.api.testing.ledger.tap.v1.Option.MintTokenOptions;
import co.meshtrade.api.testing.ledger.tap.v1.Option.StellarMintOptions;
import co.meshtrade.api.testing.ledger.tap.v1.Option.StellarMintOption;
import co.meshtrade.api.testing.ledger.tap.v1.Option.StellarMintTokenWithMemo;
import co.meshtrade.api.type.v1.Amount;
import co.meshtrade.api.type.v1.Decimal;
import co.meshtrade.api.type.v1.Token;
import co.meshtrade.api.type.v1.Ledger;

import java.util.Optional;

public class MintTokenExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (TokenTapService service = new TokenTapService()) {
            // Create a test token (USDC on Stellar)
            Token testToken = Token.newBuilder()
                .setCode("USDC")
                .setIssuer("GBUQWP3BOUZX34ULNQG23RQ6F4BWFIDBIS7XYPV5NPROCEWV2E2YXNU")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();

            // Create Stellar memo option
            StellarMintTokenWithMemo memo = StellarMintTokenWithMemo.newBuilder()
                .setMemo("test-mint-001")
                .build();

            StellarMintOption stellarOption = StellarMintOption.newBuilder()
                .setStellarMintTokenWithMemo(memo)
                .build();

            StellarMintOptions stellarOptions = StellarMintOptions.newBuilder()
                .addStellarMintOptions(stellarOption)
                .build();

            MintTokenOptions options = MintTokenOptions.newBuilder()
                .setStellarMintOptions(stellarOptions)
                .build();

            // Mint tokens to a test address with optional network-specific options
            MintTokenRequest request = MintTokenRequest.newBuilder()
                // Specify the amount to mint (required)
                .setAmount(
                    Amount.newBuilder()
                        .setToken(testToken)
                        .setValue(
                            Decimal.newBuilder()
                                .setValue("1000000")
                                .build()
                        )
                        .build()
                )
                // Specify the recipient address (required)
                .setAddress("GDQXVHH7QVVQSHCXU7ZDM4C2DAQF7UEQWPX3JHG7LJ2YS6FLXJY5E2SZ")
                // Set optional Stellar options
                .setOptions(options)
                .build();

            // Call the MintToken method
            MintTokenResponse response = service.mintToken(request, Optional.empty());

            // Token has been minted successfully
            System.out.println("Token minted successfully: " + response);
        } catch (Exception e) {
            System.err.println("MintToken failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}