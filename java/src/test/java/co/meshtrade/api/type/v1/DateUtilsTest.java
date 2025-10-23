package co.meshtrade.api.type.v1;

import static org.junit.jupiter.api.Assertions.*;

import co.meshtrade.api.type.v1.DateOuterClass.Date;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;

/**
 * Tests for DateUtils utility functions.
 *
 * <p>This test class verifies conversion, validation, and error handling for Date protobuf messages.
 */
class DateUtilsTest {

    @Test
    void newDate_validInputs_createsDate() {
        Date date = DateUtils.newDate(2024, 10, 23);
        assertNotNull(date);
        assertEquals(2024, date.getYear());
        assertEquals(10, date.getMonth());
        assertEquals(23, date.getDay());
    }

    @Test
    void newDate_invalidYear_throwsException() {
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(0, 10, 23));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(10000, 10, 23));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(-1, 10, 23));
    }

    @Test
    void newDate_invalidMonth_throwsException() {
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 0, 23));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 13, 23));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, -1, 23));
    }

    @Test
    void newDate_invalidDay_throwsException() {
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 10, 0));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 10, 32));
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 2, 30)); // Feb 30th invalid
    }

    @Test
    void newDate_invalidCalendarDate_throwsException() {
        // February 30th doesn't exist
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 2, 30));
        // April 31st doesn't exist
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2024, 4, 31));
        // Non-leap year February 29th
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDate(2023, 2, 29));
    }

    @Test
    void newDate_leapYearFebruary29_succeeds() {
        // 2024 is a leap year
        Date date = DateUtils.newDate(2024, 2, 29);
        assertNotNull(date);
        assertEquals(29, date.getDay());
    }

    @Test
    void newDateFromLocalDate_validInputs_createsDate() {
        LocalDate localDate = LocalDate.of(2024, 10, 23);
        Date date = DateUtils.newDateFromLocalDate(localDate);
        assertNotNull(date);
        assertEquals(2024, date.getYear());
        assertEquals(10, date.getMonth());
        assertEquals(23, date.getDay());
    }

    @Test
    void newDateFromLocalDate_nullInput_throwsException() {
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDateFromLocalDate(null));
    }

    @Test
    void newDateFromLocalDate_yearOutOfRange_throwsException() {
        LocalDate tooOld = LocalDate.of(0, 1, 1);
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDateFromLocalDate(tooOld));

        LocalDate tooNew = LocalDate.of(10000, 1, 1);
        assertThrows(IllegalArgumentException.class, () -> DateUtils.newDateFromLocalDate(tooNew));
    }

    @Test
    void dateToLocalDate_validDate_convertsCorrectly() {
        Date date = DateUtils.newDate(2024, 10, 23);
        LocalDate localDate = DateUtils.dateToLocalDate(date);
        assertNotNull(localDate);
        assertEquals(2024, localDate.getYear());
        assertEquals(10, localDate.getMonthValue());
        assertEquals(23, localDate.getDayOfMonth());
    }

    @Test
    void dateToLocalDate_nullInput_returnsNull() {
        assertNull(DateUtils.dateToLocalDate(null));
    }

    @Test
    void dateToLocalDate_invalidDate_throwsException() {
        // Create an invalid date using builder (bypassing validation)
        Date invalidDate = Date.newBuilder()
                .setYear(2024)
                .setMonth(13) // Invalid month
                .setDay(25)
                .build();
        assertThrows(IllegalArgumentException.class, () -> DateUtils.dateToLocalDate(invalidDate));
    }

    @Test
    void dateIsValid_validDate_returnsTrue() {
        Date date = DateUtils.newDate(2024, 10, 23);
        assertTrue(DateUtils.dateIsValid(date));
    }

    @Test
    void dateIsValid_nullDate_returnsFalse() {
        assertFalse(DateUtils.dateIsValid(null));
    }

    @Test
    void dateIsValid_invalidYear_returnsFalse() {
        Date invalidDate = Date.newBuilder().setYear(0).setMonth(10).setDay(23).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));

        invalidDate = Date.newBuilder().setYear(10000).setMonth(10).setDay(23).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));
    }

    @Test
    void dateIsValid_invalidMonth_returnsFalse() {
        Date invalidDate = Date.newBuilder().setYear(2024).setMonth(0).setDay(23).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));

        invalidDate = Date.newBuilder().setYear(2024).setMonth(13).setDay(23).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));
    }

    @Test
    void dateIsValid_invalidDay_returnsFalse() {
        Date invalidDate = Date.newBuilder().setYear(2024).setMonth(10).setDay(0).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));

        invalidDate = Date.newBuilder().setYear(2024).setMonth(10).setDay(32).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));

        // February 30th
        invalidDate = Date.newBuilder().setYear(2024).setMonth(2).setDay(30).build();
        assertFalse(DateUtils.dateIsValid(invalidDate));
    }

    @Test
    void dateIsComplete_completeDate_returnsTrue() {
        Date date = DateUtils.newDate(2024, 10, 23);
        assertTrue(DateUtils.dateIsComplete(date));
    }

    @Test
    void dateIsComplete_nullDate_returnsFalse() {
        assertFalse(DateUtils.dateIsComplete(null));
    }

    @Test
    void dateIsComplete_incompleteDate_returnsFalse() {
        Date incompleteDate = Date.newBuilder().setYear(2024).setMonth(0).setDay(0).build();
        assertFalse(DateUtils.dateIsComplete(incompleteDate));

        incompleteDate = Date.newBuilder().setYear(0).setMonth(10).setDay(23).build();
        assertFalse(DateUtils.dateIsComplete(incompleteDate));

        incompleteDate = Date.newBuilder().setYear(2024).setMonth(10).setDay(0).build();
        assertFalse(DateUtils.dateIsComplete(incompleteDate));
    }

    @Test
    void roundTripConversion_dateToLocalDateAndBack_preservesValues() {
        Date originalDate = DateUtils.newDate(2024, 10, 23);
        LocalDate localDate = DateUtils.dateToLocalDate(originalDate);
        Date convertedBack = DateUtils.newDateFromLocalDate(localDate);

        assertEquals(originalDate.getYear(), convertedBack.getYear());
        assertEquals(originalDate.getMonth(), convertedBack.getMonth());
        assertEquals(originalDate.getDay(), convertedBack.getDay());
    }

    @Test
    void edgeCases_boundaryYears_workCorrectly() {
        // Minimum valid year
        Date minYear = DateUtils.newDate(1, 1, 1);
        assertTrue(DateUtils.dateIsValid(minYear));

        // Maximum valid year
        Date maxYear = DateUtils.newDate(9999, 12, 31);
        assertTrue(DateUtils.dateIsValid(maxYear));
    }

    @Test
    void edgeCases_monthBoundaries_workCorrectly() {
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
