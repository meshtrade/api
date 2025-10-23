package co.meshtrade.api.type.v1;

import co.meshtrade.api.type.v1.LedgerOuterClass.Ledger;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test suite for LedgerUtils.
 */
class LedgerUtilsTest {

    @Test
    void testLedgerIsValid() {
        // Valid ledger values
        assertTrue(LedgerUtils.ledgerIsValid(Ledger.LEDGER_STELLAR));
        assertTrue(LedgerUtils.ledgerIsValid(Ledger.LEDGER_ETHEREUM));
        assertTrue(LedgerUtils.ledgerIsValid(Ledger.LEDGER_BITCOIN));
        assertTrue(LedgerUtils.ledgerIsValid(Ledger.LEDGER_UNSPECIFIED));  // UNSPECIFIED is valid

        // Null is invalid
        assertFalse(LedgerUtils.ledgerIsValid(null));

        // UNRECOGNIZED is invalid
        assertFalse(LedgerUtils.ledgerIsValid(Ledger.UNRECOGNIZED));
    }

    @Test
    void testLedgerIsValidAndDefined() {
        // Valid and defined ledgers
        assertTrue(LedgerUtils.ledgerIsValidAndDefined(Ledger.LEDGER_STELLAR));
        assertTrue(LedgerUtils.ledgerIsValidAndDefined(Ledger.LEDGER_ETHEREUM));
        assertTrue(LedgerUtils.ledgerIsValidAndDefined(Ledger.LEDGER_BITCOIN));
        assertTrue(LedgerUtils.ledgerIsValidAndDefined(Ledger.LEDGER_XRP));
        assertTrue(LedgerUtils.ledgerIsValidAndDefined(Ledger.LEDGER_SA_STOCK_BROKERS));

        // UNSPECIFIED is valid but not defined
        assertFalse(LedgerUtils.ledgerIsValidAndDefined(Ledger.LEDGER_UNSPECIFIED));

        // Null is invalid and not defined
        assertFalse(LedgerUtils.ledgerIsValidAndDefined(null));

        // UNRECOGNIZED is invalid and not defined
        assertFalse(LedgerUtils.ledgerIsValidAndDefined(Ledger.UNRECOGNIZED));
    }

    @Test
    void testLedgerToPrettyString() {
        // Test all supported ledgers
        assertEquals("Stellar", LedgerUtils.ledgerToPrettyString(Ledger.LEDGER_STELLAR));
        assertEquals("Ethereum", LedgerUtils.ledgerToPrettyString(Ledger.LEDGER_ETHEREUM));
        assertEquals("Bitcoin", LedgerUtils.ledgerToPrettyString(Ledger.LEDGER_BITCOIN));
        assertEquals("Litecoin", LedgerUtils.ledgerToPrettyString(Ledger.LEDGER_LITECOIN));
        assertEquals("XRP", LedgerUtils.ledgerToPrettyString(Ledger.LEDGER_XRP));
        assertEquals("SA Stock Brokers", LedgerUtils.ledgerToPrettyString(Ledger.LEDGER_SA_STOCK_BROKERS));
        assertEquals("Null", LedgerUtils.ledgerToPrettyString(Ledger.LEDGER_NULL));
        assertEquals("Unspecified", LedgerUtils.ledgerToPrettyString(Ledger.LEDGER_UNSPECIFIED));

        // Test edge cases
        assertEquals("Unknown", LedgerUtils.ledgerToPrettyString(null));
        assertEquals("Unknown", LedgerUtils.ledgerToPrettyString(Ledger.UNRECOGNIZED));
    }

    @Test
    void testLedgerGetPrecision() {
        // Test precision for all ledgers
        assertEquals(7, LedgerUtils.ledgerGetPrecision(Ledger.LEDGER_STELLAR));
        assertEquals(18, LedgerUtils.ledgerGetPrecision(Ledger.LEDGER_ETHEREUM));
        assertEquals(8, LedgerUtils.ledgerGetPrecision(Ledger.LEDGER_BITCOIN));
        assertEquals(8, LedgerUtils.ledgerGetPrecision(Ledger.LEDGER_LITECOIN));
        assertEquals(6, LedgerUtils.ledgerGetPrecision(Ledger.LEDGER_XRP));
        assertEquals(2, LedgerUtils.ledgerGetPrecision(Ledger.LEDGER_SA_STOCK_BROKERS));
        assertEquals(18, LedgerUtils.ledgerGetPrecision(Ledger.LEDGER_NULL));

        // UNSPECIFIED returns 0
        assertEquals(0, LedgerUtils.ledgerGetPrecision(Ledger.LEDGER_UNSPECIFIED));

        // Null returns 0
        assertEquals(0, LedgerUtils.ledgerGetPrecision(null));

        // UNRECOGNIZED returns 0
        assertEquals(0, LedgerUtils.ledgerGetPrecision(Ledger.UNRECOGNIZED));
    }

    @Test
    void testLedgerValidate_Success() {
        // Valid and defined ledgers should pass validation
        assertEquals(Ledger.LEDGER_STELLAR, LedgerUtils.ledgerValidate(Ledger.LEDGER_STELLAR));
        assertEquals(Ledger.LEDGER_ETHEREUM, LedgerUtils.ledgerValidate(Ledger.LEDGER_ETHEREUM));
        assertEquals(Ledger.LEDGER_BITCOIN, LedgerUtils.ledgerValidate(Ledger.LEDGER_BITCOIN));
    }

    @Test
    void testLedgerValidate_NullThrowsException() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> LedgerUtils.ledgerValidate(null)
        );
        assertEquals("Ledger cannot be null", exception.getMessage());
    }

    @Test
    void testLedgerValidate_UnspecifiedThrowsException() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> LedgerUtils.ledgerValidate(Ledger.LEDGER_UNSPECIFIED)
        );
        assertEquals("Ledger must be specified and valid, got: LEDGER_UNSPECIFIED", exception.getMessage());
    }

    @Test
    void testLedgerValidate_UnrecognizedThrowsException() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> LedgerUtils.ledgerValidate(Ledger.UNRECOGNIZED)
        );
        assertTrue(exception.getMessage().contains("Ledger is not a valid enum value"));
    }
}
