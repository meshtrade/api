"""Unit tests for token utility functions."""

from decimal import Decimal as PyDecimal

from meshtrade.type.v1 import token
from meshtrade.type.v1.ledger_pb2 import Ledger
from meshtrade.type.v1.token_pb2 import Token


class TestTokenCreation:
    """Tests for token creation functions."""

    def test_new_undefined_token(self):
        """Test creating an undefined token."""
        undefined = token.new_undefined_token()
        assert undefined.code == "-"
        assert undefined.issuer == "-"
        assert undefined.ledger == Ledger.LEDGER_UNSPECIFIED

    def test_new_undefined_token_is_undefined(self):
        """Test that newly created undefined token is recognized as undefined."""
        undefined = token.new_undefined_token()
        assert token.token_is_undefined(undefined) is True


class TestTokenNewAmountOf:
    """Tests for token_new_amount_of function."""

    def test_token_new_amount_of_basic(self):
        """Test creating an amount with a token."""
        tok = Token(code="USD", issuer="ISSUER", ledger=Ledger.LEDGER_ETHEREUM)
        amount = token.token_new_amount_of(tok, PyDecimal("100.5"))
        assert amount.value.value == "100.5"
        assert amount.token.code == "USD"
        assert amount.token.issuer == "ISSUER"

    def test_token_new_amount_of_stellar_truncation(self):
        """Test that Stellar ledger truncates to 7 decimal places."""
        tok = Token(code="USD", issuer="ISSUER", ledger=Ledger.LEDGER_STELLAR)
        # Provide a value with more than 7 decimal places
        amount = token.token_new_amount_of(tok, PyDecimal("123.456789012345"))
        # Should be truncated to 7 decimal places
        assert amount.value.value == "123.4567890"

    def test_token_new_amount_of_non_stellar_full_precision(self):
        """Test that non-Stellar ledgers preserve full precision."""
        tok = Token(code="ETH", issuer="ISSUER", ledger=Ledger.LEDGER_ETHEREUM)
        # Provide a value with many decimal places
        amount = token.token_new_amount_of(tok, PyDecimal("123.456789012345"))
        # Should preserve full precision
        assert amount.value.value == "123.456789012345"

    def test_token_new_amount_of_with_none_token(self):
        """Test that None token returns None."""
        result = token.token_new_amount_of(None, PyDecimal("100"))
        assert result is None

    def test_token_new_amount_of_negative_value(self):
        """Test creating an amount with negative value."""
        tok = Token(code="USD", issuer="ISSUER", ledger=Ledger.LEDGER_ETHEREUM)
        amount = token.token_new_amount_of(tok, PyDecimal("-50.25"))
        assert amount.value.value == "-50.25"

    def test_token_new_amount_of_zero_value(self):
        """Test creating an amount with zero value."""
        tok = Token(code="USD", issuer="ISSUER", ledger=Ledger.LEDGER_ETHEREUM)
        amount = token.token_new_amount_of(tok, PyDecimal("0"))
        assert amount.value.value == "0"


class TestTokenIsUndefined:
    """Tests for token_is_undefined function."""

    def test_token_is_undefined_with_none(self):
        """Test that None is considered undefined."""
        assert token.token_is_undefined(None) is True

    def test_token_is_undefined_with_undefined_token(self):
        """Test that undefined token pattern is recognized."""
        undefined = Token(code="-", issuer="-", ledger=Ledger.LEDGER_UNSPECIFIED)
        assert token.token_is_undefined(undefined) is True

    def test_token_is_undefined_with_defined_token(self):
        """Test that defined token is not undefined."""
        defined = Token(code="USD", issuer="ISSUER", ledger=Ledger.LEDGER_STELLAR)
        assert token.token_is_undefined(defined) is False

    def test_token_is_undefined_partial_undefined(self):
        """Test that partially undefined tokens are not considered undefined."""
        # Code is undefined but issuer is not
        partial1 = Token(code="-", issuer="ISSUER", ledger=Ledger.LEDGER_UNSPECIFIED)
        assert token.token_is_undefined(partial1) is False

        # Issuer is undefined but code is not
        partial2 = Token(code="USD", issuer="-", ledger=Ledger.LEDGER_UNSPECIFIED)
        assert token.token_is_undefined(partial2) is False

        # Code and issuer undefined but ledger is specified
        partial3 = Token(code="-", issuer="-", ledger=Ledger.LEDGER_STELLAR)
        assert token.token_is_undefined(partial3) is False


class TestTokenIsEqualTo:
    """Tests for token_is_equal_to function."""

    def test_token_is_equal_to_identical_tokens(self):
        """Test that identical tokens are equal."""
        token1 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        token2 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        assert token.token_is_equal_to(token1, token2) is True

    def test_token_is_equal_to_different_code(self):
        """Test that tokens with different codes are not equal."""
        token1 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        token2 = Token(code="EUR", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        assert token.token_is_equal_to(token1, token2) is False

    def test_token_is_equal_to_different_issuer(self):
        """Test that tokens with different issuers are not equal."""
        token1 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        token2 = Token(code="USD", issuer="ISSUER2", ledger=Ledger.LEDGER_STELLAR)
        assert token.token_is_equal_to(token1, token2) is False

    def test_token_is_equal_to_different_ledger(self):
        """Test that tokens with different ledgers are not equal."""
        token1 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        token2 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_ETHEREUM)
        assert token.token_is_equal_to(token1, token2) is False

    def test_token_is_equal_to_both_none(self):
        """Test that two None tokens are considered equal."""
        assert token.token_is_equal_to(None, None) is True

    def test_token_is_equal_to_one_none(self):
        """Test that None and non-None token are not equal."""
        token1 = Token(code="USD", issuer="ISSUER1", ledger=Ledger.LEDGER_STELLAR)
        assert token.token_is_equal_to(token1, None) is False
        assert token.token_is_equal_to(None, token1) is False


class TestTokenPrettyString:
    """Tests for token_pretty_string function."""

    def test_token_pretty_string_stellar(self):
        """Test pretty string for Stellar token."""
        tok = Token(code="USD", issuer="CIRCLE", ledger=Ledger.LEDGER_STELLAR)
        result = token.token_pretty_string(tok)
        assert result == "USD by CIRCLE on Stellar"

    def test_token_pretty_string_ethereum(self):
        """Test pretty string for Ethereum token."""
        tok = Token(code="ETH", issuer="ISSUER", ledger=Ledger.LEDGER_ETHEREUM)
        result = token.token_pretty_string(tok)
        assert result == "ETH by ISSUER on Ethereum"

    def test_token_pretty_string_none(self):
        """Test pretty string for None token."""
        result = token.token_pretty_string(None)
        assert result == "undefined"

    def test_token_pretty_string_undefined(self):
        """Test pretty string for undefined token."""
        undefined = token.new_undefined_token()
        result = token.token_pretty_string(undefined)
        assert result == "undefined"

    def test_token_pretty_string_various_ledgers(self):
        """Test pretty string for various ledger types."""
        tok_bitcoin = Token(code="BTC", issuer="ISSUER", ledger=Ledger.LEDGER_BITCOIN)
        assert token.token_pretty_string(tok_bitcoin) == "BTC by ISSUER on Bitcoin"

        tok_xrp = Token(code="XRP", issuer="ISSUER", ledger=Ledger.LEDGER_XRP)
        assert token.token_pretty_string(tok_xrp) == "XRP by ISSUER on XRP"

        tok_unspecified = Token(code="USD", issuer="ISSUER", ledger=Ledger.LEDGER_UNSPECIFIED)
        assert token.token_pretty_string(tok_unspecified) == "USD by ISSUER on Unspecified"
