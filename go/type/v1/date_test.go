package typev1

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewDate(t *testing.T) {
	tests := []struct {
		name      string
		year      int32
		month     int32
		day       int32
		wantErr   bool
		wantDate  *Date
		errSubstr string
	}{
		{
			name:     "valid complete date",
			year:     2023,
			month:    12,
			day:      25,
			wantErr:  false,
			wantDate: &Date{Year: 2023, Month: 12, Day: 25},
		},
		{
			name:     "valid year only",
			year:     2023,
			month:    0,
			day:      0,
			wantErr:  false,
			wantDate: &Date{Year: 2023, Month: 0, Day: 0},
		},
		{
			name:     "valid year-month",
			year:     2023,
			month:    12,
			day:      0,
			wantErr:  false,
			wantDate: &Date{Year: 2023, Month: 12, Day: 0},
		},
		{
			name:      "invalid partial date - month without year",
			year:      0,
			month:     1,
			day:       0,
			wantErr:   true,
			errSubstr: "month cannot be specified without year",
		},
		{
			name:      "invalid year too high",
			year:      10000,
			month:     1,
			day:       1,
			wantErr:   true,
			errSubstr: "year must be 0 or between 1 and 9999",
		},
		{
			name:      "invalid partial date - day without month",
			year:      0,
			month:     0,
			day:       1,
			wantErr:   true,
			errSubstr: "day cannot be specified without month",
		},
		{
			name:      "invalid month too high",
			year:      2023,
			month:     13,
			day:       1,
			wantErr:   true,
			errSubstr: "month must be 0 or between 1 and 12",
		},
		{
			name:     "valid partial date - year-month with day 0",
			year:     2023,
			month:    1,
			day:      0,
			wantErr:  false,
			wantDate: &Date{Year: 2023, Month: 1, Day: 0},
		},
		{
			name:      "invalid day too high",
			year:      2023,
			month:     1,
			day:       32,
			wantErr:   true,
			errSubstr: "day must be 0 or between 1 and 31",
		},
		{
			name:      "invalid date February 30",
			year:      2023,
			month:     2,
			day:       30,
			wantErr:   true,
			errSubstr: "invalid date",
		},
		{
			name:      "invalid leap year February 29 in non-leap year",
			year:      2023,
			month:     2,
			day:       29,
			wantErr:   true,
			errSubstr: "invalid date",
		},
		{
			name:     "valid leap year February 29",
			year:     2024,
			month:    2,
			day:      29,
			wantErr:  false,
			wantDate: &Date{Year: 2024, Month: 2, Day: 29},
		},
		{
			name:     "valid month-day",
			year:     0,
			month:    12,
			day:      25,
			wantErr:  false,
			wantDate: &Date{Year: 0, Month: 12, Day: 25},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := NewDate(tt.year, tt.month, tt.day)
			if tt.wantErr {
				require.Error(t, err)
				assert.Contains(t, err.Error(), tt.errSubstr)
				assert.Nil(t, got)
			} else {
				require.NoError(t, err)
				assert.Equal(t, tt.wantDate, got)
			}
		})
	}
}

func TestDate_ToTime(t *testing.T) {
	tests := []struct {
		name        string
		date        *Date
		wantPanic   bool
		panicSubstr string
		wantTime    time.Time
	}{
		{
			name:      "valid complete date",
			date:      &Date{Year: 2023, Month: 12, Day: 25},
			wantPanic: false,
			wantTime:  time.Date(2023, 12, 25, 0, 0, 0, 0, time.UTC),
		},
		{
			name:        "nil date",
			date:        nil,
			wantPanic:   true,
			panicSubstr: "date is nil",
		},
		{
			name:        "incomplete date - year only",
			date:        &Date{Year: 2023, Month: 0, Day: 0},
			wantPanic:   true,
			panicSubstr: "date is incomplete",
		},
		{
			name:        "incomplete date - year month",
			date:        &Date{Year: 2023, Month: 12, Day: 0},
			wantPanic:   true,
			panicSubstr: "date is incomplete",
		},
		{
			name:        "invalid date",
			date:        &Date{Year: 2023, Month: 2, Day: 30},
			wantPanic:   true,
			panicSubstr: "date is invalid",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if tt.wantPanic {
				assert.PanicsWithValue(t, tt.panicSubstr, func() {
					tt.date.ToTime()
				})
			} else {
				got := tt.date.ToTime()
				assert.Equal(t, tt.wantTime, got)
			}
		})
	}
}

func TestDate_IsValid(t *testing.T) {
	tests := []struct {
		name string
		date *Date
		want bool
	}{
		{"nil date", nil, false},
		{"valid complete date", &Date{Year: 2023, Month: 12, Day: 25}, true},
		{"valid year only", &Date{Year: 2023, Month: 0, Day: 0}, true},
		{"valid year-month", &Date{Year: 2023, Month: 12, Day: 0}, true},
		{"invalid year too high", &Date{Year: 10000, Month: 1, Day: 1}, false},
		{"invalid month too high", &Date{Year: 2023, Month: 13, Day: 1}, false},
		{"invalid day too high", &Date{Year: 2023, Month: 1, Day: 32}, false},
		{"invalid date February 30", &Date{Year: 2023, Month: 2, Day: 30}, false},
		{"valid leap year", &Date{Year: 2024, Month: 2, Day: 29}, true},
		{"invalid leap year", &Date{Year: 2023, Month: 2, Day: 29}, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.date.IsValid()
			assert.Equal(t, tt.want, got)
		})
	}
}

func TestDate_IsComplete(t *testing.T) {
	tests := []struct {
		name string
		date *Date
		want bool
	}{
		{"nil date", nil, false},
		{"complete date", &Date{Year: 2023, Month: 12, Day: 25}, true},
		{"year only", &Date{Year: 2023, Month: 0, Day: 0}, false},
		{"year-month", &Date{Year: 2023, Month: 12, Day: 0}, false},
		{"zero date", &Date{Year: 0, Month: 0, Day: 0}, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.date.IsComplete()
			assert.Equal(t, tt.want, got)
		})
	}
}

func TestDate_IsYearOnly(t *testing.T) {
	tests := []struct {
		name string
		date *Date
		want bool
	}{
		{"nil date", nil, false},
		{"complete date", &Date{Year: 2023, Month: 12, Day: 25}, false},
		{"year only", &Date{Year: 2023, Month: 0, Day: 0}, true},
		{"year-month", &Date{Year: 2023, Month: 12, Day: 0}, false},
		{"zero date", &Date{Year: 0, Month: 0, Day: 0}, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.date.IsYearOnly()
			assert.Equal(t, tt.want, got)
		})
	}
}

func TestDate_IsYearMonth(t *testing.T) {
	tests := []struct {
		name string
		date *Date
		want bool
	}{
		{"nil date", nil, false},
		{"complete date", &Date{Year: 2023, Month: 12, Day: 25}, false},
		{"year only", &Date{Year: 2023, Month: 0, Day: 0}, false},
		{"year-month", &Date{Year: 2023, Month: 12, Day: 0}, true},
		{"zero date", &Date{Year: 0, Month: 0, Day: 0}, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.date.IsYearMonth()
			assert.Equal(t, tt.want, got)
		})
	}
}

func TestDate_IsMonthDay(t *testing.T) {
	tests := []struct {
		name string
		date *Date
		want bool
	}{
		{"nil date", nil, false},
		{"complete date", &Date{Year: 2023, Month: 12, Day: 25}, false},
		{"year only", &Date{Year: 2023, Month: 0, Day: 0}, false},
		{"year-month", &Date{Year: 2023, Month: 12, Day: 0}, false},
		{"month-day", &Date{Year: 0, Month: 12, Day: 25}, true},
		{"zero date", &Date{Year: 0, Month: 0, Day: 0}, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.date.IsMonthDay()
			assert.Equal(t, tt.want, got)
		})
	}
}

func TestNewDateFromTime(t *testing.T) {
	tests := []struct {
		name     string
		timeVal  time.Time
		wantDate *Date
	}{
		{
			name:     "standard date",
			timeVal:  time.Date(2023, 12, 25, 15, 30, 45, 123456789, time.UTC),
			wantDate: &Date{Year: 2023, Month: 12, Day: 25},
		},
		{
			name:     "leap year date",
			timeVal:  time.Date(2024, 2, 29, 0, 0, 0, 0, time.UTC),
			wantDate: &Date{Year: 2024, Month: 2, Day: 29},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := NewDateFromTime(tt.timeVal)
			assert.Equal(t, tt.wantDate, got)
		})
	}
}