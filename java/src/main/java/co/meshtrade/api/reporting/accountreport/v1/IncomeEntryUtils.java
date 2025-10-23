package co.meshtrade.api.reporting.accountreport.v1;

import co.meshtrade.api.reporting.account_report.v1.IncomeEntryOuterClass.IncomeNarrative;

/**
 * Utility methods for working with IncomeEntry protobuf messages.
 *
 * <p>This class provides helper methods for income narrative formatting.
 *
 * <p><b>Thread-safety:</b> All methods are thread-safe as they are stateless utility functions.
 *
 */
public final class IncomeEntryUtils {

    private IncomeEntryUtils() {
        throw new UnsupportedOperationException("Utility class - cannot be instantiated");
    }

    /**
     * Returns a human-readable string representation of an IncomeNarrative.
     *
     * <p>This method converts income narrative enum values into user-friendly display strings:
     * <ul>
     *   <li>YIELD → "Yield"</li>
     *   <li>DIVIDEND → "Dividend"</li>
     *   <li>INTEREST → "Interest"</li>
     *   <li>PRINCIPAL → "Principal"</li>
     *   <li>DISTRIBUTION → "Distribution"</li>
     *   <li>PROFIT_DISTRIBUTION → "Profit Distribution"</li>
     *   <li>UNSPECIFIED → "-"</li>
     *   <li>Others → "" (empty string)</li>
     * </ul>
     *
         *
     * @param narrative The income narrative enum value
     * @return Pretty string representation, or empty string for invalid/null inputs
     *
     * @example
     * <pre>{@code
     * String display = IncomeEntryUtils.incomeNarrativePrettyString(
     *     IncomeNarrative.INCOME_NARRATIVE_DIVIDEND
     * );
     * // Result: "Dividend"
     * }</pre>
     */
    public static String incomeNarrativePrettyString(IncomeNarrative narrative) {
        if (narrative == null) {
            return "";
        }

        return switch (narrative) {
            case INCOME_NARRATIVE_UNSPECIFIED -> "-";
            case INCOME_NARRATIVE_YIELD -> "Yield";
            case INCOME_NARRATIVE_DIVIDEND -> "Dividend";
            case INCOME_NARRATIVE_INTEREST -> "Interest";
            case INCOME_NARRATIVE_PRINCIPAL -> "Principal";
            case INCOME_NARRATIVE_DISTRIBUTION -> "Distribution";
            case INCOME_NARRATIVE_PROFIT_DISTRIBUTION -> "Profit Distribution";
            default -> "";
        };
    }
}
