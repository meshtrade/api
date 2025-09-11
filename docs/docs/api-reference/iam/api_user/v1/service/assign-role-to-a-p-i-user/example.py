from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    AssignRoleToAPIUserRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Create request with service-specific parameters
        request = AssignRoleToAPIUserRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the AssignRoleToAPIUser method
        api_user = service.assign_role_to_a_p_i_user(request)

        # FIXME: Add relevant response object usage
        print("AssignRoleToAPIUser successful:", api_user)


if __name__ == "__main__":
    main()
