from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    DeactivateApiUserRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = ApiUserService()
    
    with service:
        # Create request with service-specific parameters
        request = DeactivateApiUserRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the DeactivateApiUser method  
        api_user = service.deactivate_api_user(request)
        
        # FIXME: Add relevant response object usage
        print("DeactivateApiUser successful:", api_user)


if __name__ == "__main__":
    main()