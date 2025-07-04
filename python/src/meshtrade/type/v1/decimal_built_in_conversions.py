import decimal

from .decimal_pb2 import Decimal


def built_in_to_decimal(decimal_value: decimal.Decimal) -> Decimal:
    """
    Converts an instance of the built-in decimal.Decimal type to an instance of the
    financial Decimal protobuf type.

    :param decimal_value: The decimal.Decimal object to convert.
    :return: The converted financial Decimal protobuf object.
    """

    # Contruct and return resultant decimal object
    return Decimal(
        value=str(decimal_value),
    )


def decimal_to_built_in(decimal_value: Decimal) -> decimal.Decimal:
    """
    Converts an instance of the financial Decimal protobuf type to an instance of the
    built-in decimal.Decimal type.

    :param decimal_value: The decimal_pb2.Decimal object to convert.
    :return: The converted decimal.Decimal object.
    """
    return decimal.Decimal( decimal_value.value if decimal_value.value != "" else "0"  )
