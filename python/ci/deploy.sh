# Raw Instructions for python package deployments

# build sdk packages
tox -e build

# This command specifically targets the TestPyPI server
twine upload --repository testpypi ./lib/account/v1/dist/*
twine upload --repository testpypi ./lib/iam/v1/dist/*

# Test The Uploaded Packages
python3 -m venv /tmp/test-python-install
source /tmp/test-python-install/bin/activate
pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ mesh-account-v1==0.1.0 mesh-iam-v1==0.1.0
python -c "from mesh_account_v1 import Account; print('Success!')"
python -c "from mesh_iam_v1 import Role; print('Success!')"

# clean up
deactivate
rm -rf /tmp/test-python-install

# This uploads to the official PyPI
twine upload ./lib/account/v1/dist/*
twine upload ./lib/iam/v1/dist/*