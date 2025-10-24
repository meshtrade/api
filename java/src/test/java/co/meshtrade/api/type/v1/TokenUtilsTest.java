package co.meshtrade.api.type.v1;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import co.meshtrade.api.type.v1.AmountOuterClass.Amount;
import co.meshtrade.api.type.v1.DecimalOuterClass.Decimal;
import co.meshtrade.api.type.v1.LedgerOuterClass.Ledger;
import co.meshtrade.api.type.v1.TokenOuterClass.Token;

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

    @Test
    void testTokenNewAmountOfDifferentLedgerPrecisions() {
        Decimal highPrecision = Decimal.newBuilder().setValue("1.123456789012345678").build();

        // Test Stellar (7 decimals) - should truncate
        Token stellarToken = Token.newBuilder()
                .setCode("XLM")
                .setIssuer("NATIVE")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();
        Amount stellarAmount = TokenUtils.tokenNewAmountOf(stellarToken, highPrecision);
        assertEquals("1.1234567", stellarAmount.getValue().getValue(),
            "Stellar should truncate to 7 decimal places");

        // Test Ethereum (non-Stellar) - should preserve full precision
        Token ethToken = Token.newBuilder()
                .setCode("ETH")
                .setIssuer("NATIVE")
                .setLedger(Ledger.LEDGER_ETHEREUM)
                .build();
        Amount ethAmount = TokenUtils.tokenNewAmountOf(ethToken, highPrecision);
        assertEquals("1.123456789012345678", ethAmount.getValue().getValue(),
            "Ethereum should preserve full precision");

        // Test Bitcoin (non-Stellar) - should preserve full precision
        Token btcToken = Token.newBuilder()
                .setCode("BTC")
                .setIssuer("NATIVE")
                .setLedger(Ledger.LEDGER_BITCOIN)
                .build();
        Amount btcAmount = TokenUtils.tokenNewAmountOf(btcToken, highPrecision);
        assertEquals("1.123456789012345678", btcAmount.getValue().getValue(),
            "Bitcoin should preserve full precision");

        // Test XRP (non-Stellar) - should preserve full precision
        Token xrpToken = Token.newBuilder()
                .setCode("XRP")
                .setIssuer("NATIVE")
                .setLedger(Ledger.LEDGER_XRP)
                .build();
        Amount xrpAmount = TokenUtils.tokenNewAmountOf(xrpToken, highPrecision);
        assertEquals("1.123456789012345678", xrpAmount.getValue().getValue(),
            "XRP should preserve full precision");
    }

    @Test
    void testTokenNewAmountOfStellarPrecisionRounding() {
        Token stellarToken = Token.newBuilder()
                .setCode("USDC")
                .setIssuer("CIRCLE")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();

        // Test rounding down (truncation)
        Decimal value1 = Decimal.newBuilder().setValue("100.12345678").build();
        Amount amount1 = TokenUtils.tokenNewAmountOf(stellarToken, value1);
        assertEquals("100.1234567", amount1.getValue().getValue(),
            "Should truncate (round down) to 7 decimals");

        // Test exact 7 decimals
        Decimal value2 = Decimal.newBuilder().setValue("100.1234567").build();
        Amount amount2 = TokenUtils.tokenNewAmountOf(stellarToken, value2);
        assertEquals("100.1234567", amount2.getValue().getValue(),
            "Should preserve exact 7 decimals");

        // Test fewer than 7 decimals
        Decimal value3 = Decimal.newBuilder().setValue("100.12").build();
        Amount amount3 = TokenUtils.tokenNewAmountOf(stellarToken, value3);
        assertEquals("100.1200000", amount3.getValue().getValue(),
            "Should pad to 7 decimals");
    }
}
