package type_v1

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestTimezone_ToLocation(t *testing.T) {
	tests := []struct {
		name     string
		tz       Timezone
		wantErr  bool
		wantName string
	}{
		{
			name:     "UTC",
			tz:       Timezone_TIMEZONE_UTC,
			wantName: "UTC",
		},
		{
			name:     "America/New_York",
			tz:       Timezone_TIMEZONE_AMERICA_NEW_YORK,
			wantName: "America/New_York",
		},
		{
			name:     "Asia/Tokyo",
			tz:       Timezone_TIMEZONE_ASIA_TOKYO,
			wantName: "Asia/Tokyo",
		},
		{
			name:     "Australia/Sydney",
			tz:       Timezone_TIMEZONE_AUSTRALIA_SYDNEY,
			wantName: "Australia/Sydney",
		},
		{
			name:     "Europe/Paris",
			tz:       Timezone_TIMEZONE_EUROPE_PARIS,
			wantName: "Europe/Paris",
		},
		{
			name:    "unsupported timezone",
			tz:      Timezone(9999),
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			loc, err := tt.tz.ToLocation()
			if tt.wantErr {
				require.Error(t, err)
				assert.Nil(t, loc)
				assert.Contains(t, err.Error(), "unsupported timezone")
			} else {
				require.NoError(t, err)
				require.NotNil(t, loc)
				assert.Equal(t, tt.wantName, loc.String())
			}
		})
	}
}

func TestTimezone_ToIANAString(t *testing.T) {
	tests := []struct {
		name     string
		tz       Timezone
		wantErr  bool
		wantIANA string
	}{
		{
			name:     "UTC",
			tz:       Timezone_TIMEZONE_UTC,
			wantIANA: "UTC",
		},
		{
			name:     "America/Los_Angeles",
			tz:       Timezone_TIMEZONE_AMERICA_LOS_ANGELES,
			wantIANA: "America/Los_Angeles",
		},
		{
			name:     "Asia/Singapore",
			tz:       Timezone_TIMEZONE_ASIA_SINGAPORE,
			wantIANA: "Asia/Singapore",
		},
		{
			name:     "Africa/Johannesburg",
			tz:       Timezone_TIMEZONE_AFRICA_JOHANNESBURG,
			wantIANA: "Africa/Johannesburg",
		},
		{
			name:     "Pacific/Auckland",
			tz:       Timezone_TIMEZONE_PACIFIC_AUCKLAND,
			wantIANA: "Pacific/Auckland",
		},
		{
			name:    "unsupported timezone",
			tz:      Timezone(9999),
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			iana, err := tt.tz.ToIANAString()
			if tt.wantErr {
				require.Error(t, err)
				assert.Empty(t, iana)
				assert.Contains(t, err.Error(), "unsupported timezone")
			} else {
				require.NoError(t, err)
				assert.Equal(t, tt.wantIANA, iana)
			}
		})
	}
}
