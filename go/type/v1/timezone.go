package type_v1

import (
	"fmt"
	"time"
)

// ToLocation converts a Timezone enum value to a *time.Location.
func (tz Timezone) ToLocation() (*time.Location, error) {
	iana, ok := timezoneToIANA[tz]
	if !ok {
		return nil, fmt.Errorf("unsupported timezone: %s", tz)
	}
	return time.LoadLocation(iana)
}

// ToIANAString converts a Timezone enum value to its IANA timezone string.
func (tz Timezone) ToIANAString() (string, error) {
	iana, ok := timezoneToIANA[tz]
	if !ok {
		return "", fmt.Errorf("unsupported timezone: %s", tz)
	}
	return iana, nil
}

// timezoneToIANA maps each Timezone enum value to its IANA timezone string.
var timezoneToIANA = map[Timezone]string{
	Timezone_TIMEZONE_UTC:                            "UTC",
	Timezone_TIMEZONE_EUROPE_LONDON:                  "Europe/London",
	Timezone_TIMEZONE_AFRICA_CASABLANCA:              "Africa/Casablanca",
	Timezone_TIMEZONE_AFRICA_LAGOS:                   "Africa/Lagos",
	Timezone_TIMEZONE_EUROPE_PARIS:                   "Europe/Paris",
	Timezone_TIMEZONE_AFRICA_JOHANNESBURG:            "Africa/Johannesburg",
	Timezone_TIMEZONE_AFRICA_MAPUTO:                  "Africa/Maputo",
	Timezone_TIMEZONE_EUROPE_ATHENS:                  "Europe/Athens",
	Timezone_TIMEZONE_AFRICA_CAIRO:                   "Africa/Cairo",
	Timezone_TIMEZONE_ASIA_JERUSALEM:                 "Asia/Jerusalem",
	Timezone_TIMEZONE_EUROPE_MOSCOW:                  "Europe/Moscow",
	Timezone_TIMEZONE_EUROPE_ISTANBUL:                "Europe/Istanbul",
	Timezone_TIMEZONE_AFRICA_NAIROBI:                 "Africa/Nairobi",
	Timezone_TIMEZONE_ASIA_RIYADH:                    "Asia/Riyadh",
	Timezone_TIMEZONE_ASIA_TEHRAN:                    "Asia/Tehran",
	Timezone_TIMEZONE_ASIA_DUBAI:                     "Asia/Dubai",
	Timezone_TIMEZONE_ASIA_KARACHI:                   "Asia/Karachi",
	Timezone_TIMEZONE_ASIA_KOLKATA:                   "Asia/Kolkata",
	Timezone_TIMEZONE_ASIA_DHAKA:                     "Asia/Dhaka",
	Timezone_TIMEZONE_ASIA_BANGKOK:                   "Asia/Bangkok",
	Timezone_TIMEZONE_ASIA_SHANGHAI:                  "Asia/Shanghai",
	Timezone_TIMEZONE_ASIA_SINGAPORE:                 "Asia/Singapore",
	Timezone_TIMEZONE_ASIA_HONG_KONG:                 "Asia/Hong_Kong",
	Timezone_TIMEZONE_AUSTRALIA_PERTH:                "Australia/Perth",
	Timezone_TIMEZONE_ASIA_TOKYO:                     "Asia/Tokyo",
	Timezone_TIMEZONE_ASIA_SEOUL:                     "Asia/Seoul",
	Timezone_TIMEZONE_AUSTRALIA_ADELAIDE:             "Australia/Adelaide",
	Timezone_TIMEZONE_AUSTRALIA_BRISBANE:             "Australia/Brisbane",
	Timezone_TIMEZONE_AUSTRALIA_SYDNEY:               "Australia/Sydney",
	Timezone_TIMEZONE_PACIFIC_AUCKLAND:               "Pacific/Auckland",
	Timezone_TIMEZONE_AMERICA_SAO_PAULO:              "America/Sao_Paulo",
	Timezone_TIMEZONE_AMERICA_ARGENTINA_BUENOS_AIRES: "America/Argentina/Buenos_Aires",
	Timezone_TIMEZONE_AMERICA_CARACAS:                "America/Caracas",
	Timezone_TIMEZONE_AMERICA_SANTIAGO:               "America/Santiago",
	Timezone_TIMEZONE_AMERICA_NEW_YORK:               "America/New_York",
	Timezone_TIMEZONE_AMERICA_CHICAGO:                "America/Chicago",
	Timezone_TIMEZONE_AMERICA_DENVER:                 "America/Denver",
	Timezone_TIMEZONE_AMERICA_LOS_ANGELES:            "America/Los_Angeles",
	Timezone_TIMEZONE_AMERICA_ANCHORAGE:              "America/Anchorage",
	Timezone_TIMEZONE_PACIFIC_HONOLULU:               "Pacific/Honolulu",
}
