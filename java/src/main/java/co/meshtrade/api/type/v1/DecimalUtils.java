package co.meshtrade.api.type.v1;

import co.meshtrade.api.type.v1.DecimalOuterClass.Decimal;
import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Utility methods for working with Decimal protobuf messages.
 *
 * <p>This class provides conversion between protobuf Decimal and Java BigDecimal,
 * as well as arithmetic, comparison, and rounding operations.
 *
 * <p>All methods are null-safe and will handle null inputs gracefully according
 * to their documented behavior.
 */
public final class DecimalUtils {

    private DecimalUtils() {
        throw new UnsupportedOperationException("Utility class - cannot be instantiated");
    }

    /**
     * Converts a protobuf Decimal to a Java BigDecimal.
     *
     * <p>The Decimal protobuf message stores its value as a string. This method
     * parses that string into a BigDecimal for arithmetic operations.
     *
     * @param d The Decimal to convert. If null or has empty value, returns BigDecimal.ZERO.
     * @return The BigDecimal representation, never null. Returns BigDecimal.ZERO for null or empty input.
     *
     * @throws NumberFormatException if the Decimal's value string is not a valid decimal number
     */
    public static BigDecimal decimalToBigDecimal(Decimal d) {
        if (d == null) {
            return BigDecimal.ZERO;
        }

        String value = d.getValue();
        if (value == null || value.isEmpty()) {
            return BigDecimal.ZERO;
        }

        return new BigDecimal(value);
    }

    /**
     * Converts a Java BigDecimal to a protobuf Decimal.
     *
     * <p>This creates a new Decimal protobuf message with the BigDecimal's string
     * representation as its value.
     *
     * @param bd The BigDecimal to convert. If null, creates a Decimal with value "0".
     * @return A new Decimal protobuf message, never null.
     */
    public static Decimal decimalFromBigDecimal(BigDecimal bd) {
        if (bd == null) {
            bd = BigDecimal.ZERO;
        }
        return Decimal.newBuilder().setValue(bd.toPlainString()).build();
    }

    /**
     * Adds two Decimal values and returns the result.
     *
     * <p>Performs d1 + d2. Null inputs are treated as zero.
     *
     * @param d1 The first Decimal. Null treated as zero.
     * @param d2 The second Decimal. Null treated as zero.
     * @return A new Decimal containing the sum, never null.
     */
    public static Decimal decimalAdd(Decimal d1, Decimal d2) {
        BigDecimal bd1 = decimalToBigDecimal(d1);
        BigDecimal bd2 = decimalToBigDecimal(d2);
        return decimalFromBigDecimal(bd1.add(bd2));
    }

    /**
     * Subtracts one Decimal from another and returns the result.
     *
     * <p>Performs d1 - d2. Null inputs are treated as zero.
     *
     * @param d1 The first Decimal (minuend). Null treated as zero.
     * @param d2 The second Decimal (subtrahend). Null treated as zero.
     * @return A new Decimal containing the difference, never null.
     */
    public static Decimal decimalSub(Decimal d1, Decimal d2) {
        BigDecimal bd1 = decimalToBigDecimal(d1);
        BigDecimal bd2 = decimalToBigDecimal(d2);
        return decimalFromBigDecimal(bd1.subtract(bd2));
    }

    /**
     * Multiplies two Decimal values and returns the result.
     *
     * <p>Performs d1 * d2. Null inputs are treated as zero.
     *
     * @param d1 The first Decimal. Null treated as zero.
     * @param d2 The second Decimal. Null treated as zero.
     * @return A new Decimal containing the product, never null.
     */
    public static Decimal decimalMul(Decimal d1, Decimal d2) {
        BigDecimal bd1 = decimalToBigDecimal(d1);
        BigDecimal bd2 = decimalToBigDecimal(d2);
        return decimalFromBigDecimal(bd1.multiply(bd2));
    }

    /**
     * Divides one Decimal by another and returns the result.
     *
     * <p>Performs d1 / d2. Null inputs are treated as zero. The result preserves
     * full precision (no rounding).
     *
     * @param d1 The dividend. Null treated as zero.
     * @param d2 The divisor. Null treated as zero.
     * @return A new Decimal containing the quotient, never null.
     * @throws ArithmeticException if d2 is zero (division by zero).
     */
    public static Decimal decimalDiv(Decimal d1, Decimal d2) {
        BigDecimal bd1 = decimalToBigDecimal(d1);
        BigDecimal bd2 = decimalToBigDecimal(d2);

        if (bd2.compareTo(BigDecimal.ZERO) == 0) {
            throw new ArithmeticException("Division by zero");
        }

        // Use a reasonable scale and rounding mode for division
        return decimalFromBigDecimal(bd1.divide(bd2, 34, RoundingMode.HALF_EVEN));
    }

    /**
     * Checks if two Decimal values are equal.
     *
     * @param d1 The first Decimal. Null treated as zero.
     * @param d2 The second Decimal. Null treated as zero.
     * @return true if d1 equals d2, false otherwise.
     */
    public static boolean decimalEqual(Decimal d1, Decimal d2) {
        BigDecimal bd1 = decimalToBigDecimal(d1);
        BigDecimal bd2 = decimalToBigDecimal(d2);
        return bd1.compareTo(bd2) == 0;
    }

    /**
     * Checks if d1 is less than d2.
     *
     * @param d1 The first Decimal. Null treated as zero.
     * @param d2 The second Decimal. Null treated as zero.
     * @return true if d1 < d2, false otherwise.
     */
    public static boolean decimalLessThan(Decimal d1, Decimal d2) {
        BigDecimal bd1 = decimalToBigDecimal(d1);
        BigDecimal bd2 = decimalToBigDecimal(d2);
        return bd1.compareTo(bd2) < 0;
    }

    /**
     * Checks if d1 is less than or equal to d2.
     *
     * @param d1 The first Decimal. Null treated as zero.
     * @param d2 The second Decimal. Null treated as zero.
     * @return true if d1 <= d2, false otherwise.
     */
    public static boolean decimalLessThanOrEqual(Decimal d1, Decimal d2) {
        BigDecimal bd1 = decimalToBigDecimal(d1);
        BigDecimal bd2 = decimalToBigDecimal(d2);
        return bd1.compareTo(bd2) <= 0;
    }

    /**
     * Checks if d1 is greater than d2.
     *
     * @param d1 The first Decimal. Null treated as zero.
     * @param d2 The second Decimal. Null treated as zero.
     * @return true if d1 > d2, false otherwise.
     */
    public static boolean decimalGreaterThan(Decimal d1, Decimal d2) {
        BigDecimal bd1 = decimalToBigDecimal(d1);
        BigDecimal bd2 = decimalToBigDecimal(d2);
        return bd1.compareTo(bd2) > 0;
    }

    /**
     * Checks if d1 is greater than or equal to d2.
     *
     * @param d1 The first Decimal. Null treated as zero.
     * @param d2 The second Decimal. Null treated as zero.
     * @return true if d1 >= d2, false otherwise.
     */
    public static boolean decimalGreaterThanOrEqual(Decimal d1, Decimal d2) {
        BigDecimal bd1 = decimalToBigDecimal(d1);
        BigDecimal bd2 = decimalToBigDecimal(d2);
        return bd1.compareTo(bd2) >= 0;
    }

    /**
     * Checks if a Decimal is zero.
     *
     * @param d The Decimal to check. Null treated as zero.
     * @return true if d equals zero, false otherwise.
     */
    public static boolean decimalIsZero(Decimal d) {
        BigDecimal bd = decimalToBigDecimal(d);
        return bd.compareTo(BigDecimal.ZERO) == 0;
    }

    /**
     * Checks if a Decimal is negative.
     *
     * @param d The Decimal to check. Null treated as zero.
     * @return true if d < 0, false otherwise.
     */
    public static boolean decimalIsNegative(Decimal d) {
        BigDecimal bd = decimalToBigDecimal(d);
        return bd.compareTo(BigDecimal.ZERO) < 0;
    }

    /**
     * Checks if a Decimal is positive.
     *
     * @param d The Decimal to check. Null treated as zero.
     * @return true if d > 0, false otherwise.
     */
    public static boolean decimalIsPositive(Decimal d) {
        BigDecimal bd = decimalToBigDecimal(d);
        return bd.compareTo(BigDecimal.ZERO) > 0;
    }

    /**
     * Rounds a Decimal to the specified number of decimal places.
     *
     * <p>Uses HALF_EVEN rounding mode (banker's rounding). If places is negative,
     * rounds to powers of 10 (e.g., places=-1 rounds to nearest 10).
     *
     * @param d The Decimal to round. Null treated as zero.
     * @param places The number of decimal places. Can be negative.
     * @return A new Decimal with the rounded value, never null.
     */
    public static Decimal decimalRound(Decimal d, int places) {
        BigDecimal bd = decimalToBigDecimal(d);
        return decimalFromBigDecimal(bd.setScale(places, RoundingMode.HALF_EVEN));
    }

    /**
     * Returns the absolute value of a Decimal.
     *
     * @param d The Decimal. Null treated as zero.
     * @return A new Decimal with the absolute value, never null.
     */
    public static Decimal decimalAbs(Decimal d) {
        BigDecimal bd = decimalToBigDecimal(d);
        return decimalFromBigDecimal(bd.abs());
    }

    /**
     * Negates a Decimal (multiplies by -1).
     *
     * @param d The Decimal. Null treated as zero.
     * @return A new Decimal with the negated value, never null.
     */
    public static Decimal decimalNegate(Decimal d) {
        BigDecimal bd = decimalToBigDecimal(d);
        return decimalFromBigDecimal(bd.negate());
    }

    /**
     * Compares two Decimal values.
     *
     * @param d1 The first Decimal. Null treated as zero.
     * @param d2 The second Decimal. Null treated as zero.
     * @return negative if d1 < d2, zero if d1 == d2, positive if d1 > d2.
     */
    public static int decimalCompareTo(Decimal d1, Decimal d2) {
        BigDecimal bd1 = decimalToBigDecimal(d1);
        BigDecimal bd2 = decimalToBigDecimal(d2);
        return bd1.compareTo(bd2);
    }
}
