package co.meshtrade.api.type.v1;

import co.meshtrade.api.type.v1.DateOuterClass.Date;
import co.meshtrade.api.type.v1.TimeOfDayOuterClass.TimeOfDay;
import java.time.Duration;
import java.time.LocalTime;

/**
 * Utility functions for working with protobuf TimeOfDay messages.
 * <p>This class provides conversion and validation utilities for the TimeOfDay protobuf type,
 * enabling interoperability with Java's LocalTime and Duration types.
 * <p><b>Design Philosophy:</b>
 * TimeOfDay represents a time of day (00:00:00.000000000 to 23:59:59.999999999) with nanosecond precision.
 * All validation follows strict protobuf constraints for hours (0-23), minutes (0-59),
 * seconds (0-59), and nanoseconds (0-999999999).
 * <p><b>Thread Safety:</b> All methods are static and thread-safe.
 * @see co.meshtrade.api.type.v1.TimeOfDayOuterClass.TimeOfDay
 */
public final class TimeOfDayUtils {

    /** Nanoseconds in one second. */
    private static final double NANOS_PER_SECOND = 1_000_000_000.0;

    private TimeOfDayUtils() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * Creates a new TimeOfDay from hours, minutes, seconds, and nanos values.
     * Validates the input values according to the TimeOfDay message constraints.
     *
     * <p>Valid ranges:
     * <ul>
     *   <li>Hours: 0-23</li>
     *   <li>Minutes: 0-59</li>
     *   <li>Seconds: 0-59</li>
     *   <li>Nanos: 0-999,999,999</li>
     * </ul>
     *
     * @param hours   the hours (0-23)
     * @param minutes the minutes (0-59)
     * @param seconds the seconds (0-59)
     * @param nanos   the nanoseconds (0-999,999,999)
     * @return a new TimeOfDay instance
     * @throws IllegalArgumentException if any value is out of range
     */
    public static TimeOfDay newTimeOfDay(int hours, int minutes, int seconds, int nanos) {
        validateTimeOfDayComponents(hours, minutes, seconds, nanos);
        return TimeOfDay.newBuilder()
                .setHours(hours)
                .setMinutes(minutes)
                .setSeconds(seconds)
                .setNanos(nanos)
                .build();
    }

    /**
     * Creates a TimeOfDay from a Java LocalTime.
     * Only extracts the time components, ignoring any date information.
     *
     * @param localTime the LocalTime to convert
     * @return a new TimeOfDay instance
     * @throws IllegalArgumentException if localTime is null
     */
    public static TimeOfDay newTimeOfDayFromLocalTime(LocalTime localTime) {
        if (localTime == null) {
            throw new IllegalArgumentException("LocalTime cannot be null");
        }

        return TimeOfDay.newBuilder()
                .setHours(localTime.getHour())
                .setMinutes(localTime.getMinute())
                .setSeconds(localTime.getSecond())
                .setNanos(localTime.getNano())
                .build();
    }

    /**
     * Converts a TimeOfDay to a Java LocalTime.
     *
     * @param time the TimeOfDay to convert
     * @return a LocalTime instance, or null if time is null
     * @throws IllegalArgumentException if the time is invalid
     */
    public static LocalTime timeOfDayToLocalTime(TimeOfDay time) {
        if (time == null) {
            return null;
        }
        if (!timeOfDayIsValid(time)) {
            throw new IllegalArgumentException("TimeOfDay is invalid");
        }
        return LocalTime.of(time.getHours(), time.getMinutes(), time.getSeconds(), time.getNanos());
    }

    /**
     * Creates a TimeOfDay from a Duration representing time since midnight.
     * The duration must be non-negative and less than 24 hours.
     *
     * @param duration the duration since midnight
     * @return a new TimeOfDay instance
     * @throws IllegalArgumentException if duration is null, negative, or >= 24 hours
     */
    public static TimeOfDay timeOfDayFromDuration(Duration duration) {
        if (duration == null) {
            throw new IllegalArgumentException("Duration cannot be null");
        }
        if (duration.isNegative()) {
            throw new IllegalArgumentException(
                    String.format("Duration cannot be negative: %s", duration)
            );
        }
        if (duration.compareTo(Duration.ofHours(24)) >= 0) {
            throw new IllegalArgumentException(
                    String.format("Duration cannot be 24 hours or more: %s", duration)
            );
        }

        long totalSeconds = duration.getSeconds();
        int nanos = duration.getNano();

        int hours = (int) (totalSeconds / 3600);
        totalSeconds -= hours * 3600;

        int minutes = (int) (totalSeconds / 60);
        totalSeconds -= minutes * 60;

        int seconds = (int) totalSeconds;

        return newTimeOfDay(hours, minutes, seconds, nanos);
    }

    /**
     * Converts a TimeOfDay to a Duration representing time since midnight.
     *
     * @param time the TimeOfDay to convert
     * @return a Duration instance, or Duration.ZERO if time is null
     */
    public static Duration timeOfDayToDuration(TimeOfDay time) {
        if (time == null) {
            return Duration.ZERO;
        }
        return Duration.ofHours(time.getHours())
                .plusMinutes(time.getMinutes())
                .plusSeconds(time.getSeconds())
                .plusNanos(time.getNanos());
    }

    /**
     * Combines a TimeOfDay with a given Date to create a formatted ISO 8601 timestamp string.
     *
     * <p>Note: This method returns a string representation combining the date and time.
     * For full instant creation with timezone, use timeOfDayToDuration() and date conversion separately.
     *
     * @param time the TimeOfDay to combine
     * @param date the Date to combine with
     * @return an ISO 8601 formatted string (YYYY-MM-DDTHH:MM:SS.nnnnnnnnnZ)
     * @throws IllegalArgumentException if time is null, date is null, or date is incomplete
     */
    public static String timeOfDayToStringWithDate(TimeOfDay time, Date date) {
        if (time == null) {
            throw new IllegalArgumentException("TimeOfDay cannot be null");
        }
        if (date == null || !DateUtils.dateIsComplete(date)) {
            throw new IllegalArgumentException("Date must be complete");
        }

        // Format: YYYY-MM-DDTHH:MM:SS.nnnnnnnnnZ
        return String.format("%04d-%02d-%02dT%02d:%02d:%02d.%09dZ",
                date.getYear(), date.getMonth(), date.getDay(),
                time.getHours(), time.getMinutes(), time.getSeconds(), time.getNanos());
    }

    /**
     * Checks if a TimeOfDay has valid values according to the protobuf constraints.
     *
     * <p>A time is valid if:
     * <ul>
     *   <li>It is not null</li>
     *   <li>Hours is between 0 and 23</li>
     *   <li>Minutes is between 0 and 59</li>
     *   <li>Seconds is between 0 and 59</li>
     *   <li>Nanos is between 0 and 999,999,999</li>
     * </ul>
     *
     * @param time the TimeOfDay to validate
     * @return true if the time is valid, false otherwise
     */
    public static boolean timeOfDayIsValid(TimeOfDay time) {
        if (time == null) {
            return false;
        }
        try {
            validateTimeOfDayComponents(time.getHours(), time.getMinutes(), time.getSeconds(), time.getNanos());
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * Checks if a TimeOfDay represents midnight (00:00:00.000000000).
     *
     * @param time the TimeOfDay to check
     * @return true if the time is midnight, false otherwise (including null)
     */
    public static boolean timeOfDayIsMidnight(TimeOfDay time) {
        if (time == null) {
            return false;
        }
        return time.getHours() == 0
                && time.getMinutes() == 0
                && time.getSeconds() == 0
                && time.getNanos() == 0;
    }

    /**
     * Returns the total number of seconds since midnight as a double.
     * Includes fractional seconds from nanoseconds.
     *
     * @param time the TimeOfDay to convert
     * @return the total seconds since midnight, or 0.0 if time is null
     */
    public static double timeOfDayTotalSeconds(TimeOfDay time) {
        if (time == null) {
            return 0.0;
        }
        return time.getHours() * 3600.0
                + time.getMinutes() * 60.0
                + time.getSeconds()
                + time.getNanos() / NANOS_PER_SECOND;
    }

    /**
     * Validates the hours, minutes, seconds, and nanos values according to TimeOfDay constraints.
     *
     * @param hours   the hours to validate
     * @param minutes the minutes to validate
     * @param seconds the seconds to validate
     * @param nanos   the nanoseconds to validate
     * @throws IllegalArgumentException if any value is out of range
     */
    private static void validateTimeOfDayComponents(int hours, int minutes, int seconds, int nanos) {
        // Hours validation
        if (hours < 0 || hours > 23) {
            throw new IllegalArgumentException(
                    String.format("Hours must be between 0 and 23, got %d", hours)
            );
        }

        // Minutes validation
        if (minutes < 0 || minutes > 59) {
            throw new IllegalArgumentException(
                    String.format("Minutes must be between 0 and 59, got %d", minutes)
            );
        }

        // Seconds validation
        if (seconds < 0 || seconds > 59) {
            throw new IllegalArgumentException(
                    String.format("Seconds must be between 0 and 59, got %d", seconds)
            );
        }

        // Nanos validation
        if (nanos < 0 || nanos > 999_999_999) {
            throw new IllegalArgumentException(
                    String.format("Nanos must be between 0 and 999,999,999, got %d", nanos)
            );
        }
    }
}
