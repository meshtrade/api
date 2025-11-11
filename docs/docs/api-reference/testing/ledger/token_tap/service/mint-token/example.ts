import { MintTokenRequest } from "@meshtrade/api/testing/ledger/token_tap/v1";
import { TokenTapService } from "@meshtrade/api/testing/ledger/token_tap/v1";
import { Amount, Token, Ledger } from "@meshtrade/api/type/v1";
import { Decimal } from "@meshtrade/api/type/v1";

async function main() {
    // Default configuration is used and credentials come from MESH_API_CREDENTIALS
    // environment variable or default discovery methods. Zero config required
    // unless you want custom configuration.
    const service = new TokenTapService();

    // Create request with service-specific parameters
    const request = new MintTokenRequest();
    request.setAmount(
        new Amount()
            .setToken(
                new Token()
                    .setCode("mZAR")
                    .setIssuer("Emcuqgub4rddZMceYqg5tJHGbtn9AhjdYnmvK9qrkR6b")
                    .setLedger(Ledger.LEDGER_SOLANA)
            )
            .setValue(new Decimal().setValue("10"))
    );
    request.setAddress("2kUctW3vK9jBHVE2aUjMqqeZvCHqT5ggZBv5p3nggj1P");

    // Call the MintToken method
    const response = await service.mintToken(request);

    console.log("MintToken successful");
}

main().catch((error) => {
    console.error("MintToken failed:", error);
    process.exit(1);
});
