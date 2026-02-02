package generate

import "testing"

func TestKebabCase(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		// Basic cases
		{"", ""},
		{"hello", "hello"},
		{"Hello", "hello"},
		{"HelloWorld", "hello-world"},

		// Acronym handling - the key cases we're fixing
		{"CreateAPIUser", "create-api-user"},
		{"GetAPIUser", "get-api-user"},
		{"ListAPIUsers", "list-api-users"},
		{"SearchAPIUsers", "search-api-users"},
		{"ActivateAPIUser", "activate-api-user"},
		{"DeactivateAPIUser", "deactivate-api-user"},
		{"GetAPIUserByKeyHash", "get-api-user-by-key-hash"},
		{"AssignRolesToAPIUser", "assign-roles-to-api-user"},
		{"RevokeRolesFromAPIUser", "revoke-roles-from-api-user"},

		// Other acronyms
		{"GetHTTPResponse", "get-http-response"},
		{"ParseURLPath", "parse-url-path"},
		{"GenerateUUID", "generate-uuid"},
		{"UpdateID", "update-id"},

		// Acronym at the start
		{"APIUser", "api-user"},
		{"HTTPRequest", "http-request"},
		{"URLPath", "url-path"},

		// Acronym at the end
		{"GetUserAPI", "get-user-api"},
		{"ParseHTTP", "parse-http"},

		// Multiple acronyms
		{"ConvertHTTPToHTTPS", "convert-http-to-https"},

		// Single letters and edge cases
		{"A", "a"},
		{"AB", "ab"},
		{"ABC", "abc"},
		{"ABCDef", "abc-def"},
		{"AbcDEF", "abc-def"},
		{"AbcDEFGhi", "abc-def-ghi"},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			result := kebabCase(tt.input)
			if result != tt.expected {
				t.Errorf("kebabCase(%q) = %q, expected %q", tt.input, result, tt.expected)
			}
		})
	}
}

func TestSnakeCase(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		// Basic cases
		{"", ""},
		{"hello", "hello"},
		{"Hello", "hello"},
		{"HelloWorld", "hello_world"},

		// Acronym handling
		{"CreateAPIUser", "create_api_user"},
		{"GetAPIUser", "get_api_user"},
		{"ListAPIUsers", "list_api_users"},
		{"SearchAPIUsers", "search_api_users"},
		{"GetAPIUserByKeyHash", "get_api_user_by_key_hash"},

		// Other acronyms
		{"GetHTTPResponse", "get_http_response"},
		{"ParseURLPath", "parse_url_path"},
		{"GenerateUUID", "generate_uuid"},

		// Acronym at the start
		{"APIUser", "api_user"},
		{"HTTPRequest", "http_request"},

		// Acronym at the end
		{"GetUserAPI", "get_user_api"},

		// Multiple acronyms
		{"ConvertHTTPToHTTPS", "convert_http_to_https"},

		// Single letters and edge cases
		{"A", "a"},
		{"AB", "ab"},
		{"ABC", "abc"},
		{"ABCDef", "abc_def"},
		{"AbcDEF", "abc_def"},
		{"AbcDEFGhi", "abc_def_ghi"},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			result := snakeCase(tt.input)
			if result != tt.expected {
				t.Errorf("snakeCase(%q) = %q, expected %q", tt.input, result, tt.expected)
			}
		})
	}
}

func TestGoPascalCase(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		// Basic cases
		{"", ""},
		{"hello", "Hello"},
		{"hello_world", "HelloWorld"},

		// Acronym handling - the key cases
		{"api_user", "APIUser"},
		{"api_user_service", "APIUserService"},
		{"http_request", "HTTPRequest"},
		{"url_path", "URLPath"},
		{"json_parser", "JSONParser"},
		{"grpc_client", "GRPCClient"},

		// Multiple acronyms
		{"http_api_client", "HTTPAPIClient"},
		{"json_http_parser", "JSONHTTPParser"},

		// Acronym at end
		{"user_api", "UserAPI"},
		{"parse_json", "ParseJSON"},

		// Single word acronym
		{"api", "API"},
		{"http", "HTTP"},
		{"url", "URL"},

		// Mixed
		{"my_api_user_service", "MyAPIUserService"},
		{"get_http_response", "GetHTTPResponse"},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			result := goPascalCase(tt.input)
			if result != tt.expected {
				t.Errorf("goPascalCase(%q) = %q, expected %q", tt.input, result, tt.expected)
			}
		})
	}
}

func TestProperKebabCase(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		// API prefix handling
		{"APIUser", "api-user"},
		{"APICredentials", "api-credentials"},
		{"APIUserState", "api-user-state"},
		{"APIUserAction", "api-user-action"},

		// Non-API prefixed types use standard kebabCase
		{"UserProfile", "user-profile"},
		{"HelloWorld", "hello-world"},

		// Edge case: just "API"
		{"API", "api"},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			result := properKebabCase(tt.input)
			if result != tt.expected {
				t.Errorf("properKebabCase(%q) = %q, expected %q", tt.input, result, tt.expected)
			}
		})
	}
}
