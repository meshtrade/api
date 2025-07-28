from meshtrade.compliance.client.v1 import (
    ClientService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = ClientService()
    
    with service:
        # Call the ListClients method (no request parameters)
        response = service.list_clients()
        
        # FIXME: Add relevant response object usage
        print("ListClients successful:", response)


if __name__ == "__main__":
    main()