package co.meshtrade.api.reporting.accountreport.v1;

import co.meshtrade.api.reporting.account_report.v1.IncomeEntryOuterClass.IncomeNarrative;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Comprehensive tests for IncomeEntryUtils utility methods.
 */
class IncomeEntryUtilsTest {

    @Test
    void incomeNarrativePrettyString_yield_returnsYield() {
        assertEquals("Yield", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_YIELD
        ));
    }

    @Test
    void incomeNarrativePrettyString_dividend_returnsDividend() {
        assertEquals("Dividend", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_DIVIDEND
        ));
    }

    @Test
    void incomeNarrativePrettyString_interest_returnsInterest() {
        assertEquals("Interest", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_INTEREST
        ));
    }

    @Test
    void incomeNarrativePrettyString_principal_returnsPrincipal() {
        assertEquals("Principal", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_PRINCIPAL
        ));
    }

    @Test
    void incomeNarrativePrettyString_distribution_returnsDistribution() {
        assertEquals("Distribution", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_DISTRIBUTION
        ));
    }

    @Test
    void incomeNarrativePrettyString_profitDistribution_returnsProfitDistribution() {
        assertEquals("Profit Distribution", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_PROFIT_DISTRIBUTION
        ));
    }

    @Test
    void incomeNarrativePrettyString_unspecified_returnsDash() {
        assertEquals("-", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_UNSPECIFIED
        ));
    }

    @Test
    void incomeNarrativePrettyString_unrecognized_returnsEmptyString() {
        assertEquals("", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.UNRECOGNIZED
        ));
    }

    @Test
    void incomeNarrativePrettyString_null_returnsEmptyString() {
        assertEquals("", IncomeEntryUtils.incomeNarrativePrettyString(null));
    }

    // Test all enum values are handled
    @Test
    void incomeNarrativePrettyString_allEnumValues_handleCorrectly() {
        for (IncomeNarrative narrative : IncomeNarrative.values()) {
            String result = IncomeEntryUtils.incomeNarrativePrettyString(narrative);
            assertNotNull(result, "Pretty string should never be null for: " + narrative);
        }
    }
}
