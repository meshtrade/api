from decimal import Decimal, ROUND_DOWN

from api.python.lib.num import built_in_to_decimal, decimal_to_built_in
from .amount_pb2 import Amount
from .network import get_network_no_decimal_places
from .token_pb2 import Token


def new_amount(
    value: Decimal, token: Token, precision_loss_tolerance: Decimal = Decimal("0.00000001")
) -> Amount:

    # perform lossy conversion to protobuf type
    lossy_value = built_in_to_decimal(value)
    lossy_value_decimal = decimal_to_built_in(lossy_value)

    # confirm precision loss does not exceed tolerance
    assert abs(lossy_value_decimal - value) <= precision_loss_tolerance, "precision loss exceeds tolerance"

    # truncate according to the given token
    lossy_value_decimal = lossy_value_decimal.quantize(
        Decimal(10) ** -get_network_no_decimal_places(token.network),
        rounding=ROUND_DOWN,
    )
    return Amount(
        token=token,
        value=built_in_to_decimal(lossy_value_decimal),
    )
