from meshtrade.iam.api_user.v1 import (
    APIUserService,
    GetAPIUserByKeyHashRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = APIUserService()

    with service:
        # Create request with service-specific parameters
        request = GetAPIUserByKeyHashRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetAPIUserByKeyHash method
        api_user = service.get_apiuser_by_key_hash(request)

        # FIXME: Add relevant response object usage
        print("GetAPIUserByKeyHash successful:", api_user)


if __name__ == "__main__":
    main()
