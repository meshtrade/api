from meshtrade.trading.limit_order.v1 import (
    LimitOrderService,
    SearchLimitOrdersRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS 
    # environment variable or default discovery methods. Zero config required 
    # unless you want custom configuration.
    service = LimitOrderService()
    
    with service:
        # Create request with service-specific parameters
        request = SearchLimitOrdersRequest(
            # FIXME: Populate service-specific request fields
        )
        
        # Call the SearchLimitOrders method  
        response = service.search_limit_orders(request)
        
        # FIXME: Add relevant response object usage
        print("SearchLimitOrders successful:", response)


if __name__ == "__main__":
    main()