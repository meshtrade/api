from meshtrade.wallet.account.v1 import (
    AccountService,
    CreateAccountRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = AccountService()
    
    with service:
        # Create request with service-specific parameters
        request = CreateAccountRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the CreateAccount method  
        account = service.create_account(request)
        
        # FIXME: Add relevant response object usage
        print("CreateAccount successful:", account)


if __name__ == "__main__":
    main()