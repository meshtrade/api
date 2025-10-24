"""Decimal operations utility functions for Mesh API.

This module provides arithmetic, comparison, and utility functions for working
with protobuf Decimal messages, offering a Pythonic API for decimal arithmetic
with consistent precision handling.
"""

from decimal import ROUND_HALF_UP

from .decimal_built_in_conversions import decimal_to_built_in
from .decimal_pb2 import Decimal


def decimal_add(d1: Decimal | None, d2: Decimal | None) -> Decimal:
    """Add two Decimal values.

    Args:
        d1: First decimal value (None treated as 0)
        d2: Second decimal value (None treated as 0)

    Returns:
        New Decimal containing the sum (d1 + d2)

    None Safety:
        None inputs are treated as zero

    Example:
        >>> d1 = Decimal(value="10.5")
        >>> d2 = Decimal(value="20.3")
        >>> result = decimal_add(d1, d2)
        >>> result.value
        '30.8'
    """
    val1 = decimal_to_built_in(d1)
    val2 = decimal_to_built_in(d2)
    return Decimal(value=str(val1 + val2))


def decimal_sub(d1: Decimal | None, d2: Decimal | None) -> Decimal:
    """Subtract two Decimal values.

    Args:
        d1: First decimal value (None treated as 0)
        d2: Second decimal value (subtrahend, None treated as 0)

    Returns:
        New Decimal containing the difference (d1 - d2)

    None Safety:
        None inputs are treated as zero

    Example:
        >>> d1 = Decimal(value="100.5")
        >>> d2 = Decimal(value="30.2")
        >>> result = decimal_sub(d1, d2)
        >>> result.value
        '70.3'
    """
    val1 = decimal_to_built_in(d1)
    val2 = decimal_to_built_in(d2)
    return Decimal(value=str(val1 - val2))


def decimal_mul(d1: Decimal | None, d2: Decimal | None) -> Decimal:
    """Multiply two Decimal values.

    Args:
        d1: First decimal value (None treated as 0)
        d2: Second decimal value (None treated as 0)

    Returns:
        New Decimal containing the product (d1 * d2)

    None Safety:
        None inputs are treated as zero

    Example:
        >>> d1 = Decimal(value="10.5")
        >>> d2 = Decimal(value="2")
        >>> result = decimal_mul(d1, d2)
        >>> result.value
        '21.0'
    """
    val1 = decimal_to_built_in(d1)
    val2 = decimal_to_built_in(d2)
    return Decimal(value=str(val1 * val2))


def decimal_div(d1: Decimal | None, d2: Decimal | None) -> Decimal:
    """Divide two Decimal values.

    Args:
        d1: Dividend (None treated as 0)
        d2: Divisor (must not be zero, None treated as 0)

    Returns:
        New Decimal containing the quotient (d1 / d2)

    Raises:
        ZeroDivisionError: If d2 is zero

    None Safety:
        None inputs are treated as zero (note: None d2 will raise ZeroDivisionError)

    Example:
        >>> d1 = Decimal(value="100")
        >>> d2 = Decimal(value="4")
        >>> result = decimal_div(d1, d2)
        >>> result.value
        '25'
    """
    val1 = decimal_to_built_in(d1)
    val2 = decimal_to_built_in(d2)

    if val2 == 0:
        raise ZeroDivisionError("cannot divide by zero")

    return Decimal(value=str(val1 / val2))


def decimal_equal(d1: Decimal | None, d2: Decimal | None) -> bool:
    """Check if two Decimal values are equal.

    Args:
        d1: First decimal value (None treated as 0)
        d2: Second decimal value (None treated as 0)

    Returns:
        True if d1 == d2, False otherwise

    None Safety:
        None inputs are treated as zero

    Example:
        >>> d1 = Decimal(value="10.5")
        >>> d2 = Decimal(value="10.5")
        >>> decimal_equal(d1, d2)
        True
    """
    val1 = decimal_to_built_in(d1)
    val2 = decimal_to_built_in(d2)
    return val1 == val2


def decimal_less_than(d1: Decimal | None, d2: Decimal | None) -> bool:
    """Check if first Decimal is less than second.

    Args:
        d1: First decimal value (None treated as 0)
        d2: Second decimal value (None treated as 0)

    Returns:
        True if d1 < d2, False otherwise

    None Safety:
        None inputs are treated as zero

    Example:
        >>> d1 = Decimal(value="10.5")
        >>> d2 = Decimal(value="20.3")
        >>> decimal_less_than(d1, d2)
        True
    """
    val1 = decimal_to_built_in(d1)
    val2 = decimal_to_built_in(d2)
    return val1 < val2


def decimal_less_than_or_equal(d1: Decimal | None, d2: Decimal | None) -> bool:
    """Check if first Decimal is less than or equal to second.

    Args:
        d1: First decimal value (None treated as 0)
        d2: Second decimal value (None treated as 0)

    Returns:
        True if d1 <= d2, False otherwise

    None Safety:
        None inputs are treated as zero

    Example:
        >>> d1 = Decimal(value="10.5")
        >>> d2 = Decimal(value="10.5")
        >>> decimal_less_than_or_equal(d1, d2)
        True
    """
    val1 = decimal_to_built_in(d1)
    val2 = decimal_to_built_in(d2)
    return val1 <= val2


def decimal_greater_than(d1: Decimal | None, d2: Decimal | None) -> bool:
    """Check if first Decimal is greater than second.

    Args:
        d1: First decimal value (None treated as 0)
        d2: Second decimal value (None treated as 0)

    Returns:
        True if d1 > d2, False otherwise

    None Safety:
        None inputs are treated as zero

    Example:
        >>> d1 = Decimal(value="20.3")
        >>> d2 = Decimal(value="10.5")
        >>> decimal_greater_than(d1, d2)
        True
    """
    val1 = decimal_to_built_in(d1)
    val2 = decimal_to_built_in(d2)
    return val1 > val2


def decimal_greater_than_or_equal(d1: Decimal | None, d2: Decimal | None) -> bool:
    """Check if first Decimal is greater than or equal to second.

    Args:
        d1: First decimal value (None treated as 0)
        d2: Second decimal value (None treated as 0)

    Returns:
        True if d1 >= d2, False otherwise

    None Safety:
        None inputs are treated as zero

    Example:
        >>> d1 = Decimal(value="10.5")
        >>> d2 = Decimal(value="10.5")
        >>> decimal_greater_than_or_equal(d1, d2)
        True
    """
    val1 = decimal_to_built_in(d1)
    val2 = decimal_to_built_in(d2)
    return val1 >= val2


def decimal_is_zero(d: Decimal | None) -> bool:
    """Check if Decimal value is zero.

    Args:
        d: Decimal value to check (None treated as 0)

    Returns:
        True if d == 0, False otherwise

    None Safety:
        None inputs are treated as zero (returns True)

    Example:
        >>> d = Decimal(value="0")
        >>> decimal_is_zero(d)
        True
        >>> d2 = Decimal(value="0.001")
        >>> decimal_is_zero(d2)
        False
    """
    val = decimal_to_built_in(d)
    return val == 0


def decimal_is_negative(d: Decimal | None) -> bool:
    """Check if Decimal value is negative (< 0).

    Args:
        d: Decimal value to check (None treated as 0)

    Returns:
        True if d < 0, False if d >= 0

    None Safety:
        None inputs are treated as zero (returns False)

    Example:
        >>> d = Decimal(value="-10.5")
        >>> decimal_is_negative(d)
        True
        >>> d2 = Decimal(value="10.5")
        >>> decimal_is_negative(d2)
        False
    """
    val = decimal_to_built_in(d)
    return val < 0


def decimal_is_positive(d: Decimal | None) -> bool:
    """Check if Decimal value is positive (> 0).

    Args:
        d: Decimal value to check (None treated as 0)

    Returns:
        True if d > 0, False if d <= 0

    None Safety:
        None inputs are treated as zero (returns False)

    Example:
        >>> d = Decimal(value="10.5")
        >>> decimal_is_positive(d)
        True
        >>> d2 = Decimal(value="0")
        >>> decimal_is_positive(d2)
        False
    """
    val = decimal_to_built_in(d)
    return val > 0


def decimal_round(d: Decimal | None, places: int) -> Decimal:
    """Round Decimal to specified number of decimal places.

    If places < 0, it rounds the integer part to the nearest 10^(-places).

    Args:
        d: Decimal value to round (None treated as 0)
        places: Number of decimal places (can be negative)

    Returns:
        New Decimal containing the rounded value

    None Safety:
        None inputs are treated as zero

    Example:
        >>> d = Decimal(value="5.45")
        >>> result = decimal_round(d, 1)
        >>> result.value
        '5.5'
        >>> d2 = Decimal(value="545")
        >>> result2 = decimal_round(d2, -1)
        >>> result2.value
        '550'
    """
    from decimal import Decimal as PyDecimal

    val = decimal_to_built_in(d)

    if places < 0:
        # For negative places, use shift-quantize-shift back approach
        # to properly round the integer part
        scale = PyDecimal(10) ** (-places)
        shifted = val / scale
        rounded_shifted = shifted.quantize(PyDecimal("1"), rounding=ROUND_HALF_UP)
        rounded_val = rounded_shifted * scale
    else:
        # For positive places, quantize directly
        quantizer = PyDecimal(10) ** -places
        rounded_val = val.quantize(quantizer, rounding=ROUND_HALF_UP)

    return Decimal(value=str(rounded_val))
