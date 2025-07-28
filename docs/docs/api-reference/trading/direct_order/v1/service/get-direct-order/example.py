from meshtrade.trading.direct_order.v1 import (
    DirectOrderService,
    GetDirectOrderRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = DirectOrderService()
    
    with service:
        # Create request with service-specific parameters
        request = GetDirectOrderRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the GetDirectOrder method  
        order = service.get_direct_order(request)
        
        # FIXME: Add relevant response object usage
        print("GetDirectOrder successful:", order)


if __name__ == "__main__":
    main()