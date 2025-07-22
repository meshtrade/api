"""
Example usage of the ApiUserService Python gRPC client wrapper.
This demonstrates how to use the high-level client interface.
"""

import asyncio
from datetime import timedelta

from meshtrade.iam.api_user.v1 import (
    create_api_user_service_grpc_client,
    with_api_key,
    with_group,
    with_timeout,
    with_address,
    GetApiUserRequest,
    CreateApiUserRequest,
    ListApiUsersRequest,
    APIUser,
    APIUserState,
)


async def basic_usage_example():
    """Basic usage example with credentials from environment."""
    
    # Create client with credentials loaded from MESH_API_CREDENTIALS environment variable
    client = await create_api_user_service_grpc_client()
    
    try:
        # Get an API user
        get_request = GetApiUserRequest(name="api_users/01ABCDEF123456789")
        user = await client.get_api_user(get_request)
        print(f"Retrieved user: {user.display_name}")
        
        # List all API users
        list_request = ListApiUsersRequest()
        response = await client.list_api_users(list_request)
        print(f"Found {len(response.api_users)} users")
        
    finally:
        client.close()


async def manual_configuration_example():
    """Example with manual configuration options."""
    
    client = await create_api_user_service_grpc_client(
        with_api_key("your-api-key-here"),
        with_group("your-group-id"),
        with_timeout(timedelta(seconds=10)),
        with_address("staging-api.example.com", 443),
    )
    
    try:
        # Create a new API user
        new_user = APIUser(
            display_name="Test User",
            owner="groups/test-group",
            state=APIUserState.API_USER_STATE_ACTIVE,
        )
        
        create_request = CreateApiUserRequest(api_user=new_user)
        created_user = await client.create_api_user(create_request)
        print(f"Created user: {created_user.name}")
        
    finally:
        client.close()


async def context_manager_example():
    """Example using async context manager for automatic cleanup."""
    
    async with await create_api_user_service_grpc_client(
        with_api_key("your-api-key"),
        with_group("your-group-id"),
    ) as client:
        # Use client normally
        list_request = ListApiUsersRequest()
        response = await client.list_api_users(list_request)
        
        for user in response.api_users:
            print(f"User: {user.display_name} (State: {user.state})")
    
    # Client is automatically closed when exiting the context


async def error_handling_example():
    """Example with proper error handling."""
    
    try:
        client = await create_api_user_service_grpc_client(
            with_api_key("your-api-key"),
            with_group("your-group-id"),
        )
        
        async with client:
            try:
                # This might fail if the user doesn't exist
                get_request = GetApiUserRequest(name="api_users/nonexistent")
                user = await client.get_api_user(get_request)
                print(f"User found: {user.display_name}")
                
            except grpc.RpcError as e:
                if e.code() == grpc.StatusCode.NOT_FOUND:
                    print("User not found")
                else:
                    print(f"gRPC error: {e.code()} - {e.details()}")
                    
            except asyncio.TimeoutError:
                print("Request timed out")
                
    except ValueError as e:
        print(f"Configuration error: {e}")


async def batch_operations_example():
    """Example showing multiple operations in a single session."""
    
    async with await create_api_user_service_grpc_client(
        with_api_key("your-api-key"),
        with_group("your-group-id"),
    ) as client:
        
        # Get all users
        list_request = ListApiUsersRequest()
        all_users = await client.list_api_users(list_request)
        
        # Process each user
        for user in all_users.api_users:
            if user.state == APIUserState.API_USER_STATE_INACTIVE:
                # Activate inactive users
                activate_request = ActivateApiUserRequest(name=user.name)
                await client.activate_api_user(activate_request)
                print(f"Activated user: {user.display_name}")


if __name__ == "__main__":
    # Run examples
    print("=== Basic Usage Example ===")
    asyncio.run(basic_usage_example())
    
    print("\n=== Manual Configuration Example ===")
    asyncio.run(manual_configuration_example())
    
    print("\n=== Context Manager Example ===")
    asyncio.run(context_manager_example())
    
    print("\n=== Error Handling Example ===")
    asyncio.run(error_handling_example())
    
    print("\n=== Batch Operations Example ===")
    asyncio.run(batch_operations_example())
