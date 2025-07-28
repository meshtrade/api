from meshtrade.wallet.account.v1 import (
    AccountService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = AccountService()
    
    with service:
        # Call the ListAccounts method (no request parameters)
        response = service.list_accounts()
        
        # FIXME: Add relevant response object usage
        print("ListAccounts successful:", response)


if __name__ == "__main__":
    main()