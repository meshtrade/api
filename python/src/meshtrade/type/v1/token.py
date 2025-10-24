"""Token utility functions for Mesh API.

This module provides utility functions for working with Token protobuf messages,
including helper functions for token creation, validation, and formatting.
"""

from .ledger_pb2 import Ledger
from .token_pb2 import Token


def new_undefined_token() -> Token:
    """Create a new Token representing an undefined or placeholder token.

    The undefined token has:
    - Code: "-"
    - Issuer: "-"
    - Ledger: LEDGER_UNSPECIFIED

    This is useful as a sentinel value to represent the absence of a valid token
    or as a placeholder in data structures.

    Returns:
        A Token configured as undefined

    Example:
        >>> token = new_undefined_token()
        >>> token.code
        '-'
        >>> token.issuer
        '-'
        >>> token_is_undefined(token)
        True
    """
    return Token(
        code="-",
        issuer="-",
        ledger=Ledger.LEDGER_UNSPECIFIED,
    )


def token_is_undefined(token: Token | None) -> bool:
    """Check whether this token represents an undefined or placeholder token.

    A token is considered undefined if:
    - The token is None, OR
    - The token has Code == "-" AND Issuer == "-" AND Ledger == LEDGER_UNSPECIFIED

    Args:
        token: Token to check (can be None)

    Returns:
        True if the token is undefined (None or matches undefined pattern), False otherwise

    None Safety:
        Returns True if token is None

    Example:
        >>> token = None
        >>> token_is_undefined(token)
        True
        >>> token = new_undefined_token()
        >>> token_is_undefined(token)
        True
        >>> defined = Token(code="USD", issuer="ISSUER", ledger=Ledger.LEDGER_STELLAR)
        >>> token_is_undefined(defined)
        False
    """
    if token is None:
        return True

    return token.code == "-" and token.issuer == "-" and token.ledger == Ledger.LEDGER_UNSPECIFIED


def token_is_equal_to(token1: Token | None, token2: Token | None) -> bool:
    """Compare two tokens for equality.

    Two tokens are considered equal if and only if all of the following match:
    - Code (asset code)
    - Issuer (asset issuer)
    - Ledger (blockchain/ledger type)

    Args:
        token1: First token to compare (can be None)
        token2: Second token to compare (can be None)

    Returns:
        True if both tokens are equal (including both being None), False otherwise

    None Safety:
        Returns True if both are None, False if only one is None

    Example:
        >>> token1 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        >>> token2 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        >>> token_is_equal_to(token1, token2)
        True
        >>> token3 = Token(code="EUR", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        >>> token_is_equal_to(token1, token3)
        False
        >>> token_is_equal_to(None, None)
        True
    """
    # Handle None cases
    if token1 is None and token2 is None:
        return True
    if token1 is None or token2 is None:
        return False

    return token1.code == token2.code and token1.issuer == token2.issuer and token1.ledger == token2.ledger


def token_pretty_string(token: Token | None) -> str:
    """Return a human-readable string representation of the token.

    Format: "CODE by ISSUER on NETWORK"

    Args:
        token: Token to format (can be None)

    Returns:
        A formatted string describing the token, or "undefined" if None/undefined

    None Safety:
        Returns "undefined" if token is None

    Example:
        >>> token = Token(code="USD", issuer="CIRCLE", ledger=Ledger.LEDGER_STELLAR)
        >>> token_pretty_string(token)
        'USD by CIRCLE on Stellar'
        >>> token_pretty_string(None)
        'undefined'
        >>> token_pretty_string(new_undefined_token())
        'undefined'
    """
    if token is None:
        return "undefined"

    if token_is_undefined(token):
        return "undefined"

    # Import ledger utility for pretty printing
    from .ledger import ledger_to_pretty_string

    return f"{token.code} by {token.issuer} on {ledger_to_pretty_string(token.ledger)}"
