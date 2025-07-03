from meshtrade.wallet.account.v1 import Account


def test_account_creation():
    """
    Tests that an Account message can be instantiated and has the correct type.
    """
    account_name = "test-account-123"
    account = Account(name=account_name)

    assert isinstance(account, Account)

    assert account.name == account_name
