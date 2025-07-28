from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    ActivateApiUserRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = ApiUserService()
    
    with service:
        # Create request with service-specific parameters
        request = ActivateApiUserRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the ActivateApiUser method  
        api_user = service.activate_api_user(request)
        
        # FIXME: Add relevant response object usage
        print("ActivateApiUser successful:", api_user)


if __name__ == "__main__":
    main()