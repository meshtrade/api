"""Amount utility functions for Mesh API.

This module provides utility functions for working with Amount protobuf messages,
including creation, validation, comparison, and arithmetic operations.
"""

from decimal import ROUND_DOWN
from decimal import Decimal as PyDecimal

from .amount_pb2 import Amount
from .decimal_built_in_conversions import built_in_to_decimal, decimal_to_built_in
from .decimal_pb2 import Decimal
from .ledger import get_ledger_no_decimal_places
from .token import new_undefined_token, token_new_amount_of
from .token_pb2 import Token


def new_amount(value: PyDecimal, token: Token, precision_loss_tolerance: PyDecimal = PyDecimal("0.00000001")) -> Amount:
    """Creates a new Amount, ensuring the value conforms to system-wide limits.

    This function is the safe constructor for creating Amount protobuf messages.
    While the underlying conversion from a Python `Decimal` to the protobuf's
    `string` field is lossless, this function provides critical validation
    to ensure the value adheres to constraints imposed by other downstream
    systems (e.g., databases, other microservices with fixed-precision types).

    Its primary operations are:

    1.  **Validation:** It performs a serialization round-trip
        (Python Decimal -> Protobuf Decimal -> Python Decimal) to simulate
        how the value is stored and retrieved across the system. It then asserts
        the value remains unchanged, guaranteeing it doesn't exceed the
        precision limits of any consuming service.

    2.  **Truncation:** It truncates the validated value to the exact number of
        decimal places defined for the token's ledger, always rounding down to
        prevent any inflation of values.

    3.  **Construction:** It constructs and returns the final `Amount` message.

    Args:
        value: The numerical value of the amount as a Python `Decimal` object.
        token: The `Token` protobuf message that defines the asset type
               and its associated ledger.
        precision_loss_tolerance: The maximum acceptable difference after the
            validation round-trip. Since the string-based conversion is
            lossless, any difference indicates a failure to conform to an
            external system's parsing rules. Defaults to a small tolerance
            for robustness.

    Returns:
        An `Amount` protobuf message containing the ledger-compliant, truncated
        value and the specified token.

    Raises:
        AssertionError: If the input `value` changes during the validation
                        round-trip, indicating it exceeds the system's
                        representational limits and would be corrupted
                        downstream.
    """

    # Perform a serialization round-trip to validate the value against
    # system-wide architectural constraints. This is a lossless operation
    # in isolation, so any change reveals an incompatibility.
    value_after_roundtrip = decimal_to_built_in(built_in_to_decimal(value))

    # Confirm the value is perfectly representable within the system's limits.
    # If the original value had too much precision for a downstream service to
    # parse, it would change during the round-trip, and this would fail.
    assert abs(value_after_roundtrip - value) <= precision_loss_tolerance, "value exceeds system's precision limits and would be corrupted"

    # Truncate the validated value to the number of decimal places specified by the
    # token's ledger. ROUND_DOWN ensures the value is never inflated.
    truncated_value = value_after_roundtrip.quantize(
        PyDecimal(10) ** -get_ledger_no_decimal_places(token.ledger),
        rounding=ROUND_DOWN,
    )

    # Construct and return the final Amount protobuf message using the sanitized value.
    return Amount(
        token=token,
        value=built_in_to_decimal(truncated_value),
    )


def new_undefined_amount(value: PyDecimal) -> Amount | None:
    """Create a new Amount with the specified value and an undefined token.

    This is useful as a placeholder or when the token type is not yet known.

    Args:
        value: The decimal value for the amount

    Returns:
        A new Amount with the specified value and an undefined token

    Example:
        >>> from decimal import Decimal as PyDecimal
        >>> amount = new_undefined_amount(PyDecimal("100"))
        >>> amount_is_undefined(amount)
        True
    """
    return token_new_amount_of(new_undefined_token(), value)


def amount_set_value(amount: Amount, value: PyDecimal) -> Amount | None:
    """Create a new Amount with the given value and the same token as the input amount.

    Despite its name, this function does NOT modify the input - it creates and returns a NEW Amount.

    Args:
        amount: The amount whose token to use (can be None)
        value: The decimal value for the new amount

    Returns:
        A new Amount with the specified value and the same token, or None if amount is None

    Example:
        >>> from decimal import Decimal as PyDecimal
        >>> original = new_undefined_amount(PyDecimal("100"))
        >>> modified = amount_set_value(original, PyDecimal("200"))
        >>> # original is unchanged, modified is a new Amount with value 200
    """
    if amount is None:
        return None

    return token_new_amount_of(amount.token, value)


def amount_is_undefined(amount: Amount) -> bool:
    """Check whether this amount has an undefined token.

    An amount is considered undefined if its associated token is undefined.

    Args:
        amount: Amount to check (can be None)

    Returns:
        True if the amount's token is undefined or if amount is None, False otherwise

    Example:
        >>> amount = new_undefined_amount(PyDecimal("100"))
        >>> amount_is_undefined(amount)
        True
    """
    if amount is None:
        return True

    from .token import token_is_undefined

    return token_is_undefined(amount.token)


def amount_is_same_type_as(amount1: Amount, amount2: Amount) -> bool:
    """Check if two amounts have the same token type (same currency/asset).

    This is useful for validating that amounts can be compared or combined arithmetically.

    Args:
        amount1: First amount (can be None)
        amount2: Second amount (can be None)

    Returns:
        True if both amounts have equal tokens, False otherwise

    Example:
        >>> usd_amount1 = new_undefined_amount(PyDecimal("100"))
        >>> usd_amount2 = new_undefined_amount(PyDecimal("200"))
        >>> amount_is_same_type_as(usd_amount1, usd_amount2)
        True
    """
    if amount1 is None or amount2 is None:
        return False

    from .token import token_is_equal_to

    return token_is_equal_to(amount1.token, amount2.token)


def amount_is_equal_to(amount1: Amount, amount2: Amount) -> bool:
    """Check if two amounts are equal in both value and token type.

    Two amounts are considered equal if they have the same decimal value AND the same token.

    Args:
        amount1: First amount (can be None)
        amount2: Second amount (can be None)

    Returns:
        True if both amounts have equal values and tokens (or both are None), False otherwise

    Example:
        >>> amount1 = new_undefined_amount(PyDecimal("100"))
        >>> amount2 = new_undefined_amount(PyDecimal("100"))
        >>> amount_is_equal_to(amount1, amount2)
        True
    """
    if amount1 is None and amount2 is None:
        return True
    if amount1 is None or amount2 is None:
        return False

    from .decimal_operations import decimal_equal
    from .token import token_is_equal_to

    return token_is_equal_to(amount1.token, amount2.token) and decimal_equal(amount1.value, amount2.value)


def amount_is_negative(amount: Amount) -> bool:
    """Check whether the amount's value is less than zero.

    Args:
        amount: Amount to check (can be None)

    Returns:
        True if the value is negative (< 0), False otherwise

    Example:
        >>> amount = new_undefined_amount(PyDecimal("-50"))
        >>> amount_is_negative(amount)
        True
    """
    if amount is None:
        return False

    from .decimal_operations import decimal_is_negative

    return decimal_is_negative(amount.value)


def amount_is_zero(amount: Amount) -> bool:
    """Check whether the amount's value is exactly zero.

    Args:
        amount: Amount to check (can be None)

    Returns:
        True if the value is zero, False otherwise

    Example:
        >>> amount = new_undefined_amount(PyDecimal("0"))
        >>> amount_is_zero(amount)
        True
    """
    if amount is None:
        return False

    from .decimal_operations import decimal_is_zero

    return decimal_is_zero(amount.value)


def amount_contains_fractions(amount: Amount) -> bool:
    """Check whether the amount's value has any fractional (decimal) component.

    This is useful for determining if an amount can be represented as a whole number.

    Args:
        amount: Amount to check (can be None)

    Returns:
        True if the value has fractional/decimal places, False otherwise

    Example:
        >>> amount1 = new_undefined_amount(PyDecimal("100.50"))
        >>> amount_contains_fractions(amount1)
        True
        >>> amount2 = new_undefined_amount(PyDecimal("100"))
        >>> amount_contains_fractions(amount2)
        False
    """
    if amount is None:
        return False

    # Convert protobuf Decimal to Python Decimal
    value = PyDecimal(amount.value.value) if amount.value and amount.value.value else PyDecimal(0)

    # Check if truncating to 0 decimal places changes the value
    return value.quantize(PyDecimal("1"), rounding=ROUND_DOWN) != value


def amount_add(amount1: Amount, amount2: Amount) -> Amount | None:
    """Add two amounts and return a new amount with the result.

    The amounts must have the same token type (currency/asset).

    Args:
        amount1: First amount
        amount2: Second amount (must have same token as amount1)

    Returns:
        A new Amount containing the sum (amount1 + amount2), or None if either is None

    Raises:
        ValueError: If the amounts have different token types

    Example:
        >>> amount1 = new_undefined_amount(PyDecimal("100"))
        >>> amount2 = new_undefined_amount(PyDecimal("30"))
        >>> result = amount_add(amount1, amount2)
        >>> # result value is 130
    """
    if amount1 is None or amount2 is None:
        return None

    from .decimal_operations import decimal_add
    from .token import token_is_equal_to, token_pretty_string

    if not token_is_equal_to(amount1.token, amount2.token):
        raise ValueError(
            f"cannot do arithmetic on amounts of different token denominations: "
            f"{token_pretty_string(amount1.token)} vs. {token_pretty_string(amount2.token)}"
        )

    new_value_decimal = decimal_add(amount1.value, amount2.value)
    new_value_py = PyDecimal(new_value_decimal.value) if new_value_decimal.value else PyDecimal(0)

    return amount_set_value(amount1, new_value_py)


def amount_sub(amount1: Amount, amount2: Amount) -> Amount | None:
    """Subtract amount2 from amount1 and return a new amount with the result.

    The amounts must have the same token type (currency/asset).

    Args:
        amount1: First amount
        amount2: Second amount to subtract (must have same token as amount1)

    Returns:
        A new Amount containing the difference (amount1 - amount2), or None if either is None

    Raises:
        ValueError: If the amounts have different token types

    Example:
        >>> amount1 = new_undefined_amount(PyDecimal("100"))
        >>> amount2 = new_undefined_amount(PyDecimal("30"))
        >>> result = amount_sub(amount1, amount2)
        >>> # result value is 70
    """
    if amount1 is None or amount2 is None:
        return None

    from .decimal_operations import decimal_sub
    from .token import token_is_equal_to, token_pretty_string

    if not token_is_equal_to(amount1.token, amount2.token):
        raise ValueError(
            f"cannot do arithmetic on amounts of different token denominations: "
            f"{token_pretty_string(amount1.token)} vs. {token_pretty_string(amount2.token)}"
        )

    new_value_decimal = decimal_sub(amount1.value, amount2.value)
    new_value_py = PyDecimal(new_value_decimal.value) if new_value_decimal.value else PyDecimal(0)

    return amount_set_value(amount1, new_value_py)


def amount_decimal_mul(amount: Amount, multiplier: PyDecimal) -> Amount | None:
    """Multiply this amount by a decimal value and return a new amount with the result.

    The token type is preserved.

    Args:
        amount: The amount to multiply
        multiplier: The decimal multiplier

    Returns:
        A new Amount containing the product (amount * multiplier), or None if amount is None

    Example:
        >>> amount = new_undefined_amount(PyDecimal("100"))
        >>> result = amount_decimal_mul(amount, PyDecimal("2"))
        >>> # result value is 200
    """
    if amount is None:
        return None

    from .decimal_operations import decimal_mul

    multiplier_decimal = Decimal(value=str(multiplier))
    new_value_decimal = decimal_mul(amount.value, multiplier_decimal)
    new_value_py = PyDecimal(new_value_decimal.value) if new_value_decimal.value else PyDecimal(0)

    return amount_set_value(amount, new_value_py)


def amount_decimal_div(amount: Amount, divisor: PyDecimal) -> Amount | None:
    """Divide this amount by a decimal value and return a new amount with the result.

    The token type is preserved.

    Args:
        amount: The amount to divide
        divisor: The decimal divisor (must not be zero)

    Returns:
        A new Amount containing the quotient (amount / divisor), or None if amount is None

    Raises:
        ZeroDivisionError: If divisor is zero

    Example:
        >>> amount = new_undefined_amount(PyDecimal("100"))
        >>> result = amount_decimal_div(amount, PyDecimal("4"))
        >>> # result value is 25
    """
    if amount is None:
        return None

    if divisor == 0:
        raise ZeroDivisionError("cannot divide amount by zero")

    from .decimal_operations import decimal_div

    divisor_decimal = Decimal(value=str(divisor))
    new_value_decimal = decimal_div(amount.value, divisor_decimal)
    new_value_py = PyDecimal(new_value_decimal.value) if new_value_decimal.value else PyDecimal(0)

    return amount_set_value(amount, new_value_py)
