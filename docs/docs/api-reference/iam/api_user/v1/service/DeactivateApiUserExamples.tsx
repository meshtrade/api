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

	// Deactivate the API user by name
	deactivatedUser, err := client.DeactivateApiUser(
		context.Background(),
		&api_userv1.DeactivateApiUserRequest{
			Name: "api_users/01HPQR2S3T4U5V6W7X8Y9Z0123", // Replace with actual name
		},
	)
	if err != nil {
		log.Fatalf("Failed to deactivate API user: %v", err)
	}

	log.Printf("Deactivated API user: %s", deactivatedUser.Name)
	log.Printf("State: %s", deactivatedUser.State)
}`;

const pythonCode = `from meshtrade.iam.api_user.v1 import (
    ApiUserServiceGRPCClient,
    ClientOptions,
    DeactivateApiUserRequest,
)

def main():
    # Create client (loads credentials from MESH_API_CREDENTIALS)
    options = ClientOptions()
    client = ApiUserServiceGRPCClient(options)
    
    with client:
        # Deactivate the API user by name
        deactivated_user = client.deactivate_api_user(
            DeactivateApiUserRequest(name="api_users/01HPQR2S3T4U5V6W7X8Y9Z0123")  # Replace with actual name
        )
        
        print(f"Deactivated API user: {deactivated_user.name}")
        print(f"State: {deactivated_user.state}")

if __name__ == "__main__":
    main()`;

export default function DeactivateApiUserExamples(): React.JSX.Element {
  return (
    <Tabs>
      <TabItem value="go" label="Go">
        <CodeBlock language="go" title="deactivate-api-user.go">{goCode}</CodeBlock>
      </TabItem>
      <TabItem value="python" label="Python">
        <CodeBlock language="python" title="deactivate-api-user.py">{pythonCode}</CodeBlock>
      </TabItem>
    </Tabs>
  );
}
