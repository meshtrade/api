"""Unit tests for decimal operations utility functions."""

from decimal import Decimal as PyDecimal

import pytest

from meshtrade.type.v1 import decimal_operations
from meshtrade.type.v1.decimal_pb2 import Decimal


class TestDecimalArithmetic:
    """Tests for decimal arithmetic operations."""

    def test_decimal_add_positive_numbers(self):
        """Test adding two positive decimal numbers."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="20.3")
        result = decimal_operations.decimal_add(d1, d2)
        assert result.value == "30.8"

    def test_decimal_add_with_zero(self):
        """Test adding zero to a number."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="0")
        result = decimal_operations.decimal_add(d1, d2)
        assert result.value == "10.5"

    def test_decimal_add_negative_numbers(self):
        """Test adding two negative numbers."""
        d1 = Decimal(value="-10.5")
        d2 = Decimal(value="-20.3")
        result = decimal_operations.decimal_add(d1, d2)
        assert result.value == "-30.8"

    def test_decimal_sub_positive_numbers(self):
        """Test subtracting two positive decimal numbers."""
        d1 = Decimal(value="100.5")
        d2 = Decimal(value="30.2")
        result = decimal_operations.decimal_sub(d1, d2)
        assert result.value == "70.3"

    def test_decimal_sub_resulting_in_negative(self):
        """Test subtraction resulting in negative value."""
        d1 = Decimal(value="10")
        d2 = Decimal(value="20")
        result = decimal_operations.decimal_sub(d1, d2)
        assert result.value == "-10"

    def test_decimal_mul_positive_numbers(self):
        """Test multiplying two positive decimal numbers."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="2")
        result = decimal_operations.decimal_mul(d1, d2)
        assert result.value == "21.0"

    def test_decimal_mul_by_zero(self):
        """Test multiplying by zero."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="0")
        result = decimal_operations.decimal_mul(d1, d2)
        # Result may be "0" or "0.0" depending on Python decimal behavior
        assert PyDecimal(result.value) == PyDecimal("0")

    def test_decimal_div_positive_numbers(self):
        """Test dividing two positive decimal numbers."""
        d1 = Decimal(value="100")
        d2 = Decimal(value="4")
        result = decimal_operations.decimal_div(d1, d2)
        assert result.value == "25"

    def test_decimal_div_by_zero_raises_error(self):
        """Test that division by zero raises ZeroDivisionError."""
        d1 = Decimal(value="100")
        d2 = Decimal(value="0")
        with pytest.raises(ZeroDivisionError, match="cannot divide by zero"):
            decimal_operations.decimal_div(d1, d2)

    def test_decimal_div_resulting_in_fraction(self):
        """Test division resulting in fractional value."""
        d1 = Decimal(value="10")
        d2 = Decimal(value="3")
        result = decimal_operations.decimal_div(d1, d2)
        # Should have many decimal places - check starts with 3.333
        result_decimal = PyDecimal(result.value)
        assert result_decimal > PyDecimal("3.333")
        assert result_decimal < PyDecimal("3.334")


class TestDecimalComparisons:
    """Tests for decimal comparison operations."""

    def test_decimal_equal_same_values(self):
        """Test equality with identical values."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="10.5")
        assert decimal_operations.decimal_equal(d1, d2) is True

    def test_decimal_equal_different_values(self):
        """Test equality with different values."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="20.3")
        assert decimal_operations.decimal_equal(d1, d2) is False

    def test_decimal_equal_zero_values(self):
        """Test equality with zero values."""
        d1 = Decimal(value="0")
        d2 = Decimal(value="0")
        assert decimal_operations.decimal_equal(d1, d2) is True

    def test_decimal_less_than_true(self):
        """Test less than comparison when true."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="20.3")
        assert decimal_operations.decimal_less_than(d1, d2) is True

    def test_decimal_less_than_false(self):
        """Test less than comparison when false."""
        d1 = Decimal(value="20.3")
        d2 = Decimal(value="10.5")
        assert decimal_operations.decimal_less_than(d1, d2) is False

    def test_decimal_less_than_equal_values(self):
        """Test less than with equal values (should be false)."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="10.5")
        assert decimal_operations.decimal_less_than(d1, d2) is False

    def test_decimal_less_than_or_equal_less(self):
        """Test less than or equal when less."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="20.3")
        assert decimal_operations.decimal_less_than_or_equal(d1, d2) is True

    def test_decimal_less_than_or_equal_equal(self):
        """Test less than or equal when equal."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="10.5")
        assert decimal_operations.decimal_less_than_or_equal(d1, d2) is True

    def test_decimal_less_than_or_equal_greater(self):
        """Test less than or equal when greater."""
        d1 = Decimal(value="20.3")
        d2 = Decimal(value="10.5")
        assert decimal_operations.decimal_less_than_or_equal(d1, d2) is False

    def test_decimal_greater_than_true(self):
        """Test greater than comparison when true."""
        d1 = Decimal(value="20.3")
        d2 = Decimal(value="10.5")
        assert decimal_operations.decimal_greater_than(d1, d2) is True

    def test_decimal_greater_than_false(self):
        """Test greater than comparison when false."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="20.3")
        assert decimal_operations.decimal_greater_than(d1, d2) is False

    def test_decimal_greater_than_equal_values(self):
        """Test greater than with equal values (should be false)."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="10.5")
        assert decimal_operations.decimal_greater_than(d1, d2) is False

    def test_decimal_greater_than_or_equal_greater(self):
        """Test greater than or equal when greater."""
        d1 = Decimal(value="20.3")
        d2 = Decimal(value="10.5")
        assert decimal_operations.decimal_greater_than_or_equal(d1, d2) is True

    def test_decimal_greater_than_or_equal_equal(self):
        """Test greater than or equal when equal."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="10.5")
        assert decimal_operations.decimal_greater_than_or_equal(d1, d2) is True

    def test_decimal_greater_than_or_equal_less(self):
        """Test greater than or equal when less."""
        d1 = Decimal(value="10.5")
        d2 = Decimal(value="20.3")
        assert decimal_operations.decimal_greater_than_or_equal(d1, d2) is False


class TestDecimalUtilities:
    """Tests for decimal utility operations."""

    def test_decimal_is_zero_with_zero(self):
        """Test is_zero with zero value."""
        d = Decimal(value="0")
        assert decimal_operations.decimal_is_zero(d) is True

    def test_decimal_is_zero_with_nonzero(self):
        """Test is_zero with non-zero value."""
        d = Decimal(value="0.001")
        assert decimal_operations.decimal_is_zero(d) is False

    def test_decimal_is_zero_with_negative_zero(self):
        """Test is_zero with negative zero (should be true)."""
        d = Decimal(value="-0")
        assert decimal_operations.decimal_is_zero(d) is True

    def test_decimal_is_negative_with_negative_value(self):
        """Test is_negative with negative value."""
        d = Decimal(value="-10.5")
        assert decimal_operations.decimal_is_negative(d) is True

    def test_decimal_is_negative_with_positive_value(self):
        """Test is_negative with positive value."""
        d = Decimal(value="10.5")
        assert decimal_operations.decimal_is_negative(d) is False

    def test_decimal_is_negative_with_zero(self):
        """Test is_negative with zero (should be false)."""
        d = Decimal(value="0")
        assert decimal_operations.decimal_is_negative(d) is False

    def test_decimal_is_positive_with_positive_value(self):
        """Test is_positive with positive value."""
        d = Decimal(value="10.5")
        assert decimal_operations.decimal_is_positive(d) is True

    def test_decimal_is_positive_with_negative_value(self):
        """Test is_positive with negative value."""
        d = Decimal(value="-10.5")
        assert decimal_operations.decimal_is_positive(d) is False

    def test_decimal_is_positive_with_zero(self):
        """Test is_positive with zero (should be false)."""
        d = Decimal(value="0")
        assert decimal_operations.decimal_is_positive(d) is False

    def test_decimal_round_positive_places(self):
        """Test rounding to positive decimal places."""
        d = Decimal(value="5.45")
        result = decimal_operations.decimal_round(d, 1)
        # ROUND_HALF_UP: 5.45 rounds to 5.5
        assert result.value == "5.5"

    def test_decimal_round_zero_places(self):
        """Test rounding to zero decimal places."""
        d = Decimal(value="5.67")
        result = decimal_operations.decimal_round(d, 0)
        # ROUND_HALF_UP: 5.67 rounds to 6
        assert result.value == "6"

    def test_decimal_round_negative_places(self):
        """Test rounding to negative decimal places (round integer part)."""
        d = Decimal(value="545")
        result = decimal_operations.decimal_round(d, -1)
        # ROUND_HALF_UP: 545 has 5 in the ones place, rounds UP to 550
        assert result.value == "550"

    def test_decimal_round_negative_places_larger(self):
        """Test rounding to -2 decimal places (nearest 100)."""
        d = Decimal(value="12350")
        result = decimal_operations.decimal_round(d, -2)
        # ROUND_HALF_UP: 12350 has 5 in the tens place, rounds UP to 12400
        assert result.value == "12400"
