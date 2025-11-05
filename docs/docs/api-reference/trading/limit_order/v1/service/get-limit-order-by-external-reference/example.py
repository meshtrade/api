from meshtrade.trading.limit_order.v1 import (
    LimitOrderService,
    GetLimitOrderByExternalReferenceRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = LimitOrderService()
    
    with service:
        # Create request with service-specific parameters
        request = GetLimitOrderByExternalReferenceRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the GetLimitOrderByExternalReference method  
        limit_order = service.get_limit_order_by_external_reference(request)
        
        # FIXME: Add relevant response object usage
        print("GetLimitOrderByExternalReference successful:", limit_order)


if __name__ == "__main__":
    main()