"""
Comprehensive unit tests for date helper functions.
"""

import pytest
from datetime import datetime, date as python_date

from meshtrade.type.v1.date_pb2 import Date
from meshtrade.type.v1.date import (
    new_date,
    new_date_from_python_date,
    new_date_from_datetime,
    is_valid,
    is_complete,
    is_year_only,
    is_year_month,
    is_month_day,
    date_to_python_date,
    date_to_string,
    is_before,
    is_after,
    is_equal,
    is_before_or_equal,
    is_after_or_equal,
    add_days,
    add_months,
    add_years
)


class TestNewDate:
    """Test cases for new_date function."""

    @pytest.mark.parametrize("year,month,day,expected_error", [
        (2023, 12, 25, None),  # Valid complete date
        (2023, 0, 0, None),    # Valid year only
        (2023, 12, 0, None),   # Valid year-month
        (10000, 1, 1, "Year must be 0 or between 1 and 9999"),  # Invalid year too high
        (2023, 13, 1, "Month must be 0 or between 1 and 12"),   # Invalid month too high
        (2023, 1, 32, "Day must be 0 or between 1 and 31"),     # Invalid day too high
        (2023, 2, 30, "Invalid date"),                          # Invalid date February 30
        (2023, 2, 29, "Invalid date"),                          # Invalid leap year
        (2024, 2, 29, None),                                    # Valid leap year
        (0, 1, 0, "Month cannot be specified without year"),    # Month without year
        (2023, 0, 1, "Day cannot be specified without month"),  # Day without month
    ])
    def test_new_date_validation(self, year, month, day, expected_error):
        """Test date creation with various valid and invalid inputs."""
        if expected_error:
            with pytest.raises(ValueError, match=expected_error):
                new_date(year, month, day)
        else:
            result = new_date(year, month, day)
            assert result.year == year
            assert result.month == month
            assert result.day == day

    def test_new_date_valid_cases(self):
        """Test specific valid date creation cases."""
        # Test complete date
        date = new_date(2023, 12, 25)
        assert isinstance(date, Date)
        assert date.year == 2023
        assert date.month == 12
        assert date.day == 25

        # Test year only
        date = new_date(2023, 0, 0)
        assert date.year == 2023
        assert date.month == 0
        assert date.day == 0


class TestNewDateFromPythonDate:
    """Test cases for new_date_from_python_date function."""

    @pytest.mark.parametrize("python_date_obj,expected_year,expected_month,expected_day", [
        (python_date(2023, 12, 25), 2023, 12, 25),
        (python_date(2024, 2, 29), 2024, 2, 29),  # Leap year
        (python_date(2023, 1, 1), 2023, 1, 1),    # First day of year
        (python_date(2023, 12, 31), 2023, 12, 31), # Last day of year
    ])
    def test_new_date_from_python_date(self, python_date_obj, expected_year, expected_month, expected_day):
        """Test creating Date from Python date objects."""
        result = new_date_from_python_date(python_date_obj)
        assert result.year == expected_year
        assert result.month == expected_month
        assert result.day == expected_day


class TestNewDateFromDatetime:
    """Test cases for new_date_from_datetime function."""

    @pytest.mark.parametrize("datetime_obj,expected_year,expected_month,expected_day", [
        (datetime(2023, 12, 25, 15, 30, 45), 2023, 12, 25),
        (datetime(2024, 2, 29, 0, 0, 0), 2024, 2, 29),
    ])
    def test_new_date_from_datetime(self, datetime_obj, expected_year, expected_month, expected_day):
        """Test creating Date from datetime objects."""
        result = new_date_from_datetime(datetime_obj)
        assert result.year == expected_year
        assert result.month == expected_month
        assert result.day == expected_day


class TestIsValid:
    """Test cases for is_valid function."""

    @pytest.mark.parametrize("date_obj,expected", [
        (None, False),
        (new_date(2023, 12, 25), True),    # Valid complete date
        (new_date(2023, 0, 0), True),      # Valid year only
        (new_date(2023, 12, 0), True),     # Valid year-month
        (Date(year=10000, month=1, day=1), False),  # Invalid year too high
        (Date(year=2023, month=13, day=1), False),  # Invalid month too high
        (Date(year=2023, month=1, day=32), False),  # Invalid day too high
        (Date(year=2023, month=2, day=30), False),  # Invalid date February 30
    ])
    def test_is_valid(self, date_obj, expected):
        """Test date validation."""
        assert is_valid(date_obj) == expected


class TestIsComplete:
    """Test cases for is_complete function."""

    @pytest.mark.parametrize("date_obj,expected", [
        (None, False),
        (new_date(2023, 12, 25), True),    # Complete date
        (new_date(2023, 0, 0), False),     # Year only
        (new_date(2023, 12, 0), False),    # Year-month
        (Date(year=0, month=0, day=0), False),  # Zero date
    ])
    def test_is_complete(self, date_obj, expected):
        """Test complete date check."""
        assert is_complete(date_obj) == expected


class TestIsYearOnly:
    """Test cases for is_year_only function."""

    @pytest.mark.parametrize("date_obj,expected", [
        (None, False),
        (new_date(2023, 12, 25), False),   # Complete date
        (new_date(2023, 0, 0), True),      # Year only
        (new_date(2023, 12, 0), False),    # Year-month
        (Date(year=0, month=0, day=0), False),  # Zero date
    ])
    def test_is_year_only(self, date_obj, expected):
        """Test year-only date check."""
        assert is_year_only(date_obj) == expected


class TestIsYearMonth:
    """Test cases for is_year_month function."""

    @pytest.mark.parametrize("date_obj,expected", [
        (None, False),
        (new_date(2023, 12, 25), False),   # Complete date
        (new_date(2023, 0, 0), False),     # Year only
        (new_date(2023, 12, 0), True),     # Year-month
        (Date(year=0, month=0, day=0), False),  # Zero date
    ])
    def test_is_year_month(self, date_obj, expected):
        """Test year-month date check."""
        assert is_year_month(date_obj) == expected


class TestIsMonthDay:
    """Test cases for is_month_day function."""

    @pytest.mark.parametrize("date_obj,expected", [
        (None, False),
        (new_date(2023, 12, 25), False),   # Complete date
        (new_date(2023, 0, 0), False),     # Year only
        (new_date(2023, 12, 0), False),    # Year-month
        (Date(year=0, month=12, day=25), True),  # Month-day
        (Date(year=0, month=0, day=0), False),   # Zero date
    ])
    def test_is_month_day(self, date_obj, expected):
        """Test month-day date check."""
        assert is_month_day(date_obj) == expected


class TestDateToPythonDate:
    """Test cases for date_to_python_date function."""

    def test_valid_conversion(self):
        """Test successful conversion to Python date."""
        proto_date = new_date(2023, 12, 25)
        python_date_obj = date_to_python_date(proto_date)
        assert python_date_obj == python_date(2023, 12, 25)

    def test_invalid_conversions(self):
        """Test error cases for conversion."""
        # Incomplete date
        with pytest.raises(ValueError, match="Incomplete date"):
            date_to_python_date(new_date(2023, 0, 0))

        # None date
        with pytest.raises(ValueError, match="Date object is None"):
            date_to_python_date(None)


class TestDateToString:
    """Test cases for date_to_string function."""

    @pytest.mark.parametrize("date_obj,expected", [
        (None, "<undefined>"),
        (new_date(2023, 12, 25), "2023-12-25"),
        (new_date(2023, 0, 0), "2023"),
        (new_date(2023, 12, 0), "2023-12"),
        (Date(year=0, month=12, day=25), "--12-25"),
    ])
    def test_date_to_string(self, date_obj, expected):
        """Test string representation of dates."""
        assert date_to_string(date_obj) == expected


class TestDateComparisons:
    """Test cases for date comparison functions."""

    def setup_method(self):
        """Set up test dates."""
        self.date1 = new_date(2023, 12, 25)
        self.date2 = new_date(2023, 12, 26)
        self.date3 = new_date(2023, 12, 25)  # Same as date1

    def test_is_before(self):
        """Test is_before function."""
        assert is_before(self.date1, self.date2) is True
        assert is_before(self.date2, self.date1) is False
        assert is_before(self.date1, self.date3) is False

    def test_is_after(self):
        """Test is_after function."""
        assert is_after(self.date2, self.date1) is True
        assert is_after(self.date1, self.date2) is False
        assert is_after(self.date1, self.date3) is False

    def test_is_equal(self):
        """Test is_equal function."""
        assert is_equal(self.date1, self.date3) is True
        assert is_equal(self.date1, self.date2) is False
        assert is_equal(None, None) is True
        assert is_equal(self.date1, None) is False

    def test_is_before_or_equal(self):
        """Test is_before_or_equal function."""
        assert is_before_or_equal(self.date1, self.date2) is True
        assert is_before_or_equal(self.date1, self.date3) is True
        assert is_before_or_equal(self.date2, self.date1) is False

    def test_is_after_or_equal(self):
        """Test is_after_or_equal function."""
        assert is_after_or_equal(self.date2, self.date1) is True
        assert is_after_or_equal(self.date1, self.date3) is True
        assert is_after_or_equal(self.date1, self.date2) is False


class TestAddDays:
    """Test cases for add_days function."""

    def test_valid_add_days(self):
        """Test adding days to valid dates."""
        date = new_date(2023, 12, 25)
        
        # Add 1 day
        result = add_days(date, 1)
        assert is_valid(result)
        assert is_complete(result)
        
        # Subtract 1 day
        result = add_days(date, -1)
        assert is_valid(result)
        assert is_complete(result)
        
        # Add 0 days
        result = add_days(date, 0)
        assert result.year == 2023
        assert result.month == 12
        assert result.day == 25

    def test_invalid_add_days(self):
        """Test error cases for add_days."""
        incomplete_date = new_date(2023, 0, 0)
        with pytest.raises(ValueError, match="Date must be complete"):
            add_days(incomplete_date, 1)

        with pytest.raises(ValueError, match="Date object is None"):
            add_days(None, 1)


class TestAddMonths:
    """Test cases for add_months function."""

    def test_valid_add_months(self):
        """Test adding months to valid dates."""
        date = new_date(2023, 12, 25)
        
        # Add 1 month
        result = add_months(date, 1)
        assert is_valid(result)
        assert is_complete(result)
        
        # Subtract 1 month
        result = add_months(date, -1)
        assert is_valid(result)
        assert is_complete(result)

    def test_month_overflow(self):
        """Test month overflow handling."""
        # January 31 + 1 month should be February 28 (non-leap year)
        jan31 = new_date(2023, 1, 31)
        result = add_months(jan31, 1)
        assert result.year == 2023
        assert result.month == 2
        assert result.day == 28

        # January 31 + 1 month should be February 29 (leap year)
        jan31_leap = new_date(2024, 1, 31)
        result = add_months(jan31_leap, 1)
        assert result.year == 2024
        assert result.month == 2
        assert result.day == 29

    def test_year_constraint_validation(self):
        """Test that add_months validates year constraints."""
        # Test year going too high
        date_high = new_date(9999, 12, 25)
        with pytest.raises(ValueError, match="Resulting year .* is outside valid range"):
            add_months(date_high, 12)
        
        # Test year going too low  
        date_low = new_date(1, 1, 15)
        with pytest.raises(ValueError, match="Resulting year .* is outside valid range"):
            add_months(date_low, -12)

    def test_invalid_add_months(self):
        """Test error cases for add_months."""
        incomplete_date = new_date(2023, 0, 0)
        with pytest.raises(ValueError, match="Date must be complete"):
            add_months(incomplete_date, 1)

        with pytest.raises(ValueError, match="Date object is None"):
            add_months(None, 1)


class TestAddYears:
    """Test cases for add_years function."""

    def test_valid_add_years(self):
        """Test adding years to valid dates."""
        date = new_date(2023, 12, 25)
        
        # Add 1 year
        result = add_years(date, 1)
        assert is_valid(result)
        assert is_complete(result)
        assert result.year == 2024
        
        # Subtract 1 year
        result = add_years(date, -1)
        assert is_valid(result)
        assert is_complete(result)
        assert result.year == 2022

    def test_leap_year_overflow(self):
        """Test leap year day overflow handling."""
        # February 29, 2024 + 1 year should be February 28, 2025
        feb29 = new_date(2024, 2, 29)
        result = add_years(feb29, 1)
        assert result.year == 2025
        assert result.month == 2
        assert result.day == 28

    def test_invalid_add_years(self):
        """Test error cases for add_years."""
        incomplete_date = new_date(2023, 0, 0)
        with pytest.raises(ValueError, match="Date must be complete"):
            add_years(incomplete_date, 1)

        with pytest.raises(ValueError, match="Date object is None"):
            add_years(None, 1)