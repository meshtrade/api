# Raw Instructions for python package deployments

# build sdk packages
tox -e build

# This command specifically targets the TestPyPI server
twine upload --repository testpypi ./dist/*

# Test The Uploaded Packages
python3 -m venv /tmp/test-python-install
source /tmp/test-python-install/bin/activate
pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ meshtrade==0.0.1
python -c "from meshtrade.account.v1 import Account; print('Success!')"
python -c "from meshtrade.iam.v1 import Role; print('Success!')"

# clean up
deactivate
rm -rf /tmp/test-python-install

# This uploads to the official PyPI
twine upload ./dist/*