package co.meshtrade.api.type.v1;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;

import co.meshtrade.api.type.v1.DateOuterClass.Date;

/**
 * Tests for DateUtils utility functions.
 *
 * <p>This test class verifies conversion, validation, and error handling for Date protobuf messages.
 */
class DateUtilsTest {

    @Test
    void newDateValidInputsCreatesDate() {
        Date date = DateUtils.newDate(2024, 10, 23);
        assertNotNull(date);
        assertEquals(2024, date.getYear());
        assertEquals(10, date.getMonth());
        assertEquals(23, date.getDay());
    }

    @Test
    void newDateInvalidYearThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(0, 10, 23));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(10000, 10, 23));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(-1, 10, 23));
    }

    @Test
    void newDateInvalidMonthThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 0, 23));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 13, 23));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, -1, 23));
    }

    @Test
    void newDateInvalidDayThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 10, 0));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 10, 32));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 2, 30)); // Feb 30th invalid
    }

    @Test
    void newDateInvalidCalendarDateThrowsException() {
        // February 30th doesn't exist
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 2, 30));
        // April 31st doesn't exist
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 4, 31));
        // Non-leap year February 29th
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2023, 2, 29));
    }

    @Test
    void newDateLeapYearFebruary29Succeeds() {
        // 2024 is a leap year
        Date date = DateUtils.newDate(2024, 2, 29);
        assertNotNull(date);
        assertEquals(29, date.getDay());
    }

    @Test
    void newDateFromLocalDateValidInputsCreatesDate() {
        LocalDate localDate = LocalDate.of(2024, 10, 23);
        Date date = DateUtils.newDateFromLocalDate(localDate);
        assertNotNull(date);
        assertEquals(2024, date.getYear());
        assertEquals(10, date.getMonth());
        assertEquals(23, date.getDay());
    }

    @Test
    void newDateFromLocalDateNullInputThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDateFromLocalDate(null));
    }

    @Test
    void newDateFromLocalDateYearOutOfRangeThrowsException() {
        LocalDate tooOld = LocalDate.of(0, 1, 1);
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDateFromLocalDate(tooOld));

        LocalDate tooNew = LocalDate.of(10000, 1, 1);
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDateFromLocalDate(tooNew));
    }

    @Test
    void dateToLocalDateValidDateConvertsCorrectly() {
        Date date = DateUtils.newDate(2024, 10, 23);
        LocalDate localDate = DateUtils.dateToLocalDate(date);
        assertNotNull(localDate);
        assertEquals(2024, localDate.getYear());
        assertEquals(10, localDate.getMonthValue());
        assertEquals(23, localDate.getDayOfMonth());
    }

    @Test
    void dateToLocalDateNullInputReturnsNull() {
        assertNull(DateUtils.dateToLocalDate(null));
    }

    @Test
    void dateToLocalDateInvalidDateThrowsException() {
        // Create an invalid date using builder (bypassing validation)
        Date invalidDate = Date.newBuilder()
                .setYear(2024)
                .setMonth(13) // Invalid month
                .setDay(25)
                .build();
        assertThrows(IllegalArgumentException.class, () -> DateUtils.dateToLocalDate(invalidDate));
    }

    @Test
    void dateIsValidValidDateReturnsTrue() {
        Date date = DateUtils.newDate(2024, 10, 23);
        assertTrue(DateUtils.dateIsValid(date));
    }

    @Test
    void dateIsValidNullDateReturnsFalse() {
        assertFalse(DateUtils.dateIsValid(null));
    }

    @Test
    void dateIsValidInvalidYearReturnsFalse() {
        Date invalidDate = Date.newBuilder().setYear(0).setMonth(10).setDay(23).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));

        invalidDate = Date.newBuilder().setYear(10000).setMonth(10).setDay(23).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));
    }

    @Test
    void dateIsValidInvalidMonthReturnsFalse() {
        Date invalidDate = Date.newBuilder().setYear(2024).setMonth(0).setDay(23).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));

        invalidDate = Date.newBuilder().setYear(2024).setMonth(13).setDay(23).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));
    }

    @Test
    void dateIsValidInvalidDayReturnsFalse() {
        Date invalidDate = Date.newBuilder().setYear(2024).setMonth(10).setDay(0).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));

        invalidDate = Date.newBuilder().setYear(2024).setMonth(10).setDay(32).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));

        // February 30th
        invalidDate = Date.newBuilder().setYear(2024).setMonth(2).setDay(30).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));
    }

    @Test
    void dateIsCompleteCompleteDateReturnsTrue() {
        Date date = DateUtils.newDate(2024, 10, 23);
        assertTrue(DateUtils.dateIsComplete(date));
    }

    @Test
    void dateIsCompleteNullDateReturnsFalse() {
        assertFalse(DateUtils.dateIsComplete(null));
    }

    @Test
    void dateIsCompleteIncompleteDateReturnsFalse() {
        Date incompleteDate = Date.newBuilder().setYear(2024).setMonth(0).setDay(0).build();
        assertFalse(DateUtils.dateIsComplete(incompleteDate));

        incompleteDate = Date.newBuilder().setYear(0).setMonth(10).setDay(23).build();
        assertFalse(DateUtils.dateIsComplete(incompleteDate));

        incompleteDate = Date.newBuilder().setYear(2024).setMonth(10).setDay(0).build();
        assertFalse(DateUtils.dateIsComplete(incompleteDate));
    }

    @Test
    void roundTripConversionDateToLocalDateAndBackPreservesValues() {
        Date originalDate = DateUtils.newDate(2024, 10, 23);
        LocalDate localDate = DateUtils.dateToLocalDate(originalDate);
        Date convertedBack = DateUtils.newDateFromLocalDate(localDate);

        assertEquals(originalDate.getYear(), convertedBack.getYear());
        assertEquals(originalDate.getMonth(), convertedBack.getMonth());
        assertEquals(originalDate.getDay(), convertedBack.getDay());
    }

    @Test
    void edgeCasesBoundaryYearsWorkCorrectly() {
        // Minimum valid year
        Date minYear = DateUtils.newDate(1, 1, 1);
        assertTrue(DateUtils.dateIsValid(minYear));

        // Maximum valid year
        Date maxYear = DateUtils.newDate(9999, 12, 31);
        assertTrue(DateUtils.dateIsValid(maxYear));
    }

    @Test
    void edgeCasesMonthBoundariesWorkCorrectly() {
        // 31-day months
        assertDoesNotThrow(() -> DateUtils.newDate(2024, 1, 31));
        assertDoesNotThrow(() -> DateUtils.newDate(2024, 3, 31));
        assertDoesNotThrow(() -> DateUtils.newDate(2024, 5, 31));
        assertDoesNotThrow(() -> DateUtils.newDate(2024, 7, 31));
        assertDoesNotThrow(() -> DateUtils.newDate(2024, 8, 31));
        assertDoesNotThrow(() -> DateUtils.newDate(2024, 10, 31));
        assertDoesNotThrow(() -> DateUtils.newDate(2024, 12, 31));

        // 30-day months
        assertDoesNotThrow(() -> DateUtils.newDate(2024, 4, 30));
        assertDoesNotThrow(() -> DateUtils.newDate(2024, 6, 30));
        assertDoesNotThrow(() -> DateUtils.newDate(2024, 9, 30));
        assertDoesNotThrow(() -> DateUtils.newDate(2024, 11, 30));

        // 30-day months should reject day 31
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 4, 31));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 6, 31));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 9, 31));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 11, 31));
    }
}
