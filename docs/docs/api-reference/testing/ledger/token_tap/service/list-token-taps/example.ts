import { ListTokenTapsRequest } from "@meshtrade/api/testing/ledger/token_tap/v1";
import { TokenTapService } from "@meshtrade/api/testing/ledger/token_tap/v1";

async function main() {
    // Default configuration is used and credentials come from MESH_API_CREDENTIALS
    // environment variable or default discovery methods. Zero config required
    // unless you want custom configuration.
    const service = new TokenTapService();

    // Create request with service-specific parameters
    const request = new ListTokenTapsRequest();

    // Call the ListTokenTaps method
    const response = await service.listTokenTaps(request);

    // Process the response tokens
    for (const token of response.getTokenList()) {
        console.log(
            `Token - Code: ${token.getCode()}, Issuer: ${token.getIssuer()}, Ledger: ${token.getLedger()}`
        );
    }
}

main().catch((error) => {
    console.error("ListTokenTaps failed:", error);
    process.exit(1);
});
