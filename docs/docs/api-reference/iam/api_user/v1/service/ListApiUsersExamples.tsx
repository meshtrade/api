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

	// List API users
	response, err := client.ListApiUsers(
		context.Background(),
		&api_userv1.ListApiUsersRequest{
			Parent:   "groups/" + client.Group(),
			PageSize: 10,
		},
	)
	if err != nil {
		log.Fatalf("Failed to list API users: %v", err)
	}

	log.Printf("Found %d API users", len(response.ApiUsers))
	for _, apiUser := range response.ApiUsers {
		log.Printf("- %s (%s): %s", apiUser.Name, apiUser.DisplayName, apiUser.State)
	}
	
	if response.NextPageToken != "" {
		log.Printf("More results available, next page token: %s", response.NextPageToken)
	}
}`;

const pythonCode = `from meshtrade.iam.api_user.v1 import (
    ApiUserServiceGRPCClient,
    ClientOptions,
    ListApiUsersRequest,
)

def main():
    # Create client (loads credentials from MESH_API_CREDENTIALS)
    options = ClientOptions()
    client = ApiUserServiceGRPCClient(options)
    
    with client:
        # List API users
        response = client.list_api_users(
            ListApiUsersRequest(
                parent=f"groups/{client.group()}",
                page_size=10,
            )
        )
        
        print(f"Found {len(response.api_users)} API users")
        for api_user in response.api_users:
            print(f"- {api_user.name} ({api_user.display_name}): {api_user.state}")
        
        if response.next_page_token:
            print(f"More results available, next page token: {response.next_page_token}")

if __name__ == "__main__":
    main()`;

export default function ListApiUsersExamples(): React.JSX.Element {
  return (
    <Tabs>
      <TabItem value="go" label="Go">
        <CodeBlock language="go" title="list-api-users.go">{goCode}</CodeBlock>
      </TabItem>
      <TabItem value="python" label="Python">
        <CodeBlock language="python" title="list-api-users.py">{pythonCode}</CodeBlock>
      </TabItem>
    </Tabs>
  );
}
