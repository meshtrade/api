package co.meshtrade.api.type.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Duration;
import java.time.LocalTime;

import org.junit.jupiter.api.Test;

import co.meshtrade.api.type.v1.DateOuterClass.Date;
import co.meshtrade.api.type.v1.TimeOfDayOuterClass.TimeOfDay;

/**
 * Tests for TimeOfDayUtils utility functions.
 *
 * <p>This test class verifies conversion, validation, and error handling for TimeOfDay protobuf messages.
 */
class TimeOfDayUtilsTest {

    @Test
    void newTimeOfDayValidInputsCreatesTime() {
        TimeOfDay time = TimeOfDayUtils.newTimeOfDay(14, 30, 45, 123456789);
        assertNotNull(time);
        assertEquals(14, time.getHours());
        assertEquals(30, time.getMinutes());
        assertEquals(45, time.getSeconds());
        assertEquals(123456789, time.getNanos());
    }

    @Test
    void newTimeOfDayInvalidHoursThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.newTimeOfDay(-1, 30, 45, 0));
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.newTimeOfDay(24, 30, 45, 0));
    }

    @Test
    void newTimeOfDayInvalidMinutesThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.newTimeOfDay(14, -1, 45, 0));
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.newTimeOfDay(14, 60, 45, 0));
    }

    @Test
    void newTimeOfDayInvalidSecondsThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.newTimeOfDay(14, 30, -1, 0));
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.newTimeOfDay(14, 30, 60, 0));
    }

    @Test
    void newTimeOfDayInvalidNanosThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.newTimeOfDay(14, 30, 45, -1));
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.newTimeOfDay(14, 30, 45, 1_000_000_000));
    }

    @Test
    void newTimeOfDayMidnightCreatesTime() {
        TimeOfDay midnight = TimeOfDayUtils.newTimeOfDay(0, 0, 0, 0);
        assertNotNull(midnight);
        assertEquals(0, midnight.getHours());
        assertEquals(0, midnight.getMinutes());
        assertEquals(0, midnight.getSeconds());
        assertEquals(0, midnight.getNanos());
    }

    @Test
    void newTimeOfDayEndOfDayCreatesTime() {
        TimeOfDay endOfDay = TimeOfDayUtils.newTimeOfDay(23, 59, 59, 999_999_999);
        assertNotNull(endOfDay);
        assertEquals(23, endOfDay.getHours());
        assertEquals(59, endOfDay.getMinutes());
        assertEquals(59, endOfDay.getSeconds());
        assertEquals(999_999_999, endOfDay.getNanos());
    }

    @Test
    void newTimeOfDayFromLocalTimeValidInputCreatesTime() {
        LocalTime localTime = LocalTime.of(14, 30, 45, 123456789);
        TimeOfDay time = TimeOfDayUtils.newTimeOfDayFromLocalTime(localTime);
        assertNotNull(time);
        assertEquals(14, time.getHours());
        assertEquals(30, time.getMinutes());
        assertEquals(45, time.getSeconds());
        assertEquals(123456789, time.getNanos());
    }

    @Test
    void newTimeOfDayFromLocalTimeNullInputThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.newTimeOfDayFromLocalTime(null));
    }

    @Test
    void timeOfDayToLocalTimeValidTimeConvertsCorrectly() {
        TimeOfDay time = TimeOfDayUtils.newTimeOfDay(14, 30, 45, 123456789);
        LocalTime localTime = TimeOfDayUtils.timeOfDayToLocalTime(time);
        assertNotNull(localTime);
        assertEquals(14, localTime.getHour());
        assertEquals(30, localTime.getMinute());
        assertEquals(45, localTime.getSecond());
        assertEquals(123456789, localTime.getNano());
    }

    @Test
    void timeOfDayToLocalTimeNullInputReturnsNull() {
        assertNull(TimeOfDayUtils.timeOfDayToLocalTime(null));
    }

    @Test
    void timeOfDayToLocalTimeInvalidTimeThrowsException() {
        TimeOfDay invalidTime = TimeOfDay.newBuilder()
                .setHours(25) // Invalid hour
                .setMinutes(30)
                .setSeconds(45)
                .setNanos(0)
                .build();
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.timeOfDayToLocalTime(invalidTime));
    }

    @Test
    void timeOfDayFromDurationValidDurationCreatesTime() {
        Duration duration = Duration.ofHours(14).plusMinutes(30).plusSeconds(45).plusNanos(123456789);
        TimeOfDay time = TimeOfDayUtils.timeOfDayFromDuration(duration);
        assertNotNull(time);
        assertEquals(14, time.getHours());
        assertEquals(30, time.getMinutes());
        assertEquals(45, time.getSeconds());
        assertEquals(123456789, time.getNanos());
    }

    @Test
    void timeOfDayFromDurationNullDurationThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.timeOfDayFromDuration(null));
    }

    @Test
    void timeOfDayFromDurationNegativeDurationThrowsException() {
        Duration negative = Duration.ofHours(-1);
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.timeOfDayFromDuration(negative));
    }

    @Test
    void timeOfDayFromDurationDurationTooLargeThrowsException() {
        Duration tooLarge = Duration.ofHours(24);
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.timeOfDayFromDuration(tooLarge));

        Duration wayTooLarge = Duration.ofHours(25);
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.timeOfDayFromDuration(wayTooLarge));
    }

    @Test
    void timeOfDayToDurationValidTimeConvertsToDuration() {
        TimeOfDay time = TimeOfDayUtils.newTimeOfDay(14, 30, 45, 123456789);
        Duration duration = TimeOfDayUtils.timeOfDayToDuration(time);
        assertNotNull(duration);

        long expectedSeconds = 14 * 3600 + 30 * 60 + 45;
        assertEquals(expectedSeconds, duration.getSeconds());
        assertEquals(123456789, duration.getNano());
    }

    @Test
    void timeOfDayToDurationNullInputReturnsZero() {
        Duration duration = TimeOfDayUtils.timeOfDayToDuration(null);
        assertEquals(Duration.ZERO, duration);
    }

    @Test
    void timeOfDayToDurationMidnightReturnsZero() {
        TimeOfDay midnight = TimeOfDayUtils.newTimeOfDay(0, 0, 0, 0);
        Duration duration = TimeOfDayUtils.timeOfDayToDuration(midnight);
        assertEquals(Duration.ZERO, duration);
    }

    @Test
    void timeOfDayToStringWithDateValidInputsFormatsCorrectly() {
        TimeOfDay time = TimeOfDayUtils.newTimeOfDay(14, 30, 45, 123456789);
        Date date = DateUtils.newDate(2024, 10, 23);
        String result = TimeOfDayUtils.timeOfDayToStringWithDate(time, date);
        assertEquals("2024-10-23T14:30:45.123456789Z", result);
    }

    @Test
    void timeOfDayToStringWithDateNullTimeThrowsException() {
        Date date = DateUtils.newDate(2024, 10, 23);
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.timeOfDayToStringWithDate(null, date));
    }

    @Test
    void timeOfDayToStringWithDateNullDateThrowsException() {
        TimeOfDay time = TimeOfDayUtils.newTimeOfDay(14, 30, 45, 0);
        assertThrows(IllegalArgumentException.class, () -> TimeOfDayUtils.timeOfDayToStringWithDate(time, null));
    }

    @Test
    void timeOfDayToStringWithDateIncompleteDateThrowsException() {
        TimeOfDay time = TimeOfDayUtils.newTimeOfDay(14, 30, 45, 0);
        Date incompleteDate = Date.newBuilder().setYear(2024).setMonth(0).setDay(0).build();
        assertThrows(IllegalArgumentException.class,
                () -> TimeOfDayUtils.timeOfDayToStringWithDate(time, incompleteDate));
    }

    @Test
    void timeOfDayIsValidValidTimeReturnsTrue() {
        TimeOfDay time = TimeOfDayUtils.newTimeOfDay(14, 30, 45, 123456789);
        assertTrue(TimeOfDayUtils.timeOfDayIsValid(time));
    }

    @Test
    void timeOfDayIsValidNullTimeReturnsFalse() {
        assertFalse(TimeOfDayUtils.timeOfDayIsValid(null));
    }

    @Test
    void timeOfDayIsValidInvalidHoursReturnsFalse() {
        TimeOfDay invalidTime = TimeOfDay.newBuilder().setHours(25).setMinutes(30).setSeconds(45).setNanos(0).build();
        assertFalse(TimeOfDayUtils.timeOfDayIsValid(invalidTime));
    }

    @Test
    void timeOfDayIsValidInvalidMinutesReturnsFalse() {
        TimeOfDay invalidTime = TimeOfDay.newBuilder().setHours(14).setMinutes(60).setSeconds(45).setNanos(0).build();
        assertFalse(TimeOfDayUtils.timeOfDayIsValid(invalidTime));
    }

    @Test
    void timeOfDayIsValidInvalidSecondsReturnsFalse() {
        TimeOfDay invalidTime = TimeOfDay.newBuilder().setHours(14).setMinutes(30).setSeconds(60).setNanos(0).build();
        assertFalse(TimeOfDayUtils.timeOfDayIsValid(invalidTime));
    }

    @Test
    void timeOfDayIsValidInvalidNanosReturnsFalse() {
        TimeOfDay invalidTime = TimeOfDay.newBuilder()
                .setHours(14)
                .setMinutes(30)
                .setSeconds(45)
                .setNanos(1_000_000_000)
                .build();
        assertFalse(TimeOfDayUtils.timeOfDayIsValid(invalidTime));
    }

    @Test
    void timeOfDayIsMidnightMidnightReturnsTrue() {
        TimeOfDay midnight = TimeOfDayUtils.newTimeOfDay(0, 0, 0, 0);
        assertTrue(TimeOfDayUtils.timeOfDayIsMidnight(midnight));
    }

    @Test
    void timeOfDayIsMidnightNotMidnightReturnsFalse() {
        TimeOfDay notMidnight = TimeOfDayUtils.newTimeOfDay(0, 0, 0, 1);
        assertFalse(TimeOfDayUtils.timeOfDayIsMidnight(notMidnight));

        notMidnight = TimeOfDayUtils.newTimeOfDay(0, 0, 1, 0);
        assertFalse(TimeOfDayUtils.timeOfDayIsMidnight(notMidnight));

        notMidnight = TimeOfDayUtils.newTimeOfDay(0, 1, 0, 0);
        assertFalse(TimeOfDayUtils.timeOfDayIsMidnight(notMidnight));

        notMidnight = TimeOfDayUtils.newTimeOfDay(1, 0, 0, 0);
        assertFalse(TimeOfDayUtils.timeOfDayIsMidnight(notMidnight));
    }

    @Test
    void timeOfDayIsMidnightNullTimeReturnsFalse() {
        assertFalse(TimeOfDayUtils.timeOfDayIsMidnight(null));
    }

    @Test
    void timeOfDayTotalSecondsValidTimeCalculatesCorrectly() {
        TimeOfDay time = TimeOfDayUtils.newTimeOfDay(1, 2, 3, 500_000_000); // 1h 2m 3.5s
        double totalSeconds = TimeOfDayUtils.timeOfDayTotalSeconds(time);
        double expected = 1 * 3600 + 2 * 60 + 3 + 0.5;
        assertEquals(expected, totalSeconds, 0.000000001);
    }

    @Test
    void timeOfDayTotalSecondsMidnightReturnsZero() {
        TimeOfDay midnight = TimeOfDayUtils.newTimeOfDay(0, 0, 0, 0);
        assertEquals(0.0, TimeOfDayUtils.timeOfDayTotalSeconds(midnight), 0.000000001);
    }

    @Test
    void timeOfDayTotalSecondsNullTimeReturnsZero() {
        assertEquals(0.0, TimeOfDayUtils.timeOfDayTotalSeconds(null), 0.000000001);
    }

    @Test
    void roundTripConversionTimeOfDayToLocalTimeAndBackPreservesValues() {
        TimeOfDay original = TimeOfDayUtils.newTimeOfDay(14, 30, 45, 123456789);
        LocalTime localTime = TimeOfDayUtils.timeOfDayToLocalTime(original);
        TimeOfDay convertedBack = TimeOfDayUtils.newTimeOfDayFromLocalTime(localTime);

        assertEquals(original.getHours(), convertedBack.getHours());
        assertEquals(original.getMinutes(), convertedBack.getMinutes());
        assertEquals(original.getSeconds(), convertedBack.getSeconds());
        assertEquals(original.getNanos(), convertedBack.getNanos());
    }

    @Test
    void roundTripConversionTimeOfDayToDurationAndBackPreservesValues() {
        TimeOfDay original = TimeOfDayUtils.newTimeOfDay(14, 30, 45, 123456789);
        Duration duration = TimeOfDayUtils.timeOfDayToDuration(original);
        TimeOfDay convertedBack = TimeOfDayUtils.timeOfDayFromDuration(duration);

        assertEquals(original.getHours(), convertedBack.getHours());
        assertEquals(original.getMinutes(), convertedBack.getMinutes());
        assertEquals(original.getSeconds(), convertedBack.getSeconds());
        assertEquals(original.getNanos(), convertedBack.getNanos());
    }

    @Test
    void edgeCasesNanosecondPrecisionHandledCorrectly() {
        // Test maximum nanoseconds
        TimeOfDay maxNanos = TimeOfDayUtils.newTimeOfDay(0, 0, 0, 999_999_999);
        assertTrue(TimeOfDayUtils.timeOfDayIsValid(maxNanos));
        assertEquals(999_999_999, maxNanos.getNanos());

        // Test zero nanoseconds
        TimeOfDay zeroNanos = TimeOfDayUtils.newTimeOfDay(0, 0, 0, 0);
        assertTrue(TimeOfDayUtils.timeOfDayIsValid(zeroNanos));
        assertEquals(0, zeroNanos.getNanos());
    }

    @Test
    void edgeCasesAlmostMidnightWorkCorrectly() {
        // 23:59:59.999999999
        TimeOfDay almostMidnight = TimeOfDayUtils.newTimeOfDay(23, 59, 59, 999_999_999);
        assertTrue(TimeOfDayUtils.timeOfDayIsValid(almostMidnight));
        assertFalse(TimeOfDayUtils.timeOfDayIsMidnight(almostMidnight));

        Duration duration = TimeOfDayUtils.timeOfDayToDuration(almostMidnight);
        assertTrue(duration.compareTo(Duration.ofHours(24)) < 0);
    }
}
