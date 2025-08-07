"""
Comprehensive unit tests for time_of_day helper functions.
"""

from datetime import datetime, timedelta
from datetime import time as python_time

import pytest

from meshtrade.type.v1.date import new_date
from meshtrade.type.v1.time_of_day import (
    new_time_of_day,
    new_time_of_day_from_datetime,
    new_time_of_day_from_python_time,
    new_time_of_day_from_timedelta,
    time_of_day_is_midnight,
    time_of_day_is_valid,
    time_of_day_to_datetime_with_date,
    time_of_day_to_python_time,
    time_of_day_to_string,
    time_of_day_to_timedelta,
    time_of_day_total_seconds,
)
from meshtrade.type.v1.time_of_day_pb2 import TimeOfDay


class TestNewTimeOfDay:
    """Test cases for new_time_of_day function."""

    @pytest.mark.parametrize(
        "hours,minutes,seconds,nanos,expected_error",
        [
            (0, 0, 0, 0, None),  # Valid midnight
            (12, 0, 0, 0, None),  # Valid noon
            (23, 59, 59, 999999999, None),  # Valid end of day
            (-1, 0, 0, 0, "Hours must be between 0 and 23"),  # Invalid hours too low
            (24, 0, 0, 0, "Hours must be between 0 and 23"),  # Invalid hours too high
            (12, -1, 0, 0, "Minutes must be between 0 and 59"),  # Invalid minutes too low
            (12, 60, 0, 0, "Minutes must be between 0 and 59"),  # Invalid minutes too high
            (12, 30, -1, 0, "Seconds must be between 0 and 59"),  # Invalid seconds too low
            (12, 30, 60, 0, "Seconds must be between 0 and 59"),  # Invalid seconds too high
            (12, 30, 45, -1, "Nanos must be between 0 and 999,999,999"),  # Invalid nanos too low
            (12, 30, 45, 1000000000, "Nanos must be between 0 and 999,999,999"),  # Invalid nanos too high
        ],
    )
    def test_new_time_of_day_validation(self, hours, minutes, seconds, nanos, expected_error):
        """Test time creation with various valid and invalid inputs."""
        if expected_error:
            with pytest.raises(ValueError, match=expected_error):
                new_time_of_day(hours, minutes, seconds, nanos)
        else:
            result = new_time_of_day(hours, minutes, seconds, nanos)
            assert result.hours == hours
            assert result.minutes == minutes
            assert result.seconds == seconds
            assert result.nanos == nanos

    def test_new_time_of_day_defaults(self):
        """Test time creation with default parameters."""
        result = new_time_of_day()
        assert result.hours == 0
        assert result.minutes == 0
        assert result.seconds == 0
        assert result.nanos == 0


class TestNewTimeOfDayFromPythonTime:
    """Test cases for new_time_of_day_from_python_time function."""

    @pytest.mark.parametrize(
        "python_time_obj,expected_hours,expected_minutes,expected_seconds,expected_nanos",
        [
            (python_time(0, 0, 0, 0), 0, 0, 0, 0),
            (python_time(12, 0, 0, 0), 12, 0, 0, 0),
            (python_time(15, 30, 45, 123000), 15, 30, 45, 123000000),  # 123000 microseconds = 123000000 nanos
            (python_time(23, 59, 59, 999999), 23, 59, 59, 999999000),
        ],
    )
    def test_new_time_of_day_from_python_time(self, python_time_obj, expected_hours, expected_minutes, expected_seconds, expected_nanos):
        """Test creating TimeOfDay from Python time objects."""
        result = new_time_of_day_from_python_time(python_time_obj)
        assert result.hours == expected_hours
        assert result.minutes == expected_minutes
        assert result.seconds == expected_seconds
        assert result.nanos == expected_nanos


class TestNewTimeOfDayFromDatetime:
    """Test cases for new_time_of_day_from_datetime function."""

    @pytest.mark.parametrize(
        "datetime_obj,expected_hours,expected_minutes,expected_seconds,expected_nanos",
        [
            (datetime(2023, 12, 25, 0, 0, 0, 0), 0, 0, 0, 0),
            (datetime(2023, 12, 25, 12, 0, 0, 0), 12, 0, 0, 0),
            (datetime(2023, 12, 25, 15, 30, 45, 123000), 15, 30, 45, 123000000),
            (datetime(2023, 12, 25, 23, 59, 59, 999999), 23, 59, 59, 999999000),
        ],
    )
    def test_new_time_of_day_from_datetime(self, datetime_obj, expected_hours, expected_minutes, expected_seconds, expected_nanos):
        """Test creating TimeOfDay from datetime objects."""
        result = new_time_of_day_from_datetime(datetime_obj)
        assert result.hours == expected_hours
        assert result.minutes == expected_minutes
        assert result.seconds == expected_seconds
        assert result.nanos == expected_nanos


class TestNewTimeOfDayFromTimedelta:
    """Test cases for new_time_of_day_from_timedelta function."""

    @pytest.mark.parametrize(
        "timedelta_obj,expected_error",
        [
            (timedelta(0), None),  # Midnight
            (timedelta(hours=1), None),  # One hour
            (timedelta(hours=2, minutes=30, seconds=45, microseconds=123000), None),  # Complex time
            (timedelta(hours=23, minutes=59, seconds=59, microseconds=999999), None),  # Almost 24 hours
            (timedelta(hours=-1), "Timedelta cannot be negative"),  # Negative timedelta
            (timedelta(hours=24), "Timedelta cannot be 24 hours or more"),  # Exactly 24 hours
            (timedelta(hours=25), "Timedelta cannot be 24 hours or more"),  # More than 24 hours
        ],
    )
    def test_new_time_of_day_from_timedelta(self, timedelta_obj, expected_error):
        """Test creating TimeOfDay from timedelta objects."""
        if expected_error:
            with pytest.raises(ValueError, match=expected_error):
                new_time_of_day_from_timedelta(timedelta_obj)
        else:
            result = new_time_of_day_from_timedelta(timedelta_obj)
            assert isinstance(result, TimeOfDay)
            # Verify the conversion is reasonable
            total_seconds_orig = timedelta_obj.total_seconds()
            total_seconds_result = result.hours * 3600 + result.minutes * 60 + result.seconds + result.nanos / 1e9
            assert abs(total_seconds_orig - total_seconds_result) < 0.001


class TestIsValid:
    """Test cases for is_valid function."""

    @pytest.mark.parametrize(
        "time_obj,expected",
        [
            (None, False),
            (new_time_of_day(0, 0, 0, 0), True),  # Valid midnight
            (new_time_of_day(12, 0, 0, 0), True),  # Valid noon
            (new_time_of_day(23, 59, 59, 999999999), True),  # Valid end of day
            (TimeOfDay(hours=24, minutes=0, seconds=0, nanos=0), False),  # Invalid hours
            (TimeOfDay(hours=12, minutes=60, seconds=0, nanos=0), False),  # Invalid minutes
            (TimeOfDay(hours=12, minutes=30, seconds=60, nanos=0), False),  # Invalid seconds
            (TimeOfDay(hours=12, minutes=30, seconds=45, nanos=1000000000), False),  # Invalid nanos
        ],
    )
    def test_is_valid(self, time_obj, expected):
        """Test time validation."""
        assert time_of_day_is_valid(time_obj) == expected


class TestIsMidnight:
    """Test cases for is_midnight function."""

    @pytest.mark.parametrize(
        "time_obj,expected",
        [
            (None, False),
            (new_time_of_day(0, 0, 0, 0), True),  # Midnight
            (new_time_of_day(1, 0, 0, 0), False),  # Not midnight - 1 hour
            (new_time_of_day(0, 1, 0, 0), False),  # Not midnight - 1 minute
            (new_time_of_day(0, 0, 1, 0), False),  # Not midnight - 1 second
            (new_time_of_day(0, 0, 0, 1), False),  # Not midnight - 1 nano
        ],
    )
    def test_is_midnight(self, time_obj, expected):
        """Test midnight check."""
        assert time_of_day_is_midnight(time_obj) == expected


class TestTimeOfDayToPythonTime:
    """Test cases for time_of_day_to_python_time function."""

    def test_valid_conversion(self):
        """Test successful conversion to Python time."""
        proto_time = new_time_of_day(15, 30, 45, 123000000)
        python_time_obj = time_of_day_to_python_time(proto_time)
        assert python_time_obj == python_time(15, 30, 45, 123000)  # 123000000 nanos = 123000 micros

    def test_invalid_conversions(self):
        """Test error cases for conversion."""
        with pytest.raises(ValueError, match="TimeOfDay object is None"):
            time_of_day_to_python_time(None)  # type: ignore


class TestTimeOfDayToDatetimeWithDate:
    """Test cases for time_of_day_to_datetime_with_date function."""

    def test_valid_conversion(self):
        """Test successful conversion to datetime."""
        proto_time = new_time_of_day(15, 30, 45, 123000000)
        proto_date = new_date(2023, 12, 25)
        result = time_of_day_to_datetime_with_date(proto_time, proto_date)
        expected = datetime(2023, 12, 25, 15, 30, 45, 123000)
        assert result == expected

    def test_invalid_conversions(self):
        """Test error cases for conversion."""
        proto_time = new_time_of_day(12, 0, 0, 0)
        proto_date = new_date(2023, 12, 25)

        # None time
        with pytest.raises(ValueError, match="TimeOfDay object is None"):
            time_of_day_to_datetime_with_date(None, proto_date)  # type: ignore

        # None date
        with pytest.raises(ValueError, match="Date object is None"):
            time_of_day_to_datetime_with_date(proto_time, None)  # type: ignore


class TestTimeOfDayToString:
    """Test cases for time_of_day_to_string function."""

    @pytest.mark.parametrize(
        "time_obj,expected",
        [
            (None, "<undefined>"),
            (new_time_of_day(0, 0, 0, 0), "00:00:00"),
            (new_time_of_day(12, 0, 0, 0), "12:00:00"),
            (new_time_of_day(15, 30, 45, 0), "15:30:45"),
            (new_time_of_day(15, 30, 45, 123456789), "15:30:45.123456789"),
            (new_time_of_day(1, 2, 3, 4), "01:02:03.000000004"),
            (new_time_of_day(23, 59, 59, 999999999), "23:59:59.999999999"),
        ],
    )
    def test_time_of_day_to_string(self, time_obj, expected):
        """Test string representation of times."""
        assert time_of_day_to_string(time_obj) == expected


class TestTimeOfDayToTimedelta:
    """Test cases for time_of_day_to_timedelta function."""

    @pytest.mark.parametrize(
        "time_obj,expected_seconds",
        [
            (None, 0),
            (new_time_of_day(0, 0, 0, 0), 0),  # Midnight
            (new_time_of_day(1, 0, 0, 0), 3600),  # One hour
            (new_time_of_day(0, 1, 0, 0), 60),  # One minute
            (new_time_of_day(0, 0, 1, 0), 1),  # One second
            (new_time_of_day(2, 30, 45, 123000000), 2 * 3600 + 30 * 60 + 45 + 0.123),  # Complex time
            (new_time_of_day(23, 59, 59, 999999999), 23 * 3600 + 59 * 60 + 59 + 0.999999999),  # End of day
        ],
    )
    def test_time_of_day_to_timedelta(self, time_obj, expected_seconds):
        """Test conversion to timedelta."""
        result = time_of_day_to_timedelta(time_obj)
        assert abs(result.total_seconds() - expected_seconds) < 0.001


class TestTotalSeconds:
    """Test cases for total_seconds function."""

    @pytest.mark.parametrize(
        "time_obj,expected",
        [
            (None, 0),
            (new_time_of_day(0, 0, 0, 0), 0),  # Midnight
            (new_time_of_day(1, 0, 0, 0), 3600),  # One hour
            (new_time_of_day(0, 1, 0, 0), 60),  # One minute
            (new_time_of_day(0, 0, 1, 0), 1),  # One second
            (new_time_of_day(0, 0, 0, 500000000), 0.5),  # Half second
            (new_time_of_day(2, 30, 45, 123456789), 2 * 3600 + 30 * 60 + 45 + 0.123456789),  # Complex time
            (new_time_of_day(23, 59, 59, 999999999), 23 * 3600 + 59 * 60 + 59 + 0.999999999),  # End of day
        ],
    )
    def test_total_seconds(self, time_obj, expected):
        """Test total seconds calculation."""
        result = time_of_day_total_seconds(time_obj)
        assert abs(result - expected) < 0.000000001  # Allow small floating point differences
