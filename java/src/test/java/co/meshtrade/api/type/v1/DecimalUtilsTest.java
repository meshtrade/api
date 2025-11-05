package co.meshtrade.api.type.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.math.BigDecimal;

import org.junit.jupiter.api.Test;

import co.meshtrade.api.type.v1.DecimalOuterClass.Decimal;

/**
 * Unit tests for DecimalUtils.
 */
class DecimalUtilsTest {

    private static Decimal dec(String value) {
        return Decimal.newBuilder().setValue(value).build();
    }

    @Test
    void testConversions() {
        // Test BigDecimal to Decimal and back
        BigDecimal bd = new BigDecimal("123.456");
        Decimal d = DecimalUtils.decimalFromBigDecimal(bd);
        assertEquals("123.456", d.getValue());

        BigDecimal bd2 = DecimalUtils.decimalToBigDecimal(d);
        assertEquals(0, bd.compareTo(bd2));

        // Test null handling
        assertEquals(BigDecimal.ZERO, DecimalUtils.decimalToBigDecimal(null));
        assertNotNull(DecimalUtils.decimalFromBigDecimal(null));
    }

    @Test
    void testArithmetic() {
        Decimal d1 = dec("100");
        Decimal d2 = dec("50");

        // Addition
        Decimal sum = DecimalUtils.decimalAdd(d1, d2);
        assertEquals("150", sum.getValue());

        // Subtraction
        Decimal diff = DecimalUtils.decimalSub(d1, d2);
        assertEquals("50", diff.getValue());

        // Multiplication
        Decimal product = DecimalUtils.decimalMul(d1, d2);
        assertEquals("5000", product.getValue());

        // Division
        Decimal quotient = DecimalUtils.decimalDiv(d1, d2);
        assertTrue(DecimalUtils.decimalEqual(quotient, dec("2")));
    }

    @Test
    void testDivisionByZero() {
        Decimal d1 = dec("100");
        Decimal zero = dec("0");

        assertThrows(ArithmeticException.class, () -> {
            DecimalUtils.decimalDiv(d1, zero);
        });
    }

    @Test
    void testComparisons() {
        Decimal d1 = dec("100");
        Decimal d2 = dec("50");
        Decimal d3 = dec("100");

        assertTrue(DecimalUtils.decimalEqual(d1, d3));
        assertTrue(DecimalUtils.decimalGreaterThan(d1, d2));
        assertTrue(DecimalUtils.decimalGreaterThanOrEqual(d1, d2));
        assertTrue(DecimalUtils.decimalGreaterThanOrEqual(d1, d3));
        assertTrue(DecimalUtils.decimalLessThan(d2, d1));
        assertTrue(DecimalUtils.decimalLessThanOrEqual(d2, d1));
        assertTrue(DecimalUtils.decimalLessThanOrEqual(d3, d1));
    }

    @Test
    void testPredicates() {
        assertTrue(DecimalUtils.decimalIsZero(dec("0")));
        assertTrue(DecimalUtils.decimalIsNegative(dec("-5")));
        assertTrue(DecimalUtils.decimalIsPositive(dec("5")));

        assertFalse(DecimalUtils.decimalIsZero(dec("1")));
        assertFalse(DecimalUtils.decimalIsNegative(dec("5")));
        assertFalse(DecimalUtils.decimalIsPositive(dec("-5")));
    }

    @Test
    void testRound() {
        Decimal d = dec("123.456789");

        Decimal rounded = DecimalUtils.decimalRound(d, 2);
        assertEquals("123.46", rounded.getValue());

        rounded = DecimalUtils.decimalRound(d, 0);
        assertEquals("123", rounded.getValue());
    }

    @Test
    void testAbsAndNegate() {
        Decimal d = dec("-50.5");

        Decimal abs = DecimalUtils.decimalAbs(d);
        assertEquals("50.5", abs.getValue());

        Decimal neg = DecimalUtils.decimalNegate(d);
        assertEquals("50.5", neg.getValue());

        Decimal negAgain = DecimalUtils.decimalNegate(neg);
        assertEquals("-50.5", negAgain.getValue());
    }

    @Test
    void testCompareTo() {
        Decimal d1 = dec("100");
        Decimal d2 = dec("50");
        Decimal d3 = dec("100");

        assertTrue(DecimalUtils.decimalCompareTo(d1, d2) > 0);
        assertTrue(DecimalUtils.decimalCompareTo(d2, d1) < 0);
        assertEquals(0, DecimalUtils.decimalCompareTo(d1, d3));
    }

    @Test
    void testDivisionPrecision() {
        // Test that division uses correct precision (34 decimals with HALF_EVEN rounding)
        Decimal d1 = dec("1");
        Decimal d2 = dec("3");
        Decimal result = DecimalUtils.decimalDiv(d1, d2);

        // Should be 0.3333... with 34 decimal places
        String resultValue = result.getValue();
        assertNotNull(resultValue);
        assertTrue(resultValue.startsWith("0.3333333333"),
            "Division result should start with 0.3333333333, got: " + resultValue);

        // Verify precision is exactly 34 decimal places
        String[] parts = resultValue.split("\\.");
        assertEquals(2, parts.length, "Result should have decimal point");
        assertEquals(34, parts[1].length(),
            "Division should produce exactly 34 decimal places, got: " + parts[1].length());

        // Test HALF_EVEN rounding behavior
        Decimal d3 = dec("10");
        Decimal d4 = dec("3");
        Decimal result2 = DecimalUtils.decimalDiv(d3, d4);
        assertTrue(result2.getValue().startsWith("3.3333333333"),
            "10/3 should start with 3.3333333333");
    }
}
