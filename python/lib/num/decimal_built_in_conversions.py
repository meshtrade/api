from functools import reduce
import decimal
from api.python.lib.num import decimal_pb2


def built_in_to_decimal(decimal_value: decimal.Decimal) -> decimal_pb2.Decimal:
    """
    Converts an instance of the built-in decimal.Decimal type to an instance of the financial Decimal protobuf type.
    WARNING: this conversion results in a loss of precision as the protobuf decimal typs only supports 18 significant digits.

    :param decimal_value: The decimal.Decimal object to convert.
    :return: The converted financial Decimal protobuf object.
    """

    # Contruct and return resultant decimal object
    return decimal_pb2.Decimal(
        value=str(decimal_value),
    )


def decimal_to_built_in(decimal_value: decimal_pb2.Decimal) -> decimal.Decimal:
    """
    Converts an instance of the financial Decimal protobuf type to an instance of the built-in decimal.Decimal type.

    :param decimal_value: The decimal_pb2.Decimal object to convert.
    :return: The converted decimal.Decimal object.
    """
    return decimal.Decimal( decimal_value.value if decimal_value.value != "" else "0"  )
