"""Unit tests for amount utility functions."""

from decimal import Decimal as PyDecimal

import pytest

from meshtrade.type.v1 import amount
from meshtrade.type.v1.ledger_pb2 import Ledger
from meshtrade.type.v1.token_pb2 import Token


class TestAmountCreation:
    """Tests for amount creation functions."""

    def test_new_undefined_amount(self):
        """Test creating an undefined amount."""
        amt = amount.new_undefined_amount(PyDecimal("100"))
        assert amt.value.value == "100"
        assert amount.amount_is_undefined(amt) is True

    def test_new_undefined_amount_negative(self):
        """Test creating undefined amount with negative value."""
        amt = amount.new_undefined_amount(PyDecimal("-50.25"))
        assert amt.value.value == "-50.25"

    def test_new_undefined_amount_zero(self):
        """Test creating undefined amount with zero."""
        amt = amount.new_undefined_amount(PyDecimal("0"))
        assert amt.value.value == "0"


class TestAmountSetValue:
    """Tests for amount_set_value function."""

    def test_amount_set_value_basic(self):
        """Test setting a new value on an amount."""
        original = amount.new_undefined_amount(PyDecimal("100"))
        modified = amount.amount_set_value(original, PyDecimal("200"))
        # Original should be unchanged
        assert original.value.value == "100"
        # Modified should have new value
        assert modified.value.value == "200"

    def test_amount_set_value_with_none(self):
        """Test that None amount returns None."""
        result = amount.amount_set_value(None, PyDecimal("100"))
        assert result is None

    def test_amount_set_value_preserves_token(self):
        """Test that set_value preserves the token."""
        tok = Token(code="USD", issuer="ISSUER", ledger=Ledger.LEDGER_STELLAR)
        amt = amount.token_new_amount_of(tok, PyDecimal("100"))
        modified = amount.amount_set_value(amt, PyDecimal("200"))
        assert modified.token.code == "USD"
        assert modified.token.issuer == "ISSUER"


class TestAmountIsUndefined:
    """Tests for amount_is_undefined function."""

    def test_amount_is_undefined_with_undefined_amount(self):
        """Test that undefined amount is recognized."""
        amt = amount.new_undefined_amount(PyDecimal("100"))
        assert amount.amount_is_undefined(amt) is True

    def test_amount_is_undefined_with_defined_amount(self):
        """Test that defined amount is not undefined."""
        tok = Token(code="USD", issuer="ISSUER", ledger=Ledger.LEDGER_STELLAR)
        amt = amount.token_new_amount_of(tok, PyDecimal("100"))
        assert amount.amount_is_undefined(amt) is False

    def test_amount_is_undefined_with_none(self):
        """Test that None is considered undefined."""
        assert amount.amount_is_undefined(None) is True


class TestAmountIsSameTypeAs:
    """Tests for amount_is_same_type_as function."""

    def test_amount_is_same_type_as_same_tokens(self):
        """Test that amounts with same tokens are same type."""
        amt1 = amount.new_undefined_amount(PyDecimal("100"))
        amt2 = amount.new_undefined_amount(PyDecimal("200"))
        assert amount.amount_is_same_type_as(amt1, amt2) is True

    def test_amount_is_same_type_as_different_tokens(self):
        """Test that amounts with different tokens are not same type."""
        tok1 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        tok2 = Token(code="EUR", issuer="ISSUER2", ledger=Ledger.LEDGER_STELLAR)
        amt1 = amount.token_new_amount_of(tok1, PyDecimal("100"))
        amt2 = amount.token_new_amount_of(tok2, PyDecimal("100"))
        assert amount.amount_is_same_type_as(amt1, amt2) is False

    def test_amount_is_same_type_as_with_none(self):
        """Test that None amounts are not same type."""
        amt1 = amount.new_undefined_amount(PyDecimal("100"))
        assert amount.amount_is_same_type_as(amt1, None) is False
        assert amount.amount_is_same_type_as(None, amt1) is False


class TestAmountIsEqualTo:
    """Tests for amount_is_equal_to function."""

    def test_amount_is_equal_to_same_value_and_token(self):
        """Test that amounts with same value and token are equal."""
        amt1 = amount.new_undefined_amount(PyDecimal("100"))
        amt2 = amount.new_undefined_amount(PyDecimal("100"))
        assert amount.amount_is_equal_to(amt1, amt2) is True

    def test_amount_is_equal_to_different_values(self):
        """Test that amounts with different values are not equal."""
        amt1 = amount.new_undefined_amount(PyDecimal("100"))
        amt2 = amount.new_undefined_amount(PyDecimal("200"))
        assert amount.amount_is_equal_to(amt1, amt2) is False

    def test_amount_is_equal_to_different_tokens(self):
        """Test that amounts with different tokens are not equal."""
        tok1 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        tok2 = Token(code="EUR", issuer="ISSUER2", ledger=Ledger.LEDGER_STELLAR)
        amt1 = amount.token_new_amount_of(tok1, PyDecimal("100"))
        amt2 = amount.token_new_amount_of(tok2, PyDecimal("100"))
        assert amount.amount_is_equal_to(amt1, amt2) is False

    def test_amount_is_equal_to_both_none(self):
        """Test that two None amounts are equal."""
        assert amount.amount_is_equal_to(None, None) is True

    def test_amount_is_equal_to_one_none(self):
        """Test that None and non-None are not equal."""
        amt1 = amount.new_undefined_amount(PyDecimal("100"))
        assert amount.amount_is_equal_to(amt1, None) is False


class TestAmountChecks:
    """Tests for amount check functions (is_negative, is_zero, contains_fractions)."""

    def test_amount_is_negative_with_negative_value(self):
        """Test is_negative with negative amount."""
        amt = amount.new_undefined_amount(PyDecimal("-50"))
        assert amount.amount_is_negative(amt) is True

    def test_amount_is_negative_with_positive_value(self):
        """Test is_negative with positive amount."""
        amt = amount.new_undefined_amount(PyDecimal("50"))
        assert amount.amount_is_negative(amt) is False

    def test_amount_is_negative_with_zero(self):
        """Test is_negative with zero amount."""
        amt = amount.new_undefined_amount(PyDecimal("0"))
        assert amount.amount_is_negative(amt) is False

    def test_amount_is_negative_with_none(self):
        """Test is_negative with None returns False."""
        assert amount.amount_is_negative(None) is False

    def test_amount_is_zero_with_zero(self):
        """Test is_zero with zero amount."""
        amt = amount.new_undefined_amount(PyDecimal("0"))
        assert amount.amount_is_zero(amt) is True

    def test_amount_is_zero_with_nonzero(self):
        """Test is_zero with non-zero amount."""
        amt = amount.new_undefined_amount(PyDecimal("0.001"))
        assert amount.amount_is_zero(amt) is False

    def test_amount_is_zero_with_none(self):
        """Test is_zero with None returns False."""
        assert amount.amount_is_zero(None) is False

    def test_amount_contains_fractions_with_fractions(self):
        """Test contains_fractions with fractional amount."""
        amt = amount.new_undefined_amount(PyDecimal("100.50"))
        assert amount.amount_contains_fractions(amt) is True

    def test_amount_contains_fractions_without_fractions(self):
        """Test contains_fractions with whole number amount."""
        amt = amount.new_undefined_amount(PyDecimal("100"))
        assert amount.amount_contains_fractions(amt) is False

    def test_amount_contains_fractions_with_none(self):
        """Test contains_fractions with None returns False."""
        assert amount.amount_contains_fractions(None) is False


class TestAmountArithmetic:
    """Tests for amount arithmetic operations."""

    def test_amount_add_basic(self):
        """Test adding two amounts."""
        amt1 = amount.new_undefined_amount(PyDecimal("100"))
        amt2 = amount.new_undefined_amount(PyDecimal("30"))
        result = amount.amount_add(amt1, amt2)
        assert result.value.value == "130"

    def test_amount_add_negative(self):
        """Test adding negative amounts."""
        amt1 = amount.new_undefined_amount(PyDecimal("100"))
        amt2 = amount.new_undefined_amount(PyDecimal("-30"))
        result = amount.amount_add(amt1, amt2)
        assert result.value.value == "70"

    def test_amount_add_with_none(self):
        """Test that adding with None returns None."""
        amt1 = amount.new_undefined_amount(PyDecimal("100"))
        assert amount.amount_add(amt1, None) is None
        assert amount.amount_add(None, amt1) is None

    def test_amount_add_different_tokens_raises_error(self):
        """Test that adding different token types raises error."""
        tok1 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        tok2 = Token(code="EUR", issuer="ISSUER2", ledger=Ledger.LEDGER_STELLAR)
        amt1 = amount.token_new_amount_of(tok1, PyDecimal("100"))
        amt2 = amount.token_new_amount_of(tok2, PyDecimal("30"))
        with pytest.raises(ValueError, match="cannot do arithmetic on amounts of different token denominations"):
            amount.amount_add(amt1, amt2)

    def test_amount_sub_basic(self):
        """Test subtracting two amounts."""
        amt1 = amount.new_undefined_amount(PyDecimal("100"))
        amt2 = amount.new_undefined_amount(PyDecimal("30"))
        result = amount.amount_sub(amt1, amt2)
        assert result.value.value == "70"

    def test_amount_sub_resulting_in_negative(self):
        """Test subtraction resulting in negative."""
        amt1 = amount.new_undefined_amount(PyDecimal("30"))
        amt2 = amount.new_undefined_amount(PyDecimal("100"))
        result = amount.amount_sub(amt1, amt2)
        assert result.value.value == "-70"

    def test_amount_sub_with_none(self):
        """Test that subtracting with None returns None."""
        amt1 = amount.new_undefined_amount(PyDecimal("100"))
        assert amount.amount_sub(amt1, None) is None
        assert amount.amount_sub(None, amt1) is None

    def test_amount_sub_different_tokens_raises_error(self):
        """Test that subtracting different token types raises error."""
        tok1 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        tok2 = Token(code="EUR", issuer="ISSUER2", ledger=Ledger.LEDGER_STELLAR)
        amt1 = amount.token_new_amount_of(tok1, PyDecimal("100"))
        amt2 = amount.token_new_amount_of(tok2, PyDecimal("30"))
        with pytest.raises(ValueError, match="cannot do arithmetic on amounts of different token denominations"):
            amount.amount_sub(amt1, amt2)

    def test_amount_decimal_mul_basic(self):
        """Test multiplying amount by decimal."""
        amt = amount.new_undefined_amount(PyDecimal("100"))
        result = amount.amount_decimal_mul(amt, PyDecimal("2"))
        assert result.value.value == "200"

    def test_amount_decimal_mul_by_fraction(self):
        """Test multiplying amount by fraction."""
        amt = amount.new_undefined_amount(PyDecimal("100"))
        result = amount.amount_decimal_mul(amt, PyDecimal("0.5"))
        # Result may be "50" or "50.0" depending on decimal behavior
        assert PyDecimal(result.value.value) == PyDecimal("50")

    def test_amount_decimal_mul_with_none(self):
        """Test that multiplying None returns None."""
        result = amount.amount_decimal_mul(None, PyDecimal("2"))
        assert result is None

    def test_amount_decimal_div_basic(self):
        """Test dividing amount by decimal."""
        amt = amount.new_undefined_amount(PyDecimal("100"))
        result = amount.amount_decimal_div(amt, PyDecimal("4"))
        assert result.value.value == "25"

    def test_amount_decimal_div_resulting_in_fraction(self):
        """Test division resulting in fractional value."""
        amt = amount.new_undefined_amount(PyDecimal("100"))
        result = amount.amount_decimal_div(amt, PyDecimal("3"))
        # Should have many decimal places
        result_value = PyDecimal(result.value.value)
        assert result_value > PyDecimal("33.33")
        assert result_value < PyDecimal("33.34")

    def test_amount_decimal_div_with_none(self):
        """Test that dividing None returns None."""
        result = amount.amount_decimal_div(None, PyDecimal("2"))
        assert result is None

    def test_amount_decimal_div_by_zero_raises_error(self):
        """Test that dividing by zero raises error."""
        amt = amount.new_undefined_amount(PyDecimal("100"))
        with pytest.raises(ZeroDivisionError, match="cannot divide amount by zero"):
            amount.amount_decimal_div(amt, PyDecimal("0"))
