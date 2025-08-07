"""
This module provides helper functions for working with TimeOfDay protobuf messages.
"""

from datetime import datetime, timedelta
from datetime import time as python_time

from .date_pb2 import Date
from .time_of_day_pb2 import TimeOfDay


def new_time_of_day(hours: int = 0, minutes: int = 0, seconds: int = 0, nanos: int = 0) -> TimeOfDay:
    """Creates a new TimeOfDay from hours, minutes, seconds, and nanos values.

    Args:
        hours: Hours value (0-23, default 0)
        minutes: Minutes value (0-59, default 0)
        seconds: Seconds value (0-59, default 0)
        nanos: Nanoseconds value (0-999999999, default 0)

    Returns:
        A TimeOfDay protobuf message

    Raises:
        ValueError: If the time values are invalid
    """
    _validate_time_of_day(hours, minutes, seconds, nanos)
    return TimeOfDay(hours=hours, minutes=minutes, seconds=seconds, nanos=nanos)


def new_time_of_day_from_python_time(python_time_obj: python_time) -> TimeOfDay:
    """Creates a TimeOfDay from a Python time object.

    Args:
        python_time_obj: A Python datetime.time object

    Returns:
        A TimeOfDay protobuf message
    """
    return TimeOfDay(
        hours=python_time_obj.hour,
        minutes=python_time_obj.minute,
        seconds=python_time_obj.second,
        nanos=python_time_obj.microsecond * 1000,  # Convert microseconds to nanoseconds
    )


def new_time_of_day_from_datetime(datetime_obj: datetime) -> TimeOfDay:
    """Creates a TimeOfDay from a Python datetime object.
    Only extracts the time components, ignoring the date.

    Args:
        datetime_obj: A Python datetime.datetime object

    Returns:
        A TimeOfDay protobuf message
    """
    return new_time_of_day_from_python_time(datetime_obj.time())


def new_time_of_day_from_timedelta(delta: timedelta) -> TimeOfDay:
    """Creates a TimeOfDay from a timedelta representing time since midnight.

    Args:
        delta: A timedelta object representing time elapsed since midnight

    Returns:
        A TimeOfDay protobuf message

    Raises:
        ValueError: If the timedelta is negative or >= 24 hours
    """
    if delta.total_seconds() < 0:
        raise ValueError(f"Timedelta cannot be negative: {delta}")
    if delta.total_seconds() >= 24 * 3600:
        raise ValueError(f"Timedelta cannot be 24 hours or more: {delta}")

    total_seconds = int(delta.total_seconds())
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60

    # Calculate nanoseconds from microseconds
    nanos = delta.microseconds * 1000

    return TimeOfDay(hours=hours, minutes=minutes, seconds=seconds, nanos=nanos)


def time_of_day_to_python_time(time_obj: TimeOfDay) -> python_time:
    """Converts a TimeOfDay protobuf message to a Python time object.

    Args:
        time_obj: A TimeOfDay protobuf message

    Returns:
        A Python datetime.time object

    Raises:
        ValueError: If the time is invalid or represents end of day (24:00:00)
    """
    if not time_obj:
        raise ValueError("TimeOfDay object is None")

    try:
        return python_time(
            hour=time_obj.hours,
            minute=time_obj.minutes,
            second=time_obj.seconds,
            microsecond=time_obj.nanos // 1000,  # Convert nanoseconds to microseconds
        )
    except ValueError as e:
        raise ValueError(f"Invalid time values: {e}") from e


def time_of_day_to_timedelta(time_obj: TimeOfDay) -> timedelta:
    """Converts a TimeOfDay to a timedelta representing time since midnight.

    Args:
        time_obj: A TimeOfDay protobuf message

    Returns:
        A timedelta object representing time elapsed since midnight
    """
    if not time_obj:
        return timedelta()

    return timedelta(
        hours=time_obj.hours,
        minutes=time_obj.minutes,
        seconds=time_obj.seconds,
        microseconds=time_obj.nanos // 1000,  # Convert nanoseconds to microseconds
    )


def time_of_day_to_datetime_with_date(time_obj: TimeOfDay, date_obj: Date) -> datetime:
    """Combines a TimeOfDay with a Date to create a datetime object.

    Args:
        time_obj: A TimeOfDay protobuf message
        date_obj: A Date protobuf message

    Returns:
        A Python datetime.datetime object

    Raises:
        ValueError: If either object is None/invalid or if date is incomplete
    """
    if not time_obj:
        raise ValueError("TimeOfDay object is None")
    if not date_obj:
        raise ValueError("Date object is None")

    # Import here to avoid circular imports
    from .date import date_is_complete

    if not date_is_complete(date_obj):
        raise ValueError("Date must be complete")

    try:
        return datetime(
            year=date_obj.year,
            month=date_obj.month,
            day=date_obj.day,
            hour=time_obj.hours,
            minute=time_obj.minutes,
            second=time_obj.seconds,
            microsecond=time_obj.nanos // 1000,  # Convert nanoseconds to microseconds
        )
    except ValueError as e:
        raise ValueError(f"Invalid datetime values: {e}") from e


def time_of_day_is_valid(time_obj: TimeOfDay | None) -> bool:
    """Checks if a TimeOfDay has valid values according to the protobuf constraints.

    Args:
        time_obj: A TimeOfDay protobuf message or None

    Returns:
        True if the time is valid, False otherwise
    """
    if not time_obj:
        return False

    try:
        _validate_time_of_day(time_obj.hours, time_obj.minutes, time_obj.seconds, time_obj.nanos)
        return True
    except ValueError:
        return False


def time_of_day_is_midnight(time_obj: TimeOfDay | None) -> bool:
    """Returns True if the time represents midnight (00:00:00.000000000).

    Args:
        time_obj: A TimeOfDay protobuf message or None

    Returns:
        True if the time is midnight, False otherwise
    """
    if not time_obj:
        return False
    return time_obj.hours == 0 and time_obj.minutes == 0 and time_obj.seconds == 0 and time_obj.nanos == 0


def time_of_day_to_string(time_obj: TimeOfDay | None) -> str:
    """Returns a string representation of the time in HH:MM:SS.nnnnnnnnn format.

    Args:
        time_obj: A TimeOfDay protobuf message or None

    Returns:
        String representation of the time
    """
    if not time_obj:
        return "<undefined>"

    if time_obj.nanos == 0:
        return f"{time_obj.hours:02d}:{time_obj.minutes:02d}:{time_obj.seconds:02d}"
    else:
        return f"{time_obj.hours:02d}:{time_obj.minutes:02d}:{time_obj.seconds:02d}.{time_obj.nanos:09d}"


def time_of_day_total_seconds(time_obj: TimeOfDay | None) -> float:
    """Returns the total number of seconds since midnight as a float.

    Args:
        time_obj: A TimeOfDay protobuf message or None

    Returns:
        Total seconds since midnight
    """
    if not time_obj:
        return 0.0

    return time_obj.hours * 3600 + time_obj.minutes * 60 + time_obj.seconds + time_obj.nanos / 1e9


def _validate_time_of_day(hours: int, minutes: int, seconds: int, nanos: int) -> None:
    """Validates the hours, minutes, seconds, and nanos values according to TimeOfDay constraints.

    Args:
        hours: Hours value
        minutes: Minutes value
        seconds: Seconds value
        nanos: Nanoseconds value

    Raises:
        ValueError: If the time values are invalid
    """
    # Hours validation
    if hours < 0 or hours > 23:
        raise ValueError(f"Hours must be between 0 and 23, got {hours}")

    # Minutes validation
    if minutes < 0 or minutes > 59:
        raise ValueError(f"Minutes must be between 0 and 59, got {minutes}")

    # Seconds validation
    if seconds < 0 or seconds > 59:
        raise ValueError(f"Seconds must be between 0 and 59, got {seconds}")

    # Nanos validation
    if nanos < 0 or nanos > 999999999:
        raise ValueError(f"Nanos must be between 0 and 999,999,999, got {nanos}")
