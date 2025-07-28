from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    CreateApiUserRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = ApiUserService()
    
    with service:
        # Create request with service-specific parameters
        request = CreateApiUserRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the CreateApiUser method  
        api_user = service.create_api_user(request)
        
        # FIXME: Add relevant response object usage
        print("CreateApiUser successful:", api_user)


if __name__ == "__main__":
    main()