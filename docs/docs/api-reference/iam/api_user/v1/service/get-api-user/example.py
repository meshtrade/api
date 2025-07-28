from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    GetApiUserRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = ApiUserService()
    
    with service:
        # Create request with service-specific parameters
        request = GetApiUserRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the GetApiUser method  
        api_user = service.get_api_user(request)
        
        # FIXME: Add relevant response object usage
        print("GetApiUser successful:", api_user)


if __name__ == "__main__":
    main()