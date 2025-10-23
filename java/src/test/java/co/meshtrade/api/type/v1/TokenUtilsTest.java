package co.meshtrade.api.type.v1;

import co.meshtrade.api.type.v1.TokenOuterClass.Token;
import co.meshtrade.api.type.v1.AmountOuterClass.Amount;
import co.meshtrade.api.type.v1.LedgerOuterClass.Ledger;
import co.meshtrade.api.type.v1.DecimalOuterClass.Decimal;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for TokenUtils.
 */
class TokenUtilsTest {

    @Test
    void testNewUndefinedToken() {
        Token undefined = TokenUtils.newUndefinedToken();

        assertNotNull(undefined);
        assertEquals("-", undefined.getCode());
        assertEquals("-", undefined.getIssuer());
        assertEquals(Ledger.LEDGER_UNSPECIFIED, undefined.getLedger());
        assertTrue(TokenUtils.tokenIsUndefined(undefined));
    }

    @Test
    void testTokenIsUndefined() {
        // Null is undefined
        assertTrue(TokenUtils.tokenIsUndefined(null));

        // Undefined pattern
        assertTrue(TokenUtils.tokenIsUndefined(TokenUtils.newUndefinedToken()));

        // Valid token is not undefined
        Token validToken = Token.newBuilder()
                .setCode("USD")
                .setIssuer("ISSUER")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();
        assertFalse(TokenUtils.tokenIsUndefined(validToken));
    }

    @Test
    void testTokenIsEqualTo() {
        Token token1 = Token.newBuilder()
                .setCode("USD")
                .setIssuer("ISSUER1")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();

        Token token2 = Token.newBuilder()
                .setCode("USD")
                .setIssuer("ISSUER1")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();

        Token token3 = Token.newBuilder()
                .setCode("EUR")
                .setIssuer("ISSUER1")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();

        // Equal tokens
        assertTrue(TokenUtils.tokenIsEqualTo(token1, token2));

        // Different tokens
        assertFalse(TokenUtils.tokenIsEqualTo(token1, token3));

        // Null handling
        assertTrue(TokenUtils.tokenIsEqualTo(null, null));
        assertFalse(TokenUtils.tokenIsEqualTo(token1, null));
        assertFalse(TokenUtils.tokenIsEqualTo(null, token1));
    }

    @Test
    void testTokenPrettyString() {
        Token token = Token.newBuilder()
                .setCode("USD")
                .setIssuer("CIRCLE")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();

        String prettyString = TokenUtils.tokenPrettyString(token);
        assertEquals("USD by CIRCLE on Stellar", prettyString);

        // Undefined token
        assertEquals("undefined", TokenUtils.tokenPrettyString(null));
        assertEquals("undefined", TokenUtils.tokenPrettyString(TokenUtils.newUndefinedToken()));
    }

    @Test
    void testValidateToken() {
        // Valid token
        Token validToken = Token.newBuilder()
                .setCode("USD")
                .setIssuer("ISSUER")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();

        assertDoesNotThrow(() -> TokenUtils.validateToken(validToken));

        // Undefined token is valid
        assertDoesNotThrow(() -> TokenUtils.validateToken(TokenUtils.newUndefinedToken()));

        // Null token is invalid
        assertThrows(IllegalArgumentException.class, () -> TokenUtils.validateToken(null));

        // Empty code is invalid
        Token emptyCode = Token.newBuilder()
                .setCode("")
                .setIssuer("ISSUER")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();
        assertThrows(IllegalArgumentException.class, () -> TokenUtils.validateToken(emptyCode));

        // Empty issuer is invalid
        Token emptyIssuer = Token.newBuilder()
                .setCode("USD")
                .setIssuer("")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();
        assertThrows(IllegalArgumentException.class, () -> TokenUtils.validateToken(emptyIssuer));
    }

    @Test
    void testTokenNewAmountOf() {
        Token token = Token.newBuilder()
                .setCode("USD")
                .setIssuer("ISSUER")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();

        Decimal value = Decimal.newBuilder().setValue("123.456789012").build();
        Amount amount = TokenUtils.tokenNewAmountOf(token, value);

        assertNotNull(amount);
        assertEquals(token, amount.getToken());

        // Stellar precision (7 decimals)
        assertEquals("123.4567890", amount.getValue().getValue());

        // Null token returns null
        assertNull(TokenUtils.tokenNewAmountOf(null, value));
    }
}
