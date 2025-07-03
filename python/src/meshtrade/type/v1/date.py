"""
This module provides helper functions for working with Date protobuf messages.
"""

from datetime import date as python_date

from .date_pb2 import Date


def new_date(year: int, month: int, day: int) -> Date:
    """Creates a new Date from year, month, and day values.
    
    Args:
        year: Year value (1-9999, or 0 for partial dates)
        month: Month value (1-12, or 0 for partial dates)  
        day: Day value (1-31, or 0 for partial dates)
        
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
    return Date(
        year=python_date_obj.year,
        month=python_date_obj.month,
        day=python_date_obj.day
    )


def date_to_python_date(date_obj: Date) -> python_date:
    """Converts a Date protobuf message to a Python date object.
    
    Args:
        date_obj: A Date protobuf message
        
    Returns:
        A Python datetime.date object
        
    Raises:
        ValueError: If the date is incomplete or invalid
    """
    if not date_obj:
        raise ValueError("Date object is None")

    if not is_complete(date_obj):
        raise ValueError(f"Incomplete date: year={date_obj.year}, month={date_obj.month}, day={date_obj.day}")

    try:
        return python_date(date_obj.year, date_obj.month, date_obj.day)
    except ValueError as e:
        raise ValueError(f"Invalid date values: {e}")


def is_valid(date_obj: Date | None) -> bool:
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


def is_complete(date_obj: Date | None) -> bool:
    """Returns True if the date has non-zero year, month, and day values.
    
    Args:
        date_obj: A Date protobuf message or None
        
    Returns:
        True if the date is complete, False otherwise
    """
    if not date_obj:
        return False
    return date_obj.year != 0 and date_obj.month != 0 and date_obj.day != 0


def is_year_only(date_obj: Date | None) -> bool:
    """Returns True if only the year is specified (month and day are 0).
    
    Args:
        date_obj: A Date protobuf message or None
        
    Returns:
        True if only year is specified, False otherwise
    """
    if not date_obj:
        return False
    return date_obj.year != 0 and date_obj.month == 0 and date_obj.day == 0


def is_year_month(date_obj: Date | None) -> bool:
    """Returns True if year and month are specified but day is 0.
    
    Args:
        date_obj: A Date protobuf message or None
        
    Returns:
        True if year and month are specified but day is 0, False otherwise
    """
    if not date_obj:
        return False
    return date_obj.year != 0 and date_obj.month != 0 and date_obj.day == 0


def is_month_day(date_obj: Date | None) -> bool:
    """Returns True if month and day are specified but year is 0.
    
    Args:
        date_obj: A Date protobuf message or None
        
    Returns:
        True if month and day are specified but year is 0, False otherwise
    """
    if not date_obj:
        return False
    return date_obj.year == 0 and date_obj.month != 0 and date_obj.day != 0


def date_to_string(date_obj: Date | None) -> str:
    """Returns a string representation of the date.
    
    Args:
        date_obj: A Date protobuf message or None
        
    Returns:
        String representation of the date
    """
    if not date_obj:
        return "<None>"

    if is_complete(date_obj):
        return f"{date_obj.year:04d}-{date_obj.month:02d}-{date_obj.day:02d}"
    elif is_year_only(date_obj):
        return f"{date_obj.year:04d}"
    elif is_year_month(date_obj):
        return f"{date_obj.year:04d}-{date_obj.month:02d}"
    elif is_month_day(date_obj):
        return f"--{date_obj.month:02d}-{date_obj.day:02d}"
    else:
        return f"Date(year={date_obj.year}, month={date_obj.month}, day={date_obj.day})"


def _validate_date(year: int, month: int, day: int) -> None:
    """Validates the year, month, and day values according to Date constraints.
    
    Args:
        year: Year value
        month: Month value
        day: Day value
        
    Raises:
        ValueError: If the date values are invalid
    """
    # Year validation
    if year != 0 and (year < 1 or year > 9999):
        raise ValueError(f"Year must be 0 or between 1 and 9999, got {year}")

    # Month validation
    if month != 0 and (month < 1 or month > 12):
        raise ValueError(f"Month must be 0 or between 1 and 12, got {month}")

    # Day validation
    if day != 0 and (day < 1 or day > 31):
        raise ValueError(f"Day must be 0 or between 1 and 31, got {day}")

    # Additional validation for complete dates
    if year != 0 and month != 0 and day != 0:
        try:
            python_date(year, month, day)
        except ValueError as e:
            raise ValueError(f"Invalid date: {year}-{month:02d}-{day:02d}: {e}")

    # Validate partial date combinations
    if year == 0 and month != 0 and day == 0:
        raise ValueError("Month cannot be specified without year")
    if year == 0 and month == 0 and day != 0:
        raise ValueError("Day cannot be specified without month")
