import pytest
from mesh_account_v1 import Account

def test_account_creation():
    """
    Tests that an Account message can be instantiated and has the correct type.
    """
    # 1. Instantiate the Account object with a name
    account_name = "test-account-123"
    account = Account(name=account_name)

    # 2. Check that the object is an instance of the Account class
    assert isinstance(account, Account)

    # 3. (Optional but good practice) Check that the attribute was set correctly
    assert account.name == account_name