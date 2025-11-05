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


def decimal_to_built_in(decimal_value: Decimal | None) -> decimal.Decimal:
    """
    Converts an instance of the financial Decimal protobuf type to an instance of the
    built-in decimal.Decimal type.

    None Safety:
        Returns Decimal("0") if decimal_value is None

    :param decimal_value: The decimal_pb2.Decimal object to convert (can be None).
    :return: The converted decimal.Decimal object.
    """
    if decimal_value is None or not decimal_value.value or decimal_value.value.strip() == "":
        return decimal.Decimal("0")
    return decimal.Decimal(decimal_value.value)
