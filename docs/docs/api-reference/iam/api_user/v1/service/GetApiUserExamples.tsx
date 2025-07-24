import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

const goCode = `package main

import (
	"context"
	"log"

	api_userv1 "github.com/meshtrade/api/go/iam/api_user/v1"
)

func main() {
	// Create client (loads credentials from MESH_API_CREDENTIALS)
	client, err := api_userv1.NewApiUserServiceGRPCClient()
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	// Get API user by name
	apiUser, err := client.GetApiUser(
		context.Background(),
		&api_userv1.GetApiUserRequest{
			Name: "api_users/01HPQR2S3T4U5V6W7X8Y9Z0123", // Replace with actual name
		},
	)
	if err != nil {
		log.Fatalf("Failed to get API user: %v", err)
	}

	log.Printf("API user: %s", apiUser.Name)
	log.Printf("Display name: %s", apiUser.DisplayName)
	log.Printf("State: %s", apiUser.State)
	log.Printf("Roles: %v", apiUser.Roles)
}`;

const pythonCode = `from meshtrade.iam.api_user.v1 import (
    ApiUserServiceGRPCClient,
    ClientOptions,
    GetApiUserRequest,
)

def main():
    # Create client (loads credentials from MESH_API_CREDENTIALS)
    options = ClientOptions()
    client = ApiUserServiceGRPCClient(options)
    
    with client:
        # Get API user by name
        api_user = client.get_api_user(
            GetApiUserRequest(name="api_users/01HPQR2S3T4U5V6W7X8Y9Z0123")  # Replace with actual name
        )
        
        print(f"API user: {api_user.name}")
        print(f"Display name: {api_user.display_name}")
        print(f"State: {api_user.state}")
        print(f"Roles: {api_user.roles}")

if __name__ == "__main__":
    main()`;

export default function GetApiUserExamples(): React.JSX.Element {
  return (
    <Tabs>
      <TabItem value="go" label="Go">
        <CodeBlock language="go" title="get-api-user.go">{goCode}</CodeBlock>
      </TabItem>
      <TabItem value="python" label="Python">
        <CodeBlock language="python" title="get-api-user.py">{pythonCode}</CodeBlock>
      </TabItem>
    </Tabs>
  );
}
