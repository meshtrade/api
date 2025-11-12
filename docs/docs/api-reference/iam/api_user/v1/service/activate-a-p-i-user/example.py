from meshtrade.iam.api_user.v1 import (
    ActivateAPIUserRequest,
    APIUserService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = APIUserService()

    with service:
        # Create request with service-specific parameters
        request = ActivateAPIUserRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the ActivateAPIUser method
        api_user = service.activate_apiuser(request)

        # FIXME: Add relevant response object usage
        print("ActivateAPIUser successful:", api_user)


if __name__ == "__main__":
    main()
