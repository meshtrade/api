package typev1

import (
	"fmt"
	"time"
)

// NewDate creates a new Date from year, month, and day values.
// Validates the input values according to the Date message constraints.
func NewDate(year, month, day int32) (*Date, error) {
	if err := validateDate(year, month, day); err != nil {
		return nil, err
	}
	return &Date{
		Year:  year,
		Month: month,
		Day:   day,
	}, nil
}

// NewDateFromTime creates a Date from a Go time.Time.
func NewDateFromTime(t time.Time) *Date {
	return &Date{
		Year:  int32(t.Year()),
		Month: int32(t.Month()),
		Day:   int32(t.Day()),
	}
}

// ToTime converts the Date to a time.Time.
func (d *Date) ToTime() time.Time {
	return time.Date(int(d.Year), time.Month(d.Month), int(d.Day), 0, 0, 0, 0, time.UTC)
}

// IsValid checks if the Date has valid values according to the protobuf constraints.
func (d *Date) IsValid() bool {
	if d == nil {
		return false
	}
	return validateDate(d.Year, d.Month, d.Day) == nil
}

// IsComplete returns true if the date has non-zero year, month, and day values.
func (d *Date) IsComplete() bool {
	if d == nil {
		return false
	}
	return d.Year != 0 && d.Month != 0 && d.Day != 0
}

// IsYearOnly returns true if only the year is specified (month and day are 0).
func (d *Date) IsYearOnly() bool {
	if d == nil {
		return false
	}
	return d.Year != 0 && d.Month == 0 && d.Day == 0
}

// IsYearMonth returns true if year and month are specified but day is 0.
func (d *Date) IsYearMonth() bool {
	if d == nil {
		return false
	}
	return d.Year != 0 && d.Month != 0 && d.Day == 0
}

// IsMonthDay returns true if month and day are specified but year is 0.
func (d *Date) IsMonthDay() bool {
	if d == nil {
		return false
	}
	return d.Year == 0 && d.Month != 0 && d.Day != 0
}

// validateDate validates the year, month, and day values according to Date constraints.
func validateDate(year, month, day int32) error {
	// Year validation
	if year != 0 && (year < 1 || year > 9999) {
		return fmt.Errorf("year must be 0 or between 1 and 9999, got %d", year)
	}

	// Month validation
	if month != 0 && (month < 1 || month > 12) {
		return fmt.Errorf("month must be 0 or between 1 and 12, got %d", month)
	}

	// Day validation
	if day != 0 && (day < 1 || day > 31) {
		return fmt.Errorf("day must be 0 or between 1 and 31, got %d", day)
	}

	// Additional validation for complete dates
	if year != 0 && month != 0 && day != 0 {
		// Check if the day is valid for the given month and year
		t := time.Date(int(year), time.Month(month), int(day), 0, 0, 0, 0, time.UTC)
		if t.Day() != int(day) || t.Month() != time.Month(month) || t.Year() != int(year) {
			return fmt.Errorf("invalid date: %d-%02d-%02d", year, month, day)
		}
	}

	// Validate partial date combinations
	if year == 0 && month != 0 && day == 0 {
		return fmt.Errorf("month cannot be specified without year")
	}
	if year == 0 && month == 0 && day != 0 {
		return fmt.Errorf("day cannot be specified without month")
	}

	return nil
}
