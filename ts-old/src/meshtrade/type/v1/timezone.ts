import { Timezone } from "./timezone_pb";

/**
 * Mapping from Timezone enum to IANA timezone string.
 *
 * These strings are compatible with dayjs .tz() and Intl.DateTimeFormat.
 */
const timezoneToIANA: Record<Timezone, string> = {
  [Timezone.TIMEZONE_UNSPECIFIED]: "",
  [Timezone.TIMEZONE_UTC]: "UTC",
  [Timezone.TIMEZONE_EUROPE_LONDON]: "Europe/London",
  [Timezone.TIMEZONE_AFRICA_CASABLANCA]: "Africa/Casablanca",
  [Timezone.TIMEZONE_AFRICA_LAGOS]: "Africa/Lagos",
  [Timezone.TIMEZONE_EUROPE_PARIS]: "Europe/Paris",
  [Timezone.TIMEZONE_AFRICA_JOHANNESBURG]: "Africa/Johannesburg",
  [Timezone.TIMEZONE_AFRICA_MAPUTO]: "Africa/Maputo",
  [Timezone.TIMEZONE_EUROPE_ATHENS]: "Europe/Athens",
  [Timezone.TIMEZONE_AFRICA_CAIRO]: "Africa/Cairo",
  [Timezone.TIMEZONE_ASIA_JERUSALEM]: "Asia/Jerusalem",
  [Timezone.TIMEZONE_EUROPE_MOSCOW]: "Europe/Moscow",
  [Timezone.TIMEZONE_EUROPE_ISTANBUL]: "Europe/Istanbul",
  [Timezone.TIMEZONE_AFRICA_NAIROBI]: "Africa/Nairobi",
  [Timezone.TIMEZONE_ASIA_RIYADH]: "Asia/Riyadh",
  [Timezone.TIMEZONE_ASIA_TEHRAN]: "Asia/Tehran",
  [Timezone.TIMEZONE_ASIA_DUBAI]: "Asia/Dubai",
  [Timezone.TIMEZONE_ASIA_KARACHI]: "Asia/Karachi",
  [Timezone.TIMEZONE_ASIA_KOLKATA]: "Asia/Kolkata",
  [Timezone.TIMEZONE_ASIA_DHAKA]: "Asia/Dhaka",
  [Timezone.TIMEZONE_ASIA_BANGKOK]: "Asia/Bangkok",
  [Timezone.TIMEZONE_ASIA_SHANGHAI]: "Asia/Shanghai",
  [Timezone.TIMEZONE_ASIA_SINGAPORE]: "Asia/Singapore",
  [Timezone.TIMEZONE_ASIA_HONG_KONG]: "Asia/Hong_Kong",
  [Timezone.TIMEZONE_AUSTRALIA_PERTH]: "Australia/Perth",
  [Timezone.TIMEZONE_ASIA_TOKYO]: "Asia/Tokyo",
  [Timezone.TIMEZONE_ASIA_SEOUL]: "Asia/Seoul",
  [Timezone.TIMEZONE_AUSTRALIA_ADELAIDE]: "Australia/Adelaide",
  [Timezone.TIMEZONE_AUSTRALIA_BRISBANE]: "Australia/Brisbane",
  [Timezone.TIMEZONE_AUSTRALIA_SYDNEY]: "Australia/Sydney",
  [Timezone.TIMEZONE_PACIFIC_AUCKLAND]: "Pacific/Auckland",
  [Timezone.TIMEZONE_AMERICA_SAO_PAULO]: "America/Sao_Paulo",
  [Timezone.TIMEZONE_AMERICA_ARGENTINA_BUENOS_AIRES]:
    "America/Argentina/Buenos_Aires",
  [Timezone.TIMEZONE_AMERICA_CARACAS]: "America/Caracas",
  [Timezone.TIMEZONE_AMERICA_SANTIAGO]: "America/Santiago",
  [Timezone.TIMEZONE_AMERICA_NEW_YORK]: "America/New_York",
  [Timezone.TIMEZONE_AMERICA_CHICAGO]: "America/Chicago",
  [Timezone.TIMEZONE_AMERICA_DENVER]: "America/Denver",
  [Timezone.TIMEZONE_AMERICA_LOS_ANGELES]: "America/Los_Angeles",
  [Timezone.TIMEZONE_AMERICA_ANCHORAGE]: "America/Anchorage",
  [Timezone.TIMEZONE_PACIFIC_HONOLULU]: "Pacific/Honolulu",
};

// Reverse mapping: IANA string → Timezone enum
const ianaToTimezone: Record<string, Timezone> = {};
for (const [key, value] of Object.entries(timezoneToIANA)) {
  if (value) {
    ianaToTimezone[value] = Number(key) as Timezone;
  }
}

/**
 * Converts a Timezone enum value to its IANA timezone string.
 *
 * The returned string is compatible with dayjs .tz(), Intl.DateTimeFormat,
 * and any API that accepts IANA timezone identifiers.
 *
 * @example
 * timezoneToString(Timezone.TIMEZONE_AFRICA_JOHANNESBURG) // "Africa/Johannesburg"
 * timezoneToString(Timezone.TIMEZONE_UTC)                 // "UTC"
 */
export function timezoneToString(timezone: Timezone): string {
  const iana = timezoneToIANA[timezone];
  if (iana === undefined) {
    throw new Error(`Unsupported Timezone enum value: ${timezone}`);
  }
  return iana;
}

/**
 * Converts an IANA timezone string to the corresponding Timezone enum value.
 *
 * Accepts strings as returned by dayjs.tz.guess(), Intl.DateTimeFormat().resolvedOptions().timeZone,
 * or any standard IANA identifier.
 *
 * @example
 * stringToTimezone("Africa/Johannesburg") // Timezone.TIMEZONE_AFRICA_JOHANNESBURG
 * stringToTimezone("UTC")                 // Timezone.TIMEZONE_UTC
 */
export function stringToTimezone(timezoneStr: string): Timezone {
  const tz = ianaToTimezone[timezoneStr];
  if (tz === undefined) {
    throw new Error(`Unsupported IANA timezone string: ${timezoneStr}`);
  }
  return tz;
}

/**
 * Returns all supported Timezone enum values (excluding UNSPECIFIED).
 */
export const allTimezones: Timezone[] = Object.keys(timezoneToIANA)
  .map(Number)
  .filter((v) => v !== Timezone.TIMEZONE_UNSPECIFIED) as Timezone[];
