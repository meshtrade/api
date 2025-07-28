from meshtrade.iam.group.v1 import (
    GroupService,
    GetGroupRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = GroupService()
    
    with service:
        # Create request with service-specific parameters
        request = GetGroupRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the GetGroup method  
        group = service.get_group(request)
        
        # FIXME: Add relevant response object usage
        print("GetGroup successful:", group)


if __name__ == "__main__":
    main()