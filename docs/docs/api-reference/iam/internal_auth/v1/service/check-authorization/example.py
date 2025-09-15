from meshtrade.iam.internal_auth.v1 import (
    CheckAuthorizationRequest,
    InternalAuthService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = InternalAuthService()

    with service:
        # Create request with service-specific parameters
        request = CheckAuthorizationRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the CheckAuthorization method
        response = service.check_authorization(request)

        # FIXME: Add relevant response object usage
        print("CheckAuthorization successful:", response)


if __name__ == "__main__":
    main()
