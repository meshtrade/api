package co.meshtrade.api.type.v1;

import co.meshtrade.api.type.v1.AmountOuterClass.Amount;
import co.meshtrade.api.type.v1.DecimalOuterClass.Decimal;
import co.meshtrade.api.type.v1.TokenOuterClass.Token;
import java.math.BigDecimal;

/**
 * Utility methods for working with Amount protobuf messages.
 *
 * <p>This class provides amount creation, arithmetic operations, comparisons,
 * and validation.
 *
 * <p>All methods are null-safe and will handle null inputs gracefully according
 * to their documented behavior.
 */
public final class AmountUtils {

    private AmountUtils() {
        throw new UnsupportedOperationException("Utility class - cannot be instantiated");
    }

    /**
     * Creates a new Amount with an undefined token and the specified value.
     *
     * @param value The decimal value. If null, treated as zero.
     * @return A new Amount with undefined token, never null.
     */
    public static Amount newUndefinedAmount(Decimal value) {
        return Amount.newBuilder()
                .setValue(value != null ? value : DecimalUtils.decimalFromBigDecimal(BigDecimal.ZERO))
                .setToken(TokenUtils.newUndefinedToken())
                .build();
    }

    /**
     * Creates a new Amount with the same token but a different value.
     *
     * <p>Despite its name, this method does NOT modify the input - it creates and returns a NEW Amount.
     *
     * @param amount The original amount. If null, returns null.
     * @param value The new value. If null, treated as zero.
     * @return A new Amount with the specified value and the same token, or null if amount is null.
     */
    public static Amount amountSetValue(Amount amount, Decimal value) {
        if (amount == null) {
            return null;
        }

        return TokenUtils.tokenNewAmountOf(amount.getToken(), value);
    }

    /**
     * Checks if an amount has an undefined token.
     *
     * @param amount The amount to check. Can be null.
     * @return true if the amount is null or has an undefined token, false otherwise.
     */
    public static boolean amountIsUndefined(Amount amount) {
        if (amount == null) {
            return true;
        }

        return TokenUtils.tokenIsUndefined(amount.getToken());
    }

    /**
     * Checks if two amounts have the same token type.
     *
     * @param amount1 The first amount. Can be null.
     * @param amount2 The second amount. Can be null.
     * @return true if both amounts have equal tokens, false otherwise.
     */
    public static boolean amountIsSameTypeAs(Amount amount1, Amount amount2) {
        if (amount1 == null || amount2 == null) {
            return false;
        }

        return TokenUtils.tokenIsEqualTo(amount1.getToken(), amount2.getToken());
    }

    /**
     * Checks if two amounts are equal in both value and token.
     *
     * @param amount1 The first amount. Can be null.
     * @param amount2 The second amount. Can be null.
     * @return true if both amounts have equal values and tokens (or both are null), false otherwise.
     */
    public static boolean amountIsEqualTo(Amount amount1, Amount amount2) {
        if (amount1 == null && amount2 == null) {
            return true;
        }
        if (amount1 == null || amount2 == null) {
            return false;
        }

        return TokenUtils.tokenIsEqualTo(amount1.getToken(), amount2.getToken()) &&
               DecimalUtils.decimalEqual(amount1.getValue(), amount2.getValue());
    }

    /**
     * Checks if an amount's value is negative.
     *
     * @param amount The amount to check. Can be null.
     * @return true if the value is negative, false otherwise (including null).
     */
    public static boolean amountIsNegative(Amount amount) {
        if (amount == null) {
            return false;
        }

        return DecimalUtils.decimalIsNegative(amount.getValue());
    }

    /**
     * Checks if an amount's value is zero.
     *
     * @param amount The amount to check. Can be null.
     * @return true if the value is zero, false otherwise (including null).
     */
    public static boolean amountIsZero(Amount amount) {
        if (amount == null) {
            return false;
        }

        return DecimalUtils.decimalIsZero(amount.getValue());
    }

    /**
     * Checks if an amount's value has fractional (decimal) places.
     *
     * @param amount The amount to check. Can be null.
     * @return true if the value has fractions, false otherwise (including null).
     */
    public static boolean amountContainsFractions(Amount amount) {
        if (amount == null) {
            return false;
        }

        BigDecimal bd = DecimalUtils.decimalToBigDecimal(amount.getValue());
        return bd.stripTrailingZeros().scale() > 0;
    }

    /**
     * Adds two amounts and returns a new amount with the result.
     *
     * @param amount1 The first amount. Can be null.
     * @param amount2 The second amount. Can be null.
     * @return A new Amount with the sum, or null if either amount is null.
     * @throws IllegalArgumentException if the amounts have different tokens.
     */
    public static Amount amountAdd(Amount amount1, Amount amount2) {
        if (amount1 == null || amount2 == null) {
            return null;
        }

        if (!TokenUtils.tokenIsEqualTo(amount1.getToken(), amount2.getToken())) {
            throw new IllegalArgumentException(
                    String.format("Cannot perform arithmetic on amounts of different token denominations: %s vs. %s",
                            TokenUtils.tokenPrettyString(amount1.getToken()),
                            TokenUtils.tokenPrettyString(amount2.getToken())));
        }

        Decimal sum = DecimalUtils.decimalAdd(amount1.getValue(), amount2.getValue());
        return amountSetValue(amount1, sum);
    }

    /**
     * Subtracts one amount from another and returns a new amount with the result.
     *
     * @param amount1 The minuend. Can be null.
     * @param amount2 The subtrahend. Can be null.
     * @return A new Amount with the difference, or null if either amount is null.
     * @throws IllegalArgumentException if the amounts have different tokens.
     */
    public static Amount amountSub(Amount amount1, Amount amount2) {
        if (amount1 == null || amount2 == null) {
            return null;
        }

        if (!TokenUtils.tokenIsEqualTo(amount1.getToken(), amount2.getToken())) {
            throw new IllegalArgumentException(
                    String.format("Cannot perform arithmetic on amounts of different token denominations: %s vs. %s",
                            TokenUtils.tokenPrettyString(amount1.getToken()),
                            TokenUtils.tokenPrettyString(amount2.getToken())));
        }

        Decimal diff = DecimalUtils.decimalSub(amount1.getValue(), amount2.getValue());
        return amountSetValue(amount1, diff);
    }

    /**
     * Multiplies an amount by a decimal multiplier.
     *
     * @param amount The amount. Can be null.
     * @param multiplier The multiplier. Can be null (treated as zero).
     * @return A new Amount with the product, or null if amount is null.
     */
    public static Amount amountDecimalMul(Amount amount, Decimal multiplier) {
        if (amount == null) {
            return null;
        }

        Decimal product = DecimalUtils.decimalMul(amount.getValue(), multiplier);
        return amountSetValue(amount, product);
    }

    /**
     * Divides an amount by a decimal divisor.
     *
     * @param amount The amount. Can be null.
     * @param divisor The divisor. Can be null (treated as zero).
     * @return A new Amount with the quotient, or null if amount is null.
     * @throws ArithmeticException if divisor is zero.
     */
    public static Amount amountDecimalDiv(Amount amount, Decimal divisor) {
        if (amount == null) {
            return null;
        }

        Decimal quotient = DecimalUtils.decimalDiv(amount.getValue(), divisor);
        return amountSetValue(amount, quotient);
    }

    /**
     * Returns the absolute value of an amount.
     *
     * @param amount The amount. Can be null.
     * @return A new Amount with the absolute value, or null if amount is null.
     */
    public static Amount amountAbs(Amount amount) {
        if (amount == null) {
            return null;
        }

        Decimal abs = DecimalUtils.decimalAbs(amount.getValue());
        return amountSetValue(amount, abs);
    }

    /**
     * Negates an amount (multiplies value by -1).
     *
     * @param amount The amount. Can be null.
     * @return A new Amount with the negated value, or null if amount is null.
     */
    public static Amount amountNegate(Amount amount) {
        if (amount == null) {
            return null;
        }

        Decimal negated = DecimalUtils.decimalNegate(amount.getValue());
        return amountSetValue(amount, negated);
    }

    /**
     * Compares two amounts.
     *
     * @param amount1 The first amount. Can be null (treated as zero).
     * @param amount2 The second amount. Can be null (treated as zero).
     * @return negative if amount1 < amount2, zero if equal, positive if amount1 > amount2.
     * @throws IllegalArgumentException if the amounts have different tokens.
     */
    public static int amountCompareTo(Amount amount1, Amount amount2) {
        if (amount1 == null && amount2 == null) {
            return 0;
        }
        if (amount1 == null) {
            return -1;
        }
        if (amount2 == null) {
            return 1;
        }

        if (!TokenUtils.tokenIsEqualTo(amount1.getToken(), amount2.getToken())) {
            throw new IllegalArgumentException(
                    String.format("Cannot compare amounts of different token denominations: %s vs. %s",
                            TokenUtils.tokenPrettyString(amount1.getToken()),
                            TokenUtils.tokenPrettyString(amount2.getToken())));
        }

        return DecimalUtils.decimalCompareTo(amount1.getValue(), amount2.getValue());
    }

    /**
     * Returns a string representation of the amount.
     *
     * <p>Format: "VALUE TOKEN_CODE"
     *
     * @param amount The amount. Can be null.
     * @return A string representation, or "undefined" if amount is null or has undefined token.
     */
    public static String amountToString(Amount amount) {
        if (amount == null || amountIsUndefined(amount)) {
            return "undefined";
        }

        return String.format("%s %s", amount.getValue().getValue(), amount.getToken().getCode());
    }
}
