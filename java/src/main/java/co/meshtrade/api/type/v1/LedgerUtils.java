package co.meshtrade.api.type.v1;

import co.meshtrade.api.type.v1.LedgerOuterClass.Ledger;

/**
 * Utility methods for working with Ledger protobuf enums.
 * <p>This class provides validation, formatting, and precision operations
 * for Ledger enum values.
 * <p>All methods are static and the class cannot be instantiated.
 */
public final class LedgerUtils {

    private LedgerUtils() {
        throw new UnsupportedOperationException("Utility class - cannot be instantiated");
    }

    /**
     * Checks whether the Ledger value is a valid enum value defined in the protobuf schema.
     *
     * <p>This method verifies that the ledger value exists in the generated Ledger enum,
     * which contains all valid ledger enum values from the protobuf definition.
     *
     * @param ledger The ledger to check. Can be null.
     * @return true if the ledger is a valid enum value (including LEDGER_UNSPECIFIED), false otherwise.
     *
     * <p><b>Note:</b> This method returns true for LEDGER_UNSPECIFIED (the zero value).
     * Use {@link #ledgerIsValidAndDefined(Ledger)} if you need to exclude LEDGER_UNSPECIFIED.
     *
     * <p><b>Example:</b>
     * <pre>{@code
     * Ledger ledger = Ledger.LEDGER_STELLAR;
     * if (LedgerUtils.ledgerIsValid(ledger)) {
     *     // Ledger is a valid enum value
     * }
     *
     * // forNumber returns UNRECOGNIZED for invalid values
     * Ledger invalid = Ledger.forNumber(999);
     * if (!LedgerUtils.ledgerIsValid(invalid)) {
     *     // Handle invalid ledger value
     * }
     * }</pre>
     */
    public static boolean ledgerIsValid(Ledger ledger) {
        if (ledger == null) {
            return false;
        }
        // In Java protobuf, UNRECOGNIZED is used for invalid enum values
        return ledger != Ledger.UNRECOGNIZED;
    }

    /**
     * Checks whether the Ledger value is both valid and not LEDGER_UNSPECIFIED.
     *
     * <p>This is useful when you need to ensure a ledger has been explicitly set to a specific network,
     * rather than being left at the default zero value.
     *
     * @param ledger The ledger to check. Can be null.
     * @return true if the ledger is valid AND not LEDGER_UNSPECIFIED, false otherwise.
     *
     * <p><b>Note:</b> This is equivalent to: ledgerIsValid(ledger) && ledger != LEDGER_UNSPECIFIED.
     * Use this when LEDGER_UNSPECIFIED should be treated as invalid/undefined.
     *
     * <p><b>Example:</b>
     * <pre>{@code
     * Ledger ledger = Ledger.LEDGER_STELLAR;
     * if (LedgerUtils.ledgerIsValidAndDefined(ledger)) {
     *     // Ledger is set to a specific network (not unspecified)
     * }
     *
     * Ledger unspecified = Ledger.LEDGER_UNSPECIFIED;
     * if (!LedgerUtils.ledgerIsValidAndDefined(unspecified)) {
     *     // Ledger is unspecified, require user to select a network
     * }
     * }</pre>
     */
    public static boolean ledgerIsValidAndDefined(Ledger ledger) {
        return ledgerIsValid(ledger) && ledger != Ledger.LEDGER_UNSPECIFIED;
    }

    /**
     * Converts the Ledger enum value to a human-readable network name.
     *
     * <p>This method provides user-friendly names for each blockchain network/ledger type.
     *
     * @param ledger The ledger to convert. Can be null.
     * @return A human-readable network name string. Returns "Unknown" for null or invalid values.
     *
     * <p><b>Supported Networks:</b>
     * <ul>
     *   <li>LEDGER_STELLAR → "Stellar"</li>
     *   <li>LEDGER_ETHEREUM → "Ethereum"</li>
     *   <li>LEDGER_BITCOIN → "Bitcoin"</li>
     *   <li>LEDGER_LITECOIN → "Litecoin"</li>
     *   <li>LEDGER_XRP → "XRP"</li>
     *   <li>LEDGER_SA_STOCK_BROKERS → "SA Stock Brokers"</li>
     *   <li>LEDGER_NULL → "Null"</li>
     *   <li>LEDGER_UNSPECIFIED → "Unspecified"</li>
     * </ul>
     *
     * <p><b>Note:</b> This method does not validate the ledger value. Invalid ledger values return "Unknown".
     * Use this for display purposes, logging, and user interfaces.
     *
     * <p><b>Example:</b>
     * <pre>{@code
     * Ledger ledger = Ledger.LEDGER_STELLAR;
     * System.out.println(LedgerUtils.ledgerToPrettyString(ledger));  // Output: "Stellar"
     *
     * Ledger unspecified = Ledger.LEDGER_UNSPECIFIED;
     * System.out.println(LedgerUtils.ledgerToPrettyString(unspecified));  // Output: "Unspecified"
     *
     * Ledger invalid = Ledger.forNumber(999);
     * System.out.println(LedgerUtils.ledgerToPrettyString(invalid));  // Output: "Unknown"
     * }</pre>
     */
    public static String ledgerToPrettyString(Ledger ledger) {
        if (ledger == null) {
            return "Unknown";
        }

        switch (ledger) {
            case LEDGER_STELLAR:
                return "Stellar";
            case LEDGER_ETHEREUM:
                return "Ethereum";
            case LEDGER_BITCOIN:
                return "Bitcoin";
            case LEDGER_LITECOIN:
                return "Litecoin";
            case LEDGER_XRP:
                return "XRP";
            case LEDGER_SA_STOCK_BROKERS:
                return "SA Stock Brokers";
            case LEDGER_NULL:
                return "Null";
            case LEDGER_UNSPECIFIED:
                return "Unspecified";
            case UNRECOGNIZED:
            default:
                return "Unknown";
        }
    }

    /**
     * Gets the decimal precision for a given ledger.
     *
     * <p>Different blockchain networks have different precision requirements for their native tokens.
     * This method returns the number of decimal places supported by each ledger.
     *
     * @param ledger The ledger to get precision for. Can be null.
     * @return The number of decimal places supported by the ledger. Returns 0 for null or LEDGER_UNSPECIFIED.
     *
     * <p><b>Ledger Precisions:</b>
     * <ul>
     *   <li>LEDGER_STELLAR → 7 decimal places (Stellar protocol constraint)</li>
     *   <li>LEDGER_ETHEREUM → 18 decimal places (wei precision)</li>
     *   <li>LEDGER_BITCOIN → 8 decimal places (satoshi precision)</li>
     *   <li>LEDGER_LITECOIN → 8 decimal places</li>
     *   <li>LEDGER_XRP → 6 decimal places (drops precision)</li>
     *   <li>LEDGER_SA_STOCK_BROKERS → 2 decimal places (currency precision)</li>
     *   <li>LEDGER_NULL → 18 decimal places (default)</li>
     *   <li>LEDGER_UNSPECIFIED → 0 decimal places (requires explicit ledger selection)</li>
     * </ul>
     *
     * <p><b>Example:</b>
     * <pre>{@code
     * Ledger ledger = Ledger.LEDGER_STELLAR;
     * int precision = LedgerUtils.ledgerGetPrecision(ledger);  // Returns: 7
     *
     * Ledger ethereum = Ledger.LEDGER_ETHEREUM;
     * int ethPrecision = LedgerUtils.ledgerGetPrecision(ethereum);  // Returns: 18
     * }</pre>
     */
    public static int ledgerGetPrecision(Ledger ledger) {
        if (ledger == null || ledger == Ledger.LEDGER_UNSPECIFIED) {
            return 0;
        }

        switch (ledger) {
            case LEDGER_STELLAR:
                return 7;
            case LEDGER_ETHEREUM:
                return 18;
            case LEDGER_BITCOIN:
            case LEDGER_LITECOIN:
                return 8;
            case LEDGER_XRP:
                return 6;
            case LEDGER_SA_STOCK_BROKERS:
                return 2;
            case LEDGER_NULL:
                return 18;
            default:
                return 0;
        }
    }

    /**
     * Validates that the given ledger is valid and defined.
     *
     * <p>This method checks if the ledger is a valid enum value and not LEDGER_UNSPECIFIED.
     * If validation fails, it throws an IllegalArgumentException with a descriptive message.
     *
     * @param ledger The ledger to validate. Can be null.
     * @return The validated ledger (same as input if validation succeeds).
     * @throws IllegalArgumentException if the ledger is null, invalid (UNRECOGNIZED), or LEDGER_UNSPECIFIED.
     *
     * <p><b>Validation Rules:</b>
     * <ul>
     *   <li>Must not be null</li>
     *   <li>Must be a valid enum value (not UNRECOGNIZED)</li>
     *   <li>Must not be LEDGER_UNSPECIFIED</li>
     * </ul>
     *
     * <p><b>Example:</b>
     * <pre>{@code
     * try {
     *     Ledger ledger = Ledger.LEDGER_STELLAR;
     *     LedgerUtils.ledgerValidate(ledger);  // Passes validation
     *     // Use the validated ledger
     * } catch (IllegalArgumentException e) {
     *     // Handle invalid ledger
     * }
     *
     * try {
     *     Ledger unspecified = Ledger.LEDGER_UNSPECIFIED;
     *     LedgerUtils.ledgerValidate(unspecified);  // Throws exception
     * } catch (IllegalArgumentException e) {
     *     System.out.println(e.getMessage());  // "Ledger must be specified and valid, got: LEDGER_UNSPECIFIED"
     * }
     * }</pre>
     */
    public static Ledger ledgerValidate(Ledger ledger) {
        if (ledger == null) {
            throw new IllegalArgumentException("Ledger cannot be null");
        }

        if (!ledgerIsValid(ledger)) {
            throw new IllegalArgumentException("Ledger is not a valid enum value: " + ledger);
        }

        if (ledger == Ledger.LEDGER_UNSPECIFIED) {
            throw new IllegalArgumentException("Ledger must be specified and valid, got: LEDGER_UNSPECIFIED");
        }

        return ledger;
    }
}
