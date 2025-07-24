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

	// Get API user by key hash
	apiUser, err := client.GetApiUserByKeyHash(
		context.Background(),
		&api_userv1.GetApiUserByKeyHashRequest{
			KeyHash: "sha256-abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx1234yz567890", // Replace with actual key hash
		},
	)
	if err != nil {
		log.Fatalf("Failed to get API user by key hash: %v", err)
	}

	log.Printf("API user: %s", apiUser.Name)
	log.Printf("Display name: %s", apiUser.DisplayName)
	log.Printf("State: %s", apiUser.State)
	log.Printf("Roles: %v", apiUser.Roles)
}`;

const pythonCode = `from meshtrade.iam.api_user.v1 import (
    ApiUserServiceGRPCClient,
    ClientOptions,
    GetApiUserByKeyHashRequest,
)

def main():
    # Create client (loads credentials from MESH_API_CREDENTIALS)
    options = ClientOptions()
    client = ApiUserServiceGRPCClient(options)
    
    with client:
        # Get API user by key hash
        api_user = client.get_api_user_by_key_hash(
            GetApiUserByKeyHashRequest(
                key_hash="sha256-abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx1234yz567890"  # Replace with actual key hash
            )
        )
        
        print(f"API user: {api_user.name}")
        print(f"Display name: {api_user.display_name}")
        print(f"State: {api_user.state}")
        print(f"Roles: {api_user.roles}")

if __name__ == "__main__":
    main()`;

export default function GetApiUserByKeyHashExamples(): React.JSX.Element {
  return (
    <Tabs>
      <TabItem value="go" label="Go">
        <CodeBlock language="go" title="get-api-user-by-key-hash.go">{goCode}</CodeBlock>
      </TabItem>
      <TabItem value="python" label="Python">
        <CodeBlock language="python" title="get-api-user-by-key-hash.py">{pythonCode}</CodeBlock>
      </TabItem>
    </Tabs>
  );
}
