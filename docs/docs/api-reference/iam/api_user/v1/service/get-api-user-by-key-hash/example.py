from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    GetApiUserByKeyHashRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Create request with service-specific parameters
        request = GetApiUserByKeyHashRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetApiUserByKeyHash method
        api_user = service.get_api_user_by_key_hash(request)

        # FIXME: Add relevant response object usage
        print("GetApiUserByKeyHash successful:", api_user)


if __name__ == "__main__":
    main()
