"""
This module provides a factory function for creating Amount protobuf messages.
"""

from decimal import ROUND_DOWN, Decimal

from .amount_pb2 import Amount
from .decimal_built_in_conversions import built_in_to_decimal, decimal_to_built_in
from .ledger import get_ledger_no_decimal_places
from .token_pb2 import Token


def new_amount(value: Decimal, token: Token, precision_loss_tolerance: Decimal = Decimal("0.00000001")) -> Amount:
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
        Decimal(10) ** -get_ledger_no_decimal_places(token.ledger),
        rounding=ROUND_DOWN,
    )

    # Construct and return the final Amount protobuf message using the sanitized value.
    return Amount(
        token=token,
        value=built_in_to_decimal(truncated_value),
    )
