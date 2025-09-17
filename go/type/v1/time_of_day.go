package type_v1

import (
	"fmt"
	"math"
	"time"
)

// NewTimeOfDay creates a new TimeOfDay from hours, minutes, seconds, and nanos values.
// Validates the input values according to the TimeOfDay message constraints.
func NewTimeOfDay(hours, minutes, seconds, nanos int32) (*TimeOfDay, error) {
	if err := validateTimeOfDay(hours, minutes, seconds, nanos); err != nil {
		return nil, err
	}
	return &TimeOfDay{
		Hours:   hours,
		Minutes: minutes,
		Seconds: seconds,
		Nanos:   nanos,
	}, nil
}

// NewTimeOfDayFromTime creates a TimeOfDay from a Go time.Time.
// Only extracts the time components, ignoring the date.
func NewTimeOfDayFromTime(t time.Time) *TimeOfDay {
	hours := t.Hour()
	minutes := t.Minute()
	seconds := t.Second()
	nanos := t.Nanosecond()

	if hours < math.MinInt32 || hours > math.MaxInt32 {
		panic(fmt.Sprintf("hours overflow: %d cannot be converted to int32", hours))
	}
	if minutes < math.MinInt32 || minutes > math.MaxInt32 {
		panic(fmt.Sprintf("minutes overflow: %d cannot be converted to int32", minutes))
	}
	if seconds < math.MinInt32 || seconds > math.MaxInt32 {
		panic(fmt.Sprintf("seconds overflow: %d cannot be converted to int32", seconds))
	}
	if nanos < math.MinInt32 || nanos > math.MaxInt32 {
		panic(fmt.Sprintf("nanoseconds overflow: %d cannot be converted to int32", nanos))
	}

	return &TimeOfDay{
		Hours:   int32(hours),   // #nosec G115 -- overflow checked above
		Minutes: int32(minutes), // #nosec G115 -- overflow checked above
		Seconds: int32(seconds), // #nosec G115 -- overflow checked above
		Nanos:   int32(nanos),   // #nosec G115 -- overflow checked above
	}
}

// NewTimeOfDayFromDuration creates a TimeOfDay from a time.Duration.
// The duration should represent time elapsed since midnight.
func NewTimeOfDayFromDuration(d time.Duration) (*TimeOfDay, error) {
	if d < 0 {
		return nil, fmt.Errorf("duration cannot be negative: %v", d)
	}
	if d >= 24*time.Hour {
		return nil, fmt.Errorf("duration cannot be 24 hours or more: %v", d)
	}

	hours := int32(d.Hours())
	d -= time.Duration(hours) * time.Hour

	minutes := int32(d.Minutes())
	d -= time.Duration(minutes) * time.Minute

	seconds := int32(d.Seconds())
	d -= time.Duration(seconds) * time.Second

	nanosVal := d.Nanoseconds()
	if nanosVal < math.MinInt32 || nanosVal > math.MaxInt32 {
		return nil, fmt.Errorf("nanoseconds overflow: %d cannot be converted to int32", nanosVal)
	}
	nanos := int32(nanosVal) // #nosec G115 -- overflow checked above

	return &TimeOfDay{
		Hours:   hours,
		Minutes: minutes,
		Seconds: seconds,
		Nanos:   nanos,
	}, nil
}

// ToDuration converts the TimeOfDay to a time.Duration representing time since midnight.
func (t *TimeOfDay) ToDuration() time.Duration {
	if t == nil {
		return 0
	}
	return time.Duration(t.Hours)*time.Hour +
		time.Duration(t.Minutes)*time.Minute +
		time.Duration(t.Seconds)*time.Second +
		time.Duration(t.Nanos)*time.Nanosecond
}

// ToTimeWithDate combines the TimeOfDay with a given date to create a time.Time.
func (t *TimeOfDay) ToTimeWithDate(date *Date) (time.Time, error) {
	if t == nil {
		return time.Time{}, fmt.Errorf("time of day is nil")
	}
	if date == nil || !date.IsComplete() {
		return time.Time{}, fmt.Errorf("date must be complete")
	}

	return time.Date(
		int(date.Year),
		time.Month(date.Month),
		int(date.Day),
		int(t.Hours),
		int(t.Minutes),
		int(t.Seconds),
		int(t.Nanos),
		time.UTC,
	), nil
}

// IsValid checks if the TimeOfDay has valid values according to the protobuf constraints.
func (t *TimeOfDay) IsValid() bool {
	if t == nil {
		return false
	}
	return validateTimeOfDay(t.Hours, t.Minutes, t.Seconds, t.Nanos) == nil
}

// TotalSeconds returns the total number of seconds since midnight as a float64.
func (t *TimeOfDay) TotalSeconds() float64 {
	if t == nil {
		return 0
	}
	return float64(t.Hours)*3600 + float64(t.Minutes)*60 + float64(t.Seconds) + float64(t.Nanos)/1e9
}

// validateTimeOfDay validates the hours, minutes, seconds, and nanos values according to TimeOfDay constraints.
func validateTimeOfDay(hours, minutes, seconds, nanos int32) error {
	// Hours validation
	if hours < 0 || hours > 23 {
		return fmt.Errorf("hours must be between 0 and 23, got %d", hours)
	}

	// Minutes validation
	if minutes < 0 || minutes > 59 {
		return fmt.Errorf("minutes must be between 0 and 59, got %d", minutes)
	}

	// Seconds validation
	if seconds < 0 || seconds > 59 {
		return fmt.Errorf("seconds must be between 0 and 59, got %d", seconds)
	}

	// Nanos validation
	if nanos < 0 || nanos > 999999999 {
		return fmt.Errorf("nanos must be between 0 and 999,999,999, got %d", nanos)
	}

	return nil
}
