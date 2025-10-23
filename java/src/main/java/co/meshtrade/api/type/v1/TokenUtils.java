package co.meshtrade.api.type.v1;

import co.meshtrade.api.type.v1.TokenOuterClass.Token;
import co.meshtrade.api.type.v1.AmountOuterClass.Amount;
import co.meshtrade.api.type.v1.LedgerOuterClass.Ledger;
import co.meshtrade.api.type.v1.DecimalOuterClass.Decimal;
import java.math.BigDecimal;

/**
 * Utility methods for working with Token protobuf messages.
 *
 * <p>This class provides token creation, validation, comparison, and conversion
 * operations.
 *
 * <p>All methods are null-safe and will handle null inputs gracefully according
 * to their documented behavior.
 */
public final class TokenUtils {

    private TokenUtils() {
        throw new UnsupportedOperationException("Utility class - cannot be instantiated");
    }

    /**
     * Creates a new undefined Token as a placeholder.
     *
     * <p>An undefined token has:
     * <ul>
     *   <li>Code: "-"</li>
     *   <li>Issuer: "-"</li>
     *   <li>Ledger: LEDGER_UNSPECIFIED</li>
     * </ul>
     *
     * <p>This is useful as a sentinel value to represent the absence of a valid token
     * or as a placeholder in data structures.
     *
     * @return A new Token configured as undefined, never null.
     */
    public static Token newUndefinedToken() {
        return Token.newBuilder()
                .setCode("-")
                .setIssuer("-")
                .setLedger(Ledger.LEDGER_UNSPECIFIED)
                .build();
    }

    /**
     * Creates a new Amount with the given decimal value and this token.
     *
     * <p>The precision handling depends on the token's ledger:
     * <ul>
     *   <li>Stellar ledger: Values are truncated to 7 decimal places (Stellar's native precision)</li>
     *   <li>All other ledgers: Full precision is preserved</li>
     * </ul>
     *
     * @param token The token for the amount. If null, returns null.
     * @param value The decimal value. If null, treated as zero.
     * @return A new Amount, or null if token is null.
     */
    public static Amount tokenNewAmountOf(Token token, Decimal value) {
        if (token == null) {
            return null;
        }

        BigDecimal bd = DecimalUtils.decimalToBigDecimal(value);

        // Handle ledger-specific precision
        if (token.getLedger() == Ledger.LEDGER_STELLAR) {
            // Stellar has 7 decimal places of precision
            bd = bd.setScale(7, java.math.RoundingMode.DOWN);
        }

        return Amount.newBuilder()
                .setValue(DecimalUtils.decimalFromBigDecimal(bd))
                .setToken(token)
                .build();
    }

    /**
     * Checks whether a token is undefined.
     *
     * <p>A token is considered undefined if it is null OR if it matches the undefined pattern:
     * <ul>
     *   <li>Code equals "-"</li>
     *   <li>Issuer equals "-"</li>
     *   <li>Ledger equals LEDGER_UNSPECIFIED</li>
     * </ul>
     *
     * @param token The token to check. Can be null.
     * @return true if the token is undefined or null, false otherwise.
     */
    public static boolean tokenIsUndefined(Token token) {
        if (token == null) {
            return true;
        }

        return "-".equals(token.getCode()) &&
               "-".equals(token.getIssuer()) &&
               token.getLedger() == Ledger.LEDGER_UNSPECIFIED;
    }

    /**
     * Checks if two tokens are equal.
     *
     * <p>Two tokens are considered equal if all of the following match:
     * <ul>
     *   <li>Code (asset code)</li>
     *   <li>Issuer (asset issuer)</li>
     *   <li>Ledger (blockchain/ledger type)</li>
     * </ul>
     *
     * @param token1 The first token. Can be null.
     * @param token2 The second token. Can be null.
     * @return true if both tokens are equal (including both being null), false otherwise.
     */
    public static boolean tokenIsEqualTo(Token token1, Token token2) {
        if (token1 == null && token2 == null) {
            return true;
        }
        if (token1 == null || token2 == null) {
            return false;
        }

        return token1.getCode().equals(token2.getCode()) &&
               token1.getIssuer().equals(token2.getIssuer()) &&
               token1.getLedger() == token2.getLedger();
    }

    /**
     * Returns a human-readable string representation of the token.
     *
     * <p>Format: "CODE by ISSUER on NETWORK"
     *
     * @param token The token. Can be null.
     * @return A formatted string, or "undefined" if token is null or undefined.
     */
    public static String tokenPrettyString(Token token) {
        if (token == null || tokenIsUndefined(token)) {
            return "undefined";
        }

        String ledgerName = LedgerUtils.ledgerToPrettyString(token.getLedger());
        return String.format("%s by %s on %s", token.getCode(), token.getIssuer(), ledgerName);
    }

    /**
     * Validates a token and returns it if valid.
     *
     * <p>A token is valid if:
     * <ul>
     *   <li>It is not null</li>
     *   <li>Code is not empty</li>
     *   <li>Issuer is not empty</li>
     *   <li>Ledger is not LEDGER_UNSPECIFIED (unless it's the undefined token pattern)</li>
     * </ul>
     *
     * @param token The token to validate. Can be null.
     * @return The same token if valid.
     * @throws IllegalArgumentException if the token is invalid.
     */
    public static Token validateToken(Token token) {
        if (token == null) {
            throw new IllegalArgumentException("Token cannot be null");
        }

        // Allow the undefined token pattern
        if (tokenIsUndefined(token)) {
            return token;
        }

        if (token.getCode().isEmpty()) {
            throw new IllegalArgumentException("Token code cannot be empty");
        }

        if (token.getIssuer().isEmpty()) {
            throw new IllegalArgumentException("Token issuer cannot be empty");
        }

        if (token.getLedger() == Ledger.LEDGER_UNSPECIFIED) {
            throw new IllegalArgumentException("Token ledger cannot be unspecified");
        }

        return token;
    }
}
