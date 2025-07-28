from meshtrade.iam.api_user.v1 import (
    ApiUserService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = ApiUserService()
    
    with service:
        # Call the ListApiUsers method (no request parameters)
        response = service.list_api_users()
        
        # FIXME: Add relevant response object usage
        print("ListApiUsers successful:", response)


if __name__ == "__main__":
    main()