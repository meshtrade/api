from meshtrade.iam.api_user.v1 import (
    APIUserService,
    CreateAPIUserRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = APIUserService()

    with service:
        # Create request with service-specific parameters
        request = CreateAPIUserRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the CreateAPIUser method
        api_user = service.create_apiuser(request)

        # FIXME: Add relevant response object usage
        print("CreateAPIUser successful:", api_user)


if __name__ == "__main__":
    main()
