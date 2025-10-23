package co.meshtrade.api.type.v1;

import co.meshtrade.api.type.v1.AmountOuterClass.Amount;
import co.meshtrade.api.type.v1.DecimalOuterClass.Decimal;
import co.meshtrade.api.type.v1.TokenOuterClass.Token;
import co.meshtrade.api.type.v1.LedgerOuterClass.Ledger;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for AmountUtils.
 */
class AmountUtilsTest {

    private static Token createUSDToken() {
        return Token.newBuilder()
                .setCode("USD")
                .setIssuer("ISSUER")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();
    }

    private static Token createEURToken() {
        return Token.newBuilder()
                .setCode("EUR")
                .setIssuer("ISSUER")
                .setLedger(Ledger.LEDGER_STELLAR)
                .build();
    }

    private static Decimal dec(String value) {
        return Decimal.newBuilder().setValue(value).build();
    }

    @Test
    void testNewUndefinedAmount() {
        Decimal value = dec("100");
        Amount amount = AmountUtils.newUndefinedAmount(value);

        assertNotNull(amount);
        assertEquals("100", amount.getValue().getValue());
        assertTrue(AmountUtils.amountIsUndefined(amount));
    }

    @Test
    void testAmountSetValue() {
        Token token = createUSDToken();
        Amount original = TokenUtils.tokenNewAmountOf(token, dec("100"));
        Amount modified = AmountUtils.amountSetValue(original, dec("200"));

        // Stellar precision adds trailing zeros (7 decimals)
        assertEquals("200.0000000", modified.getValue().getValue());
        assertEquals(token, modified.getToken());

        // Null handling
        assertNull(AmountUtils.amountSetValue(null, dec("100")));
    }

    @Test
    void testAmountIsUndefined() {
        assertTrue(AmountUtils.amountIsUndefined(null));
        assertTrue(AmountUtils.amountIsUndefined(AmountUtils.newUndefinedAmount(dec("100"))));

        Amount defined = TokenUtils.tokenNewAmountOf(createUSDToken(), dec("100"));
        assertFalse(AmountUtils.amountIsUndefined(defined));
    }

    @Test
    void testAmountIsSameTypeAs() {
        Token usdToken = createUSDToken();
        Token eurToken = createEURToken();

        Amount usd1 = TokenUtils.tokenNewAmountOf(usdToken, dec("100"));
        Amount usd2 = TokenUtils.tokenNewAmountOf(usdToken, dec("200"));
        Amount eur1 = TokenUtils.tokenNewAmountOf(eurToken, dec("100"));

        assertTrue(AmountUtils.amountIsSameTypeAs(usd1, usd2));
        assertFalse(AmountUtils.amountIsSameTypeAs(usd1, eur1));
        assertFalse(AmountUtils.amountIsSameTypeAs(usd1, null));
    }

    @Test
    void testAmountIsEqualTo() {
        Token token = createUSDToken();
        Amount amount1 = TokenUtils.tokenNewAmountOf(token, dec("100"));
        Amount amount2 = TokenUtils.tokenNewAmountOf(token, dec("100"));
        Amount amount3 = TokenUtils.tokenNewAmountOf(token, dec("200"));

        assertTrue(AmountUtils.amountIsEqualTo(amount1, amount2));
        assertFalse(AmountUtils.amountIsEqualTo(amount1, amount3));
        assertTrue(AmountUtils.amountIsEqualTo(null, null));
        assertFalse(AmountUtils.amountIsEqualTo(amount1, null));
    }

    @Test
    void testAmountPredicates() {
        Token token = createUSDToken();

        Amount zero = TokenUtils.tokenNewAmountOf(token, dec("0"));
        assertTrue(AmountUtils.amountIsZero(zero));

        Amount negative = TokenUtils.tokenNewAmountOf(token, dec("-50"));
        assertTrue(AmountUtils.amountIsNegative(negative));

        Amount fractional = TokenUtils.tokenNewAmountOf(token, dec("100.5"));
        assertTrue(AmountUtils.amountContainsFractions(fractional));

        Amount whole = TokenUtils.tokenNewAmountOf(token, dec("100"));
        assertFalse(AmountUtils.amountContainsFractions(whole));
    }

    @Test
    void testAmountArithmetic() {
        Token token = createUSDToken();
        Amount amount1 = TokenUtils.tokenNewAmountOf(token, dec("100"));
        Amount amount2 = TokenUtils.tokenNewAmountOf(token, dec("30"));

        // Addition (Stellar precision adds trailing zeros)
        Amount sum = AmountUtils.amountAdd(amount1, amount2);
        assertEquals("130.0000000", sum.getValue().getValue());

        // Subtraction
        Amount diff = AmountUtils.amountSub(amount1, amount2);
        assertEquals("70.0000000", diff.getValue().getValue());

        // Multiplication
        Amount product = AmountUtils.amountDecimalMul(amount1, dec("2"));
        assertEquals("200.0000000", product.getValue().getValue());

        // Division
        Amount quotient = AmountUtils.amountDecimalDiv(amount1, dec("2"));
        assertTrue(DecimalUtils.decimalEqual(quotient.getValue(), dec("50")));
    }

    @Test
    void testAmountArithmeticDifferentTokens() {
        Token usdToken = createUSDToken();
        Token eurToken = createEURToken();

        Amount usd = TokenUtils.tokenNewAmountOf(usdToken, dec("100"));
        Amount eur = TokenUtils.tokenNewAmountOf(eurToken, dec("100"));

        assertThrows(IllegalArgumentException.class, () -> AmountUtils.amountAdd(usd, eur));
        assertThrows(IllegalArgumentException.class, () -> AmountUtils.amountSub(usd, eur));
        assertThrows(IllegalArgumentException.class, () -> AmountUtils.amountCompareTo(usd, eur));
    }

    @Test
    void testAmountDivisionByZero() {
        Token token = createUSDToken();
        Amount amount = TokenUtils.tokenNewAmountOf(token, dec("100"));

        assertThrows(ArithmeticException.class, () ->
            AmountUtils.amountDecimalDiv(amount, dec("0")));
    }

    @Test
    void testAmountAbsAndNegate() {
        Token token = createUSDToken();
        Amount negative = TokenUtils.tokenNewAmountOf(token, dec("-50"));

        Amount abs = AmountUtils.amountAbs(negative);
        assertEquals("50.0000000", abs.getValue().getValue());

        Amount negated = AmountUtils.amountNegate(negative);
        assertEquals("50.0000000", negated.getValue().getValue());

        Amount negatedAgain = AmountUtils.amountNegate(negated);
        assertEquals("-50.0000000", negatedAgain.getValue().getValue());
    }

    @Test
    void testAmountCompareTo() {
        Token token = createUSDToken();
        Amount amount1 = TokenUtils.tokenNewAmountOf(token, dec("100"));
        Amount amount2 = TokenUtils.tokenNewAmountOf(token, dec("50"));
        Amount amount3 = TokenUtils.tokenNewAmountOf(token, dec("100"));

        assertTrue(AmountUtils.amountCompareTo(amount1, amount2) > 0);
        assertTrue(AmountUtils.amountCompareTo(amount2, amount1) < 0);
        assertEquals(0, AmountUtils.amountCompareTo(amount1, amount3));
    }

    @Test
    void testAmountToString() {
        Token token = createUSDToken();
        Amount amount = TokenUtils.tokenNewAmountOf(token, dec("123.45"));

        String str = AmountUtils.amountToString(amount);
        assertTrue(str.contains("123.45"));
        assertTrue(str.contains("USD"));

        assertEquals("undefined", AmountUtils.amountToString(null));
        assertEquals("undefined", AmountUtils.amountToString(AmountUtils.newUndefinedAmount(dec("100"))));
    }

    @Test
    void testNullHandling_allMethods_handleGracefully() {
        Token token = createUSDToken();
        Decimal dec = dec("10");

        // These should all return null
        assertNull(AmountUtils.amountAbs(null));
        assertNull(AmountUtils.amountNegate(null));
        assertNull(AmountUtils.amountDecimalMul(null, dec));
        assertNull(AmountUtils.amountDecimalDiv(null, dec));
        assertNull(AmountUtils.amountAdd(null, null));
        assertNull(AmountUtils.amountSub(null, null));
        assertNull(AmountUtils.amountWithValue(null, dec));

        // Test partial null in binary operations
        Amount amount = TokenUtils.tokenNewAmountOf(token, dec("100"));
        assertNull(AmountUtils.amountAdd(amount, null));
        assertNull(AmountUtils.amountAdd(null, amount));
        assertNull(AmountUtils.amountSub(amount, null));
        assertNull(AmountUtils.amountSub(null, amount));
    }

    @Test
    void testNullHandling_comparison_handlesGracefully() {
        Token token = createUSDToken();
        Amount amount = TokenUtils.tokenNewAmountOf(token, dec("100"));

        // Null handling in type comparisons
        assertFalse(AmountUtils.amountIsSameTypeAs(null, amount));
        assertFalse(AmountUtils.amountIsSameTypeAs(amount, null));
        assertFalse(AmountUtils.amountIsSameTypeAs(null, null));

        // Null handling in equality comparisons
        assertFalse(AmountUtils.amountIsEqualTo(null, amount));
        assertFalse(AmountUtils.amountIsEqualTo(amount, null));
        assertTrue(AmountUtils.amountIsEqualTo(null, null));

        // Null handling in predicate methods
        assertFalse(AmountUtils.amountIsZero(null));
        assertFalse(AmountUtils.amountIsNegative(null));
        assertFalse(AmountUtils.amountContainsFractions(null));
    }
}
