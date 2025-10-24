package co.meshtrade.api.reporting.accountreport.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import co.meshtrade.api.reporting.account_report.v1.IncomeEntryOuterClass.IncomeNarrative;

/**
 * Comprehensive tests for IncomeEntryUtils utility methods.
 */
class IncomeEntryUtilsTest {

    @Test
    void incomeNarrativePrettyStringYieldReturnsYield() {
        assertEquals("Yield", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_YIELD
        ));
    }

    @Test
    void incomeNarrativePrettyStringDividendReturnsDividend() {
        assertEquals("Dividend", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_DIVIDEND
        ));
    }

    @Test
    void incomeNarrativePrettyStringInterestReturnsInterest() {
        assertEquals("Interest", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_INTEREST
        ));
    }

    @Test
    void incomeNarrativePrettyStringPrincipalReturnsPrincipal() {
        assertEquals("Principal", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_PRINCIPAL
        ));
    }

    @Test
    void incomeNarrativePrettyStringDistributionReturnsDistribution() {
        assertEquals("Distribution", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_DISTRIBUTION
        ));
    }

    @Test
    void incomeNarrativePrettyStringProfitDistributionReturnsProfitDistribution() {
        assertEquals("Profit Distribution", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_PROFIT_DISTRIBUTION
        ));
    }

    @Test
    void incomeNarrativePrettyStringUnspecifiedReturnsDash() {
        assertEquals("-", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.INCOME_NARRATIVE_UNSPECIFIED
        ));
    }

    @Test
    void incomeNarrativePrettyStringUnrecognizedReturnsEmptyString() {
        assertEquals("", IncomeEntryUtils.incomeNarrativePrettyString(
            IncomeNarrative.UNRECOGNIZED
        ));
    }

    @Test
    void incomeNarrativePrettyStringNullReturnsEmptyString() {
        assertEquals("", IncomeEntryUtils.incomeNarrativePrettyString(null));
    }

    // Test all enum values are handled
    @Test
    void incomeNarrativePrettyStringAllEnumValuesHandleCorrectly() {
        for (IncomeNarrative narrative : IncomeNarrative.values()) {
            String result = IncomeEntryUtils.incomeNarrativePrettyString(narrative);
            assertNotNull(result, "Pretty string should never be null for: " + narrative);
        }
    }
}
