import { Timezone } from "./timezone_pb";

/**
 * Mapping from Timezone enum to IANA timezone string.
 *
 * These strings are compatible with dayjs .tz() and Intl.DateTimeFormat.
 */
const timezoneToIANA: Record<Timezone, string> = {
  [Timezone.UNSPECIFIED]: "",
  [Timezone.UTC]: "UTC",
  [Timezone.EUROPE_LONDON]: "Europe/London",
  [Timezone.AFRICA_CASABLANCA]: "Africa/Casablanca",
  [Timezone.AFRICA_LAGOS]: "Africa/Lagos",
  [Timezone.EUROPE_PARIS]: "Europe/Paris",
  [Timezone.AFRICA_JOHANNESBURG]: "Africa/Johannesburg",
  [Timezone.AFRICA_MAPUTO]: "Africa/Maputo",
  [Timezone.EUROPE_ATHENS]: "Europe/Athens",
  [Timezone.AFRICA_CAIRO]: "Africa/Cairo",
  [Timezone.ASIA_JERUSALEM]: "Asia/Jerusalem",
  [Timezone.EUROPE_MOSCOW]: "Europe/Moscow",
  [Timezone.EUROPE_ISTANBUL]: "Europe/Istanbul",
  [Timezone.AFRICA_NAIROBI]: "Africa/Nairobi",
  [Timezone.ASIA_RIYADH]: "Asia/Riyadh",
  [Timezone.ASIA_TEHRAN]: "Asia/Tehran",
  [Timezone.ASIA_DUBAI]: "Asia/Dubai",
  [Timezone.ASIA_KARACHI]: "Asia/Karachi",
  [Timezone.ASIA_KOLKATA]: "Asia/Kolkata",
  [Timezone.ASIA_DHAKA]: "Asia/Dhaka",
  [Timezone.ASIA_BANGKOK]: "Asia/Bangkok",
  [Timezone.ASIA_SHANGHAI]: "Asia/Shanghai",
  [Timezone.ASIA_SINGAPORE]: "Asia/Singapore",
  [Timezone.ASIA_HONG_KONG]: "Asia/Hong_Kong",
  [Timezone.AUSTRALIA_PERTH]: "Australia/Perth",
  [Timezone.ASIA_TOKYO]: "Asia/Tokyo",
  [Timezone.ASIA_SEOUL]: "Asia/Seoul",
  [Timezone.AUSTRALIA_ADELAIDE]: "Australia/Adelaide",
  [Timezone.AUSTRALIA_BRISBANE]: "Australia/Brisbane",
  [Timezone.AUSTRALIA_SYDNEY]: "Australia/Sydney",
  [Timezone.PACIFIC_AUCKLAND]: "Pacific/Auckland",
  [Timezone.AMERICA_SAO_PAULO]: "America/Sao_Paulo",
  [Timezone.AMERICA_ARGENTINA_BUENOS_AIRES]: "America/Argentina/Buenos_Aires",
  [Timezone.AMERICA_CARACAS]: "America/Caracas",
  [Timezone.AMERICA_SANTIAGO]: "America/Santiago",
  [Timezone.AMERICA_NEW_YORK]: "America/New_York",
  [Timezone.AMERICA_CHICAGO]: "America/Chicago",
  [Timezone.AMERICA_DENVER]: "America/Denver",
  [Timezone.AMERICA_LOS_ANGELES]: "America/Los_Angeles",
  [Timezone.AMERICA_ANCHORAGE]: "America/Anchorage",
  [Timezone.PACIFIC_HONOLULU]: "Pacific/Honolulu",
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
 * timezoneToString(Timezone.AFRICA_JOHANNESBURG) // "Africa/Johannesburg"
 * timezoneToString(Timezone.UTC)                 // "UTC"
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
 * stringToTimezone("Africa/Johannesburg") // Timezone.AFRICA_JOHANNESBURG
 * stringToTimezone("UTC")                 // Timezone.UTC
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
  .filter((v) => v !== Timezone.UNSPECIFIED) as Timezone[];
