package co.meshtrade.api.type.v1;

import co.meshtrade.api.type.v1.DateOuterClass.Date;
import java.time.LocalDate;

/**
 * Utility functions for working with protobuf Date messages.
 * <p>This class provides conversion and validation utilities for the Date protobuf type,
 * enabling interoperability with Java's LocalDate and validation according to protobuf constraints.
 * <p><b>Design Philosophy:</b>
 * Date operations follow strict validation rules - only complete dates (non-zero year, month, day)
 * are considered valid. This aligns with the protobuf constraints and ensures data integrity.
 * <p><b>Thread Safety:</b> All methods are static and thread-safe.
 * @see co.meshtrade.api.type.v1.DateOuterClass.Date
 */
public final class DateUtils {

    private DateUtils() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * Creates a new Date from year, month, and day values.
     * Validates the input values according to the Date message constraints.
     *
     * <p>Valid ranges:
     * <ul>
     *   <li>Year: 1-9999 (must be non-zero)</li>
     *   <li>Month: 1-12 (must be non-zero)</li>
     *   <li>Day: 1-31 (must be non-zero and valid for the given month/year)</li>
     * </ul>
     *
     * @param year  the year (1-9999)
     * @param month the month (1-12)
     * @param day   the day (1-31)
     * @return a new Date instance
     * @throws IllegalArgumentException if any value is invalid or the date is not a valid calendar date
     */
    public static Date newDate(int year, int month, int day) {
        validateDateComponents(year, month, day);
        return Date.newBuilder()
                .setYear(year)
                .setMonth(month)
                .setDay(day)
                .build();
    }

    /**
     * Creates a Date from a Java LocalDate.
     *
     * @param localDate the LocalDate to convert
     * @return a new Date instance
     * @throws IllegalArgumentException if the LocalDate year is outside the valid range (1-9999)
     */
    public static Date newDateFromLocalDate(LocalDate localDate) {
        if (localDate == null) {
            throw new IllegalArgumentException("LocalDate cannot be null");
        }

        int year = localDate.getYear();
        if (year < 1 || year > 9999) {
            throw new IllegalArgumentException(
                    String.format("Year must be between 1 and 9999, got %d", year)
            );
        }

        return Date.newBuilder()
                .setYear(year)
                .setMonth(localDate.getMonthValue())
                .setDay(localDate.getDayOfMonth())
                .build();
    }

    /**
     * Converts a Date to a Java LocalDate.
     *
     * @param date the Date to convert
     * @return a LocalDate instance, or null if the date is null or invalid
     * @throws IllegalArgumentException if the date is invalid
     */
    public static LocalDate dateToLocalDate(Date date) {
        if (date == null) {
            return null;
        }
        if (!dateIsValid(date)) {
            throw new IllegalArgumentException("Date is invalid");
        }
        return LocalDate.of(date.getYear(), date.getMonth(), date.getDay());
    }

    /**
     * Checks if a Date has valid values according to the protobuf constraints.
     *
     * <p>A date is valid if:
     * <ul>
     *   <li>It is not null</li>
     *   <li>Year is between 1 and 9999 (non-zero)</li>
     *   <li>Month is between 1 and 12 (non-zero)</li>
     *   <li>Day is between 1 and 31 (non-zero) and valid for the given month/year</li>
     * </ul>
     *
     * @param date the Date to validate
     * @return true if the date is valid, false otherwise
     */
    public static boolean dateIsValid(Date date) {
        if (date == null) {
            return false;
        }
        try {
            validateDateComponents(date.getYear(), date.getMonth(), date.getDay());
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * Checks if a Date has non-zero year, month, and day values.
     *
     * <p>Since only full dates are valid according to the protobuf constraints,
     * this is equivalent to {@link #dateIsValid(Date)}.
     *
     * @param date the Date to check
     * @return true if the date has non-zero values, false otherwise
     */
    public static boolean dateIsComplete(Date date) {
        if (date == null) {
            return false;
        }
        return date.getYear() != 0 && date.getMonth() != 0 && date.getDay() != 0;
    }

    /**
     * Validates the year, month, and day values according to Date constraints.
     * Only full dates are valid - all fields must be non-zero.
     *
     * @param year  the year to validate
     * @param month the month to validate
     * @param day   the day to validate
     * @throws IllegalArgumentException if any value is invalid or the date is not a valid calendar date
     */
    private static void validateDateComponents(int year, int month, int day) {
        // Year validation - must be non-zero
        if (year < 1 || year > 9999) {
            throw new IllegalArgumentException(
                    String.format("Year must be between 1 and 9999, got %d", year)
            );
        }

        // Month validation - must be non-zero
        if (month < 1 || month > 12) {
            throw new IllegalArgumentException(
                    String.format("Month must be between 1 and 12, got %d", month)
            );
        }

        // Day validation - must be non-zero
        if (day < 1 || day > 31) {
            throw new IllegalArgumentException(
                    String.format("Day must be between 1 and 31, got %d", day)
            );
        }

        // Check if the day is valid for the given month and year using LocalDate validation
        try {
            LocalDate.of(year, month, day);
        } catch (java.time.DateTimeException e) {
            throw new IllegalArgumentException(
                    String.format("Invalid date: %04d-%02d-%02d", year, month, day)
            );
        }
    }
}
