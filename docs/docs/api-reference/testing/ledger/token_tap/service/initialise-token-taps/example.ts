import { InitialiseTokenTapsRequest } from "@meshtrade/api/testing/ledger/token_tap/v1";
import { TokenTapService } from "@meshtrade/api/testing/ledger/token_tap/v1";

async function main() {
    // Default configuration is used and credentials come from MESH_API_CREDENTIALS
    // environment variable or default discovery methods. Zero config required
    // unless you want custom configuration.
    const service = new TokenTapService();

    // Create request with service-specific parameters
    const request = new InitialiseTokenTapsRequest();
    request.setNumber("1");

    // Call the InitialiseTokenTaps method
    const response = await service.initialiseTokenTaps(request);

    console.log("InitialiseTokenTaps successful");
}

main().catch((error) => {
    console.error("InitialiseTokenTaps failed:", error);
    process.exit(1);
});
