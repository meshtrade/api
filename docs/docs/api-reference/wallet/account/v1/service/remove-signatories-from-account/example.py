from meshtrade.wallet.account.v1 import (
    AccountService,
    RemoveSignatoriesFromAccountRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Create request with service-specific parameters
        request = RemoveSignatoriesFromAccountRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the RemoveSignatoriesFromAccount method
        response = service.remove_signatories_from_account(request)

        # FIXME: Add relevant response object usage
        print("RemoveSignatoriesFromAccount successful:", response)


if __name__ == "__main__":
    main()
