package type_v1

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewTimeOfDay(t *testing.T) {
	tests := []struct {
		name      string
		hours     int32
		minutes   int32
		seconds   int32
		nanos     int32
		wantErr   bool
		wantTime  *TimeOfDay
		errSubstr string
	}{
		{
			name:     "valid time midnight",
			hours:    0,
			minutes:  0,
			seconds:  0,
			nanos:    0,
			wantErr:  false,
			wantTime: &TimeOfDay{Hours: 0, Minutes: 0, Seconds: 0, Nanos: 0},
		},
		{
			name:     "valid time noon",
			hours:    12,
			minutes:  0,
			seconds:  0,
			nanos:    0,
			wantErr:  false,
			wantTime: &TimeOfDay{Hours: 12, Minutes: 0, Seconds: 0, Nanos: 0},
		},
		{
			name:     "valid time end of day",
			hours:    23,
			minutes:  59,
			seconds:  59,
			nanos:    999999999,
			wantErr:  false,
			wantTime: &TimeOfDay{Hours: 23, Minutes: 59, Seconds: 59, Nanos: 999999999},
		},
		{
			name:      "invalid hours too low",
			hours:     -1,
			minutes:   0,
			seconds:   0,
			nanos:     0,
			wantErr:   true,
			errSubstr: "hours must be between 0 and 23",
		},
		{
			name:      "invalid hours too high",
			hours:     24,
			minutes:   0,
			seconds:   0,
			nanos:     0,
			wantErr:   true,
			errSubstr: "hours must be between 0 and 23",
		},
		{
			name:      "invalid minutes too low",
			hours:     12,
			minutes:   -1,
			seconds:   0,
			nanos:     0,
			wantErr:   true,
			errSubstr: "minutes must be between 0 and 59",
		},
		{
			name:      "invalid minutes too high",
			hours:     12,
			minutes:   60,
			seconds:   0,
			nanos:     0,
			wantErr:   true,
			errSubstr: "minutes must be between 0 and 59",
		},
		{
			name:      "invalid seconds too low",
			hours:     12,
			minutes:   30,
			seconds:   -1,
			nanos:     0,
			wantErr:   true,
			errSubstr: "seconds must be between 0 and 59",
		},
		{
			name:      "invalid seconds too high",
			hours:     12,
			minutes:   30,
			seconds:   60,
			nanos:     0,
			wantErr:   true,
			errSubstr: "seconds must be between 0 and 59",
		},
		{
			name:      "invalid nanos too low",
			hours:     12,
			minutes:   30,
			seconds:   45,
			nanos:     -1,
			wantErr:   true,
			errSubstr: "nanos must be between 0 and 999,999,999",
		},
		{
			name:      "invalid nanos too high",
			hours:     12,
			minutes:   30,
			seconds:   45,
			nanos:     1000000000,
			wantErr:   true,
			errSubstr: "nanos must be between 0 and 999,999,999",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := NewTimeOfDay(tt.hours, tt.minutes, tt.seconds, tt.nanos)
			if tt.wantErr {
				require.Error(t, err)
				assert.Contains(t, err.Error(), tt.errSubstr)
				assert.Nil(t, got)
			} else {
				require.NoError(t, err)
				assert.Equal(t, tt.wantTime, got)
			}
		})
	}
}

func TestNewTimeOfDayFromDuration(t *testing.T) {
	tests := []struct {
		name      string
		duration  time.Duration
		wantErr   bool
		wantTime  *TimeOfDay
		errSubstr string
	}{
		{
			name:     "midnight",
			duration: 0,
			wantErr:  false,
			wantTime: &TimeOfDay{Hours: 0, Minutes: 0, Seconds: 0, Nanos: 0},
		},
		{
			name:     "one hour",
			duration: time.Hour,
			wantErr:  false,
			wantTime: &TimeOfDay{Hours: 1, Minutes: 0, Seconds: 0, Nanos: 0},
		},
		{
			name:     "complex time",
			duration: 2*time.Hour + 30*time.Minute + 45*time.Second + 123456789*time.Nanosecond,
			wantErr:  false,
			wantTime: &TimeOfDay{Hours: 2, Minutes: 30, Seconds: 45, Nanos: 123456789},
		},
		{
			name:     "almost 24 hours",
			duration: 23*time.Hour + 59*time.Minute + 59*time.Second + 999999999*time.Nanosecond,
			wantErr:  false,
			wantTime: &TimeOfDay{Hours: 23, Minutes: 59, Seconds: 59, Nanos: 999999999},
		},
		{
			name:      "negative duration",
			duration:  -time.Hour,
			wantErr:   true,
			errSubstr: "duration cannot be negative",
		},
		{
			name:      "exactly 24 hours",
			duration:  24 * time.Hour,
			wantErr:   true,
			errSubstr: "duration cannot be 24 hours or more",
		},
		{
			name:      "more than 24 hours",
			duration:  25 * time.Hour,
			wantErr:   true,
			errSubstr: "duration cannot be 24 hours or more",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := NewTimeOfDayFromDuration(tt.duration)
			if tt.wantErr {
				require.Error(t, err)
				assert.Contains(t, err.Error(), tt.errSubstr)
				assert.Nil(t, got)
			} else {
				require.NoError(t, err)
				assert.Equal(t, tt.wantTime, got)
			}
		})
	}
}

func TestTimeOfDay_ToDuration(t *testing.T) {
	tests := []struct {
		name      string
		timeOfDay *TimeOfDay
		want      time.Duration
	}{
		{
			name:      "nil time",
			timeOfDay: nil,
			want:      0,
		},
		{
			name:      "midnight",
			timeOfDay: &TimeOfDay{Hours: 0, Minutes: 0, Seconds: 0, Nanos: 0},
			want:      0,
		},
		{
			name:      "noon",
			timeOfDay: &TimeOfDay{Hours: 12, Minutes: 0, Seconds: 0, Nanos: 0},
			want:      12 * time.Hour,
		},
		{
			name:      "complex time",
			timeOfDay: &TimeOfDay{Hours: 2, Minutes: 30, Seconds: 45, Nanos: 123456789},
			want:      2*time.Hour + 30*time.Minute + 45*time.Second + 123456789*time.Nanosecond,
		},
		{
			name:      "end of day",
			timeOfDay: &TimeOfDay{Hours: 23, Minutes: 59, Seconds: 59, Nanos: 999999999},
			want:      23*time.Hour + 59*time.Minute + 59*time.Second + 999999999*time.Nanosecond,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.timeOfDay.ToDuration()
			assert.Equal(t, tt.want, got)
		})
	}
}

func TestTimeOfDay_ToTimeWithDate(t *testing.T) {
	tests := []struct {
		name      string
		timeOfDay *TimeOfDay
		date      *Date
		wantErr   bool
		wantTime  time.Time
		errSubstr string
	}{
		{
			name:      "valid datetime",
			timeOfDay: &TimeOfDay{Hours: 15, Minutes: 30, Seconds: 45, Nanos: 123456789},
			date:      &Date{Year: 2023, Month: 12, Day: 25},
			wantErr:   false,
			wantTime:  time.Date(2023, 12, 25, 15, 30, 45, 123456789, time.UTC),
		},
		{
			name:      "midnight on date",
			timeOfDay: &TimeOfDay{Hours: 0, Minutes: 0, Seconds: 0, Nanos: 0},
			date:      &Date{Year: 2023, Month: 1, Day: 1},
			wantErr:   false,
			wantTime:  time.Date(2023, 1, 1, 0, 0, 0, 0, time.UTC),
		},
		{
			name:      "nil time of day",
			timeOfDay: nil,
			date:      &Date{Year: 2023, Month: 12, Day: 25},
			wantErr:   true,
			errSubstr: "time of day is nil",
		},
		{
			name:      "nil date",
			timeOfDay: &TimeOfDay{Hours: 12, Minutes: 0, Seconds: 0, Nanos: 0},
			date:      nil,
			wantErr:   true,
			errSubstr: "date must be complete",
		},
		{
			name:      "incomplete date",
			timeOfDay: &TimeOfDay{Hours: 12, Minutes: 0, Seconds: 0, Nanos: 0},
			date:      &Date{Year: 2023, Month: 0, Day: 0},
			wantErr:   true,
			errSubstr: "date must be complete",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := tt.timeOfDay.ToTimeWithDate(tt.date)
			if tt.wantErr {
				require.Error(t, err)
				assert.Contains(t, err.Error(), tt.errSubstr)
			} else {
				require.NoError(t, err)
				assert.Equal(t, tt.wantTime, got)
			}
		})
	}
}

func TestTimeOfDay_IsValid(t *testing.T) {
	tests := []struct {
		name      string
		timeOfDay *TimeOfDay
		want      bool
	}{
		{"nil time", nil, false},
		{"valid midnight", &TimeOfDay{Hours: 0, Minutes: 0, Seconds: 0, Nanos: 0}, true},
		{"valid noon", &TimeOfDay{Hours: 12, Minutes: 0, Seconds: 0, Nanos: 0}, true},
		{"valid end of day", &TimeOfDay{Hours: 23, Minutes: 59, Seconds: 59, Nanos: 999999999}, true},
		{"invalid hours", &TimeOfDay{Hours: 24, Minutes: 0, Seconds: 0, Nanos: 0}, false},
		{"invalid minutes", &TimeOfDay{Hours: 12, Minutes: 60, Seconds: 0, Nanos: 0}, false},
		{"invalid seconds", &TimeOfDay{Hours: 12, Minutes: 30, Seconds: 60, Nanos: 0}, false},
		{"invalid nanos", &TimeOfDay{Hours: 12, Minutes: 30, Seconds: 45, Nanos: 1000000000}, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.timeOfDay.IsValid()
			assert.Equal(t, tt.want, got)
		})
	}
}

func TestTimeOfDay_TotalSeconds(t *testing.T) {
	tests := []struct {
		name      string
		timeOfDay *TimeOfDay
		want      float64
	}{
		{
			name:      "nil time",
			timeOfDay: nil,
			want:      0,
		},
		{
			name:      "midnight",
			timeOfDay: &TimeOfDay{Hours: 0, Minutes: 0, Seconds: 0, Nanos: 0},
			want:      0,
		},
		{
			name:      "one hour",
			timeOfDay: &TimeOfDay{Hours: 1, Minutes: 0, Seconds: 0, Nanos: 0},
			want:      3600,
		},
		{
			name:      "one minute",
			timeOfDay: &TimeOfDay{Hours: 0, Minutes: 1, Seconds: 0, Nanos: 0},
			want:      60,
		},
		{
			name:      "one second",
			timeOfDay: &TimeOfDay{Hours: 0, Minutes: 0, Seconds: 1, Nanos: 0},
			want:      1,
		},
		{
			name:      "half second",
			timeOfDay: &TimeOfDay{Hours: 0, Minutes: 0, Seconds: 0, Nanos: 500000000},
			want:      0.5,
		},
		{
			name:      "complex time",
			timeOfDay: &TimeOfDay{Hours: 2, Minutes: 30, Seconds: 45, Nanos: 123456789},
			want:      2*3600 + 30*60 + 45 + 0.123456789,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.timeOfDay.TotalSeconds()
			assert.InDelta(t, tt.want, got, 0.000000001) // Allow small floating point differences
		})
	}
}

func TestNewTimeOfDayFromTime(t *testing.T) {
	tests := []struct {
		name     string
		timeVal  time.Time
		wantTime *TimeOfDay
	}{
		{
			name:     "midnight",
			timeVal:  time.Date(2023, 12, 25, 0, 0, 0, 0, time.UTC),
			wantTime: &TimeOfDay{Hours: 0, Minutes: 0, Seconds: 0, Nanos: 0},
		},
		{
			name:     "noon",
			timeVal:  time.Date(2023, 12, 25, 12, 0, 0, 0, time.UTC),
			wantTime: &TimeOfDay{Hours: 12, Minutes: 0, Seconds: 0, Nanos: 0},
		},
		{
			name:     "complex time",
			timeVal:  time.Date(2023, 12, 25, 15, 30, 45, 123456789, time.UTC),
			wantTime: &TimeOfDay{Hours: 15, Minutes: 30, Seconds: 45, Nanos: 123456789},
		},
		{
			name:     "end of day",
			timeVal:  time.Date(2023, 12, 25, 23, 59, 59, 999999999, time.UTC),
			wantTime: &TimeOfDay{Hours: 23, Minutes: 59, Seconds: 59, Nanos: 999999999},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := NewTimeOfDayFromTime(tt.timeVal)
			assert.Equal(t, tt.wantTime, got)
		})
	}
}
