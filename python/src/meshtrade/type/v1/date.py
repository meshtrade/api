"""
This module provides helper functions for working with Date protobuf messages.
"""

from datetime import date as python_date
from datetime import datetime

from .date_pb2 import Date


def new_date(year: int, month: int, day: int) -> Date:
    """Creates a new Date from year, month, and day values.

    Args:
        year: Year value (1-9999)
        month: Month value (1-12)
        day: Day value (1-31)

    Returns:
        A Date protobuf message

    Raises:
        ValueError: If the date values are invalid
    """
    _validate_date(year, month, day)
    return Date(year=year, month=month, day=day)


def new_date_from_python_date(python_date_obj: python_date) -> Date:
    """Creates a Date from a Python date object.

    Args:
        python_date_obj: A Python datetime.date object

    Returns:
        A Date protobuf message
    """
    return Date(year=python_date_obj.year, month=python_date_obj.month, day=python_date_obj.day)


def new_date_from_datetime(datetime_obj: datetime) -> Date:
    """Creates a Date from a Python datetime object.
    Only extracts the date components, ignoring the time.

    Args:
        datetime_obj: A Python datetime.datetime object

    Returns:
        A Date protobuf message
    """
    return new_date_from_python_date(datetime_obj.date())


def date_to_python_date(date_obj: Date) -> python_date:
    """Converts a Date protobuf message to a Python date object.

    Args:
        date_obj: A Date protobuf message

    Returns:
        A Python datetime.date object

    Raises:
        ValueError: If the date is invalid
    """
    if not date_obj:
        raise ValueError("Date object is None")

    if not date_is_valid(date_obj):
        raise ValueError(f"Invalid date: year={date_obj.year}, month={date_obj.month}, day={date_obj.day}")

    try:
        return python_date(date_obj.year, date_obj.month, date_obj.day)
    except ValueError as e:
        raise ValueError(f"Invalid date values: {e}") from e


def date_is_valid(date_obj: Date | None) -> bool:
    """Checks if a Date has valid values according to the protobuf constraints.

    Args:
        date_obj: A Date protobuf message or None

    Returns:
        True if the date is valid, False otherwise
    """
    if not date_obj:
        return False

    try:
        _validate_date(date_obj.year, date_obj.month, date_obj.day)
        return True
    except ValueError:
        return False


def date_is_complete(date_obj: Date | None) -> bool:
    """Returns True if the date has non-zero year, month, and day values.
    Since only full dates are valid, this is equivalent to is_valid().

    Args:
        date_obj: A Date protobuf message or None

    Returns:
        True if the date is complete, False otherwise
    """
    if not date_obj:
        return False
    return date_obj.year != 0 and date_obj.month != 0 and date_obj.day != 0


def date_to_string(date_obj: Date | None) -> str:
    """Returns a string representation of the date.

    Args:
        date_obj: A Date protobuf message or None

    Returns:
        String representation of the date
    """
    if not date_obj:
        return "<undefined>"

    if date_is_valid(date_obj):
        return f"{date_obj.year:04d}-{date_obj.month:02d}-{date_obj.day:02d}"
    else:
        return f"Date(year={date_obj.year}, month={date_obj.month}, day={date_obj.day}) [INVALID]"


def date_is_before(date1: Date | None, date2: Date | None) -> bool:
    """Returns True if date1 is before date2.

    Args:
        date1: First Date protobuf message or None
        date2: Second Date protobuf message or None

    Returns:
        True if date1 is before date2, False otherwise

    Raises:
        ValueError: If either date is None or incomplete
    """
    if not date1 or not date2:
        raise ValueError("Both dates must be provided")

    if not date_is_valid(date1) or not date_is_valid(date2):
        raise ValueError("Both dates must be valid for comparison")

    # Compare year first
    if date1.year != date2.year:
        return date1.year < date2.year

    # Compare month if years are equal
    if date1.month != date2.month:
        return date1.month < date2.month

    # Compare day if years and months are equal
    return date1.day < date2.day


def date_is_after(date1: Date | None, date2: Date | None) -> bool:
    """Returns True if date1 is after date2.

    Args:
        date1: First Date protobuf message or None
        date2: Second Date protobuf message or None

    Returns:
        True if date1 is after date2, False otherwise

    Raises:
        ValueError: If either date is None or incomplete
    """
    if not date1 or not date2:
        raise ValueError("Both dates must be provided")

    if not date_is_valid(date1) or not date_is_valid(date2):
        raise ValueError("Both dates must be valid for comparison")

    # Compare year first
    if date1.year != date2.year:
        return date1.year > date2.year

    # Compare month if years are equal
    if date1.month != date2.month:
        return date1.month > date2.month

    # Compare day if years and months are equal
    return date1.day > date2.day


def date_is_equal(date1: Date | None, date2: Date | None) -> bool:
    """Returns True if date1 is equal to date2.

    Args:
        date1: First Date protobuf message or None
        date2: Second Date protobuf message or None

    Returns:
        True if date1 is equal to date2, False otherwise
    """
    if not date1 and not date2:
        return True

    if not date1 or not date2:
        return False

    return date1.year == date2.year and date1.month == date2.month and date1.day == date2.day


def date_is_before_or_equal(date1: Date | None, date2: Date | None) -> bool:
    """Returns True if date1 is before or equal to date2.

    Args:
        date1: First Date protobuf message or None
        date2: Second Date protobuf message or None

    Returns:
        True if date1 is before or equal to date2, False otherwise

    Raises:
        ValueError: If either date is None or incomplete
    """
    return date_is_before(date1, date2) or date_is_equal(date1, date2)


def date_is_after_or_equal(date1: Date | None, date2: Date | None) -> bool:
    """Returns True if date1 is after or equal to date2.

    Args:
        date1: First Date protobuf message or None
        date2: Second Date protobuf message or None

    Returns:
        True if date1 is after or equal to date2, False otherwise

    Raises:
        ValueError: If either date is None or incomplete
    """
    return date_is_after(date1, date2) or date_is_equal(date1, date2)


def date_add_days(date_obj: Date, days: int) -> Date:
    """Adds a specified number of days to a date.

    Args:
        date_obj: A Date protobuf message
        days: Number of days to add (can be negative to subtract)

    Returns:
        A new Date protobuf message with the days added

    Raises:
        ValueError: If the date is None or incomplete
    """
    if not date_obj:
        raise ValueError("Date object is None")

    if not date_is_valid(date_obj):
        raise ValueError("Date must be valid to add days")

    # Convert to Python date, add days, then convert back
    py_date = date_to_python_date(date_obj)
    from datetime import timedelta

    new_py_date = py_date + timedelta(days=days)

    return new_date_from_python_date(new_py_date)


def date_add_months(date_obj: Date, months: int) -> Date:
    """Adds a specified number of months to a date.

    Args:
        date_obj: A Date protobuf message
        months: Number of months to add (can be negative to subtract)

    Returns:
        A new Date protobuf message with the months added

    Raises:
        ValueError: If the date is None or incomplete, or if the result is invalid
    """
    if not date_obj:
        raise ValueError("Date object is None")

    if not date_is_valid(date_obj):
        raise ValueError("Date must be valid to add months")

    # Calculate new year and month
    total_months = date_obj.year * 12 + date_obj.month - 1 + months
    new_year = total_months // 12
    new_month = (total_months % 12) + 1

    # Validate that the resulting year is within valid range
    if new_year < 1 or new_year > 9999:
        raise ValueError(f"Resulting year {new_year} is outside valid range [1, 9999]")

    # Handle day overflow (e.g., Jan 31 + 1 month should be Feb 28/29)
    new_day = date_obj.day

    # Check if the day is valid for the new month
    import calendar

    max_day = calendar.monthrange(new_year, new_month)[1]
    if new_day > max_day:
        new_day = max_day

    return new_date(new_year, new_month, new_day)


def date_add_years(date_obj: Date, years: int) -> Date:
    """Adds a specified number of years to a date.

    Args:
        date_obj: A Date protobuf message
        years: Number of years to add (can be negative to subtract)

    Returns:
        A new Date protobuf message with the years added

    Raises:
        ValueError: If the date is None or incomplete, or if the result is invalid
    """
    if not date_obj:
        raise ValueError("Date object is None")

    if not date_is_valid(date_obj):
        raise ValueError("Date must be valid to add years")

    new_year = date_obj.year + years
    new_month = date_obj.month
    new_day = date_obj.day

    # Handle leap year edge case (Feb 29 + 1 year when next year is not leap)
    if new_month == 2 and new_day == 29:
        import calendar

        if not calendar.isleap(new_year):
            new_day = 28

    return new_date(new_year, new_month, new_day)


def _validate_date(year: int, month: int, day: int) -> None:
    """Validates the year, month, and day values according to Date constraints.
    Only full dates are valid - all fields must be non-zero.

    Args:
        year: Year value
        month: Month value
        day: Day value

    Raises:
        ValueError: If the date values are invalid
    """
    # Year validation - must be non-zero
    if year < 1 or year > 9999:
        raise ValueError(f"Year must be between 1 and 9999, got {year}")

    # Month validation - must be non-zero
    if month < 1 or month > 12:
        raise ValueError(f"Month must be between 1 and 12, got {month}")

    # Day validation - must be non-zero
    if day < 1 or day > 31:
        raise ValueError(f"Day must be between 1 and 31, got {day}")

    # Check if the day is valid for the given month and year
    try:
        python_date(year, month, day)
    except ValueError as e:
        raise ValueError(f"Invalid date: {year}-{month:02d}-{day:02d}: {e}") from e
