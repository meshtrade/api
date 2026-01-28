"""Type v1 package."""

# ===================================================================
# AUTO-GENERATED SECTION - ONLY EDIT BELOW THE CLOSING COMMENT BLOCK
# ===================================================================
# This section is automatically managed by protoc-gen-meshpy.
#
# DO NOT EDIT ANYTHING IN THIS SECTION MANUALLY!
# Your changes will be overwritten during code generation.
#
# To add custom imports and exports, scroll down to the
# "MANUAL SECTION" indicated below.
# ===================================================================

# Generated protobuf imports
from .address_pb2 import Address
from .contact_details_pb2 import ContactDetails
from .decimal_pb2 import Decimal
from .sorting_pb2 import SortingOrder
from .ledger_pb2 import Ledger
from .token_pb2 import Token
from .amount_pb2 import Amount
from .date_pb2 import Date
from .time_of_day_pb2 import TimeOfDay

# ===================================================================
# END OF AUTO-GENERATED SECTION
# ===================================================================
#
# MANUAL SECTION - ADD YOUR CUSTOM IMPORTS AND EXPORTS BELOW
#
# You can safely add your own imports, functions, classes, and exports
# in this section. They will be preserved across code generation.
#
# Example:
#   from my_custom_module import my_function
#
# ===================================================================

from .amount import (
    amount_add,
    amount_contains_fractions,
    amount_decimal_div,
    amount_decimal_mul,
    amount_is_equal_to,
    amount_is_negative,
    amount_is_same_type_as,
    amount_is_undefined,
    amount_is_zero,
    amount_set_value,
    amount_sub,
    new_amount,
    new_undefined_amount,
)
from .date import (
    date_add_days,
    date_add_months,
    date_add_years,
    date_is_after,
    date_is_after_or_equal,
    date_is_before,
    date_is_before_or_equal,
    date_is_complete,
    date_is_equal,
    date_is_valid,
    date_to_python_date,
    date_to_string,
    new_date,
    new_date_from_python_date,
)
from .decimal_built_in_conversions import (
    built_in_to_decimal,
    decimal_to_built_in,
)
from .decimal_operations import (
    decimal_add,
    decimal_div,
    decimal_equal,
    decimal_greater_than,
    decimal_greater_than_or_equal,
    decimal_is_negative,
    decimal_is_positive,
    decimal_is_zero,
    decimal_less_than,
    decimal_less_than_or_equal,
    decimal_mul,
    decimal_round,
    decimal_sub,
)
from .ledger import (
    UnsupportedLedgerError,
    get_ledger_no_decimal_places,
    ledger_is_valid,
    ledger_is_valid_and_defined,
    ledger_to_pretty_string,
)
from .time_of_day import (
    new_time_of_day,
    new_time_of_day_from_datetime,
    new_time_of_day_from_python_time,
    new_time_of_day_from_timedelta,
    time_of_day_is_midnight,
    time_of_day_is_valid,
    time_of_day_to_datetime_with_date,
    time_of_day_to_python_time,
    time_of_day_to_string,
    time_of_day_to_timedelta,
    time_of_day_total_seconds,
)
from .token import (
    new_undefined_token,
    token_is_equal_to,
    token_is_undefined,
    token_pretty_string,
)

# ===================================================================
# MODULE EXPORTS
# ===================================================================
# Combined auto-generated and manual exports
__all__ = [
    # Generated exports
    "Address",
    "Amount",
    "ContactDetails",
    "Date",
    "Decimal",
    "Ledger",
    "SortingOrder",
    "TimeOfDay",
    "Token",
    # Manual exports
    "UnsupportedLedgerError",
    "amount_add",
    "amount_contains_fractions",
    "amount_decimal_div",
    "amount_decimal_mul",
    "amount_is_equal_to",
    "amount_is_negative",
    "amount_is_same_type_as",
    "amount_is_undefined",
    "amount_is_zero",
    "amount_set_value",
    "amount_sub",
    "built_in_to_decimal",
    "date_add_days",
    "date_add_months",
    "date_add_years",
    "date_is_after",
    "date_is_after_or_equal",
    "date_is_before",
    "date_is_before_or_equal",
    "date_is_complete",
    "date_is_equal",
    "date_is_valid",
    "date_to_python_date",
    "date_to_string",
    "decimal_add",
    "decimal_div",
    "decimal_equal",
    "decimal_greater_than",
    "decimal_greater_than_or_equal",
    "decimal_is_negative",
    "decimal_is_positive",
    "decimal_is_zero",
    "decimal_less_than",
    "decimal_less_than_or_equal",
    "decimal_mul",
    "decimal_round",
    "decimal_sub",
    "decimal_to_built_in",
    "get_ledger_no_decimal_places",
    "ledger_is_valid",
    "ledger_is_valid_and_defined",
    "ledger_to_pretty_string",
    "new_amount",
    "new_date",
    "new_date_from_python_date",
    "new_time_of_day",
    "new_time_of_day_from_datetime",
    "new_time_of_day_from_python_time",
    "new_time_of_day_from_timedelta",
    "new_undefined_amount",
    "new_undefined_token",
    "time_of_day_is_midnight",
    "time_of_day_is_valid",
    "time_of_day_to_datetime_with_date",
    "time_of_day_to_python_time",
    "time_of_day_to_string",
    "time_of_day_to_timedelta",
    "time_of_day_total_seconds",
    "token_is_equal_to",
    "token_is_undefined",
    "token_pretty_string",
]
