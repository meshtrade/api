/**
 * Integration tests for APIUserServiceNode client configuration and withGroup() functionality.
 *
 * Tests verify:
 * - Functional options pattern configuration
 * - withGroup() method behavior across all authentication modes
 * - Proper client instantiation with various configuration combinations
 */

import { APIUserServiceNode } from "./service_node_meshts";
import {
  WithAPIKey,
  WithJWTAccessToken,
  WithGroup,
  WithServerUrl,
} from "../../../config";

describe("APIUserServiceNode Integration Tests", () => {
  describe("Configuration Tests", () => {
    describe("No Authentication", () => {
      it("should create client with default server URL", () => {
        const client = new APIUserServiceNode();

        // Verify client was created
        expect(client).toBeDefined();
        expect(client).toBeInstanceOf(APIUserServiceNode);

        // Access private config through type assertion for testing
        const config = (client as any)._config;
        expect(config.apiServerURL).toBe("http://localhost:10000");
        expect(config.apiKey).toBeUndefined();
        expect(config.jwtToken).toBeUndefined();
        expect(config.group).toBeUndefined();
      });

      it("should create client with custom server URL", () => {
        const customUrl = "https://api.example.com";
        const client = new APIUserServiceNode(WithServerUrl(customUrl));

        const config = (client as any)._config;
        expect(config.apiServerURL).toBe(customUrl);
        expect(config.apiKey).toBeUndefined();
        expect(config.jwtToken).toBeUndefined();
        expect(config.group).toBeUndefined();
      });
    });

    describe("API Key Authentication", () => {
      it("should create client with API key and group", () => {
        const apiKey = "test-api-key";
        const group = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";

        const client = new APIUserServiceNode(
          WithAPIKey(apiKey),
          WithGroup(group),
        );

        const config = (client as any)._config;
        expect(config.apiKey).toBe(apiKey);
        expect(config.group).toBe(group);
        expect(config.jwtToken).toBeUndefined();
      });

      it("should create client with API key, group, and custom URL", () => {
        const apiKey = "test-api-key";
        const group = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";
        const customUrl = "https://api.example.com";

        const client = new APIUserServiceNode(
          WithAPIKey(apiKey),
          WithGroup(group),
          WithServerUrl(customUrl),
        );

        const config = (client as any)._config;
        expect(config.apiKey).toBe(apiKey);
        expect(config.group).toBe(group);
        expect(config.apiServerURL).toBe(customUrl);
        expect(config.jwtToken).toBeUndefined();
      });

      it("should create interceptors for API key and group", () => {
        const apiKey = "test-api-key";
        const group = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";

        const client = new APIUserServiceNode(
          WithAPIKey(apiKey),
          WithGroup(group),
        );

        const interceptors = (client as any)._interceptors;
        expect(interceptors).toBeDefined();
        expect(interceptors.length).toBeGreaterThan(0);

        // Should have logging + API key + group interceptors
        expect(interceptors.length).toBeGreaterThanOrEqual(3);
      });
    });

    describe("JWT Authentication", () => {
      it("should create client with JWT token only", () => {
        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test";

        const client = new APIUserServiceNode(WithJWTAccessToken(jwtToken));

        const config = (client as any)._config;
        expect(config.jwtToken).toBe(jwtToken);
        expect(config.apiKey).toBeUndefined();
        expect(config.group).toBeUndefined();
      });

      it("should create client with JWT token and group", () => {
        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test";
        const group = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";

        const client = new APIUserServiceNode(
          WithJWTAccessToken(jwtToken),
          WithGroup(group),
        );

        const config = (client as any)._config;
        expect(config.jwtToken).toBe(jwtToken);
        expect(config.group).toBe(group);
        expect(config.apiKey).toBeUndefined();
      });

      it("should create client with JWT token, group, and custom URL", () => {
        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test";
        const group = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";
        const customUrl = "https://api.example.com";

        const client = new APIUserServiceNode(
          WithJWTAccessToken(jwtToken),
          WithGroup(group),
          WithServerUrl(customUrl),
        );

        const config = (client as any)._config;
        expect(config.jwtToken).toBe(jwtToken);
        expect(config.group).toBe(group);
        expect(config.apiServerURL).toBe(customUrl);
        expect(config.apiKey).toBeUndefined();
      });

      it("should create interceptors for JWT and group", () => {
        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test";
        const group = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";

        const client = new APIUserServiceNode(
          WithJWTAccessToken(jwtToken),
          WithGroup(group),
        );

        const interceptors = (client as any)._interceptors;
        expect(interceptors).toBeDefined();
        expect(interceptors.length).toBeGreaterThan(0);

        // Should have logging + JWT + group interceptors
        expect(interceptors.length).toBeGreaterThanOrEqual(3);
      });
    });

    describe("Validation Tests", () => {
      it("should throw error when both API key and JWT are provided", () => {
        const apiKey = "test-api-key";
        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test";

        expect(() => {
          new APIUserServiceNode(WithAPIKey(apiKey), WithJWTAccessToken(jwtToken));
        }).toThrow("Cannot use both WithJWTAccessToken() and WithAPIKey()");
      });

      it("should throw error for empty API key", () => {
        expect(() => {
          new APIUserServiceNode(WithAPIKey(""));
        }).toThrow("API key cannot be empty");
      });

      it("should throw error for empty JWT token", () => {
        expect(() => {
          new APIUserServiceNode(WithJWTAccessToken(""));
        }).toThrow("JWT token cannot be empty");
      });

      it("should throw error for empty group", () => {
        expect(() => {
          new APIUserServiceNode(WithGroup(""));
        }).toThrow("Group cannot be empty");
      });

      it("should throw error for empty server URL", () => {
        expect(() => {
          new APIUserServiceNode(WithServerUrl(""));
        }).toThrow("Server URL cannot be empty");
      });
    });
  });

  describe("withGroup() Method Tests", () => {
    describe("No Authentication Mode", () => {
      it("should create new client with group when starting with no auth", () => {
        const originalClient = new APIUserServiceNode();
        const newGroup = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";

        const newClient = originalClient.withGroup(newGroup);

        // Verify new client is a different instance
        expect(newClient).not.toBe(originalClient);
        expect(newClient).toBeInstanceOf(APIUserServiceNode);

        // Verify original client unchanged
        const originalConfig = (originalClient as any)._config;
        expect(originalConfig.group).toBeUndefined();

        // Verify new client has group
        const newConfig = (newClient as any)._config;
        expect(newConfig.group).toBe(newGroup);
        expect(newConfig.apiKey).toBeUndefined();
        expect(newConfig.jwtToken).toBeUndefined();
      });

      it("should preserve custom server URL when adding group", () => {
        const customUrl = "https://api.example.com";
        const originalClient = new APIUserServiceNode(WithServerUrl(customUrl));
        const newGroup = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";

        const newClient = originalClient.withGroup(newGroup);

        const newConfig = (newClient as any)._config;
        expect(newConfig.group).toBe(newGroup);
        expect(newConfig.apiServerURL).toBe(customUrl);
      });
    });

    describe("API Key Authentication Mode", () => {
      it("should create new client with updated group while preserving API key", () => {
        const apiKey = "test-api-key";
        const originalGroup = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";
        const newGroup = "groups/01BX5ZZKBKACTAV9WEVGEMMVRY";

        const originalClient = new APIUserServiceNode(
          WithAPIKey(apiKey),
          WithGroup(originalGroup),
        );

        const newClient = originalClient.withGroup(newGroup);

        // Verify new instance
        expect(newClient).not.toBe(originalClient);
        expect(newClient).toBeInstanceOf(APIUserServiceNode);

        // Verify original client unchanged
        const originalConfig = (originalClient as any)._config;
        expect(originalConfig.apiKey).toBe(apiKey);
        expect(originalConfig.group).toBe(originalGroup);

        // Verify new client has new group but same API key
        const newConfig = (newClient as any)._config;
        expect(newConfig.apiKey).toBe(apiKey);
        expect(newConfig.group).toBe(newGroup);
        expect(newConfig.jwtToken).toBeUndefined();
      });

      it("should preserve custom server URL when changing group", () => {
        const apiKey = "test-api-key";
        const originalGroup = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";
        const newGroup = "groups/01BX5ZZKBKACTAV9WEVGEMMVRY";
        const customUrl = "https://api.example.com";

        const originalClient = new APIUserServiceNode(
          WithAPIKey(apiKey),
          WithGroup(originalGroup),
          WithServerUrl(customUrl),
        );

        const newClient = originalClient.withGroup(newGroup);

        const newConfig = (newClient as any)._config;
        expect(newConfig.apiKey).toBe(apiKey);
        expect(newConfig.group).toBe(newGroup);
        expect(newConfig.apiServerURL).toBe(customUrl);
      });

      it("should create proper interceptors for new group", () => {
        const apiKey = "test-api-key";
        const originalGroup = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";
        const newGroup = "groups/01BX5ZZKBKACTAV9WEVGEMMVRY";

        const originalClient = new APIUserServiceNode(
          WithAPIKey(apiKey),
          WithGroup(originalGroup),
        );

        const newClient = originalClient.withGroup(newGroup);

        // Both should have interceptors
        const originalInterceptors = (originalClient as any)._interceptors;
        const newInterceptors = (newClient as any)._interceptors;

        expect(originalInterceptors.length).toBeGreaterThan(0);
        expect(newInterceptors.length).toBeGreaterThan(0);

        // Should have same number of interceptors (logging + API key + group)
        expect(newInterceptors.length).toBe(originalInterceptors.length);
      });
    });

    describe("JWT Authentication Mode", () => {
      it("should create new client with updated group while preserving JWT", () => {
        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test";
        const originalGroup = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";
        const newGroup = "groups/01BX5ZZKBKACTAV9WEVGEMMVRY";

        const originalClient = new APIUserServiceNode(
          WithJWTAccessToken(jwtToken),
          WithGroup(originalGroup),
        );

        const newClient = originalClient.withGroup(newGroup);

        // Verify new instance
        expect(newClient).not.toBe(originalClient);
        expect(newClient).toBeInstanceOf(APIUserServiceNode);

        // Verify original client unchanged
        const originalConfig = (originalClient as any)._config;
        expect(originalConfig.jwtToken).toBe(jwtToken);
        expect(originalConfig.group).toBe(originalGroup);

        // Verify new client has new group but same JWT
        const newConfig = (newClient as any)._config;
        expect(newConfig.jwtToken).toBe(jwtToken);
        expect(newConfig.group).toBe(newGroup);
        expect(newConfig.apiKey).toBeUndefined();
      });

      it("should work when adding group to JWT-only client", () => {
        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test";
        const newGroup = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";

        const originalClient = new APIUserServiceNode(
          WithJWTAccessToken(jwtToken),
        );

        const newClient = originalClient.withGroup(newGroup);

        // Verify original has no group
        const originalConfig = (originalClient as any)._config;
        expect(originalConfig.jwtToken).toBe(jwtToken);
        expect(originalConfig.group).toBeUndefined();

        // Verify new client has group
        const newConfig = (newClient as any)._config;
        expect(newConfig.jwtToken).toBe(jwtToken);
        expect(newConfig.group).toBe(newGroup);
      });

      it("should preserve custom server URL when changing group with JWT", () => {
        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test";
        const originalGroup = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";
        const newGroup = "groups/01BX5ZZKBKACTAV9WEVGEMMVRY";
        const customUrl = "https://api.example.com";

        const originalClient = new APIUserServiceNode(
          WithJWTAccessToken(jwtToken),
          WithGroup(originalGroup),
          WithServerUrl(customUrl),
        );

        const newClient = originalClient.withGroup(newGroup);

        const newConfig = (newClient as any)._config;
        expect(newConfig.jwtToken).toBe(jwtToken);
        expect(newConfig.group).toBe(newGroup);
        expect(newConfig.apiServerURL).toBe(customUrl);
      });

      it("should create proper interceptors for new group with JWT", () => {
        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test";
        const originalGroup = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";
        const newGroup = "groups/01BX5ZZKBKACTAV9WEVGEMMVRY";

        const originalClient = new APIUserServiceNode(
          WithJWTAccessToken(jwtToken),
          WithGroup(originalGroup),
        );

        const newClient = originalClient.withGroup(newGroup);

        // Both should have interceptors
        const originalInterceptors = (originalClient as any)._interceptors;
        const newInterceptors = (newClient as any)._interceptors;

        expect(originalInterceptors.length).toBeGreaterThan(0);
        expect(newInterceptors.length).toBeGreaterThan(0);

        // Should have same number of interceptors (logging + JWT + group)
        expect(newInterceptors.length).toBe(originalInterceptors.length);
      });
    });

    describe("Multiple withGroup() Calls", () => {
      it("should allow chaining multiple withGroup() calls", () => {
        const apiKey = "test-api-key";
        const group1 = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";
        const group2 = "groups/01BX5ZZKBKACTAV9WEVGEMMVRY";
        const group3 = "groups/01C8XG8AS1T2NFGHJKBQ9WPXYZ";

        const client1 = new APIUserServiceNode(
          WithAPIKey(apiKey),
          WithGroup(group1),
        );

        const client2 = client1.withGroup(group2);
        const client3 = client2.withGroup(group3);

        // All should be different instances
        expect(client1).not.toBe(client2);
        expect(client2).not.toBe(client3);
        expect(client1).not.toBe(client3);

        // Verify each has correct group
        expect((client1 as any)._config.group).toBe(group1);
        expect((client2 as any)._config.group).toBe(group2);
        expect((client3 as any)._config.group).toBe(group3);

        // All should have same API key
        expect((client1 as any)._config.apiKey).toBe(apiKey);
        expect((client2 as any)._config.apiKey).toBe(apiKey);
        expect((client3 as any)._config.apiKey).toBe(apiKey);
      });
    });

    describe("Group Validation in withGroup()", () => {
      it("should validate group format when calling withGroup()", () => {
        const client = new APIUserServiceNode();

        // Valid group should work
        expect(() => {
          client.withGroup("groups/01ARZ3NDEKTSV4YWVF8F5BH3AB");
        }).not.toThrow();

        // Invalid group formats should throw
        expect(() => {
          client.withGroup("invalid-group");
        }).toThrow("Invalid group format");

        expect(() => {
          client.withGroup("groups/short");
        }).toThrow("Invalid group format");

        expect(() => {
          client.withGroup("01ARZ3NDEKTSV4YWVF8F5BH3AB");
        }).toThrow("Invalid group format");
      });
    });
  });

  describe("Client Instance Independence", () => {
    it("should create independent client instances", () => {
      const apiKey1 = "api-key-1";
      const apiKey2 = "api-key-2";
      const group1 = "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB";
      const group2 = "groups/01BX5ZZKBKACTAV9WEVGEMMVRY";

      const client1 = new APIUserServiceNode(
        WithAPIKey(apiKey1),
        WithGroup(group1),
      );

      const client2 = new APIUserServiceNode(
        WithAPIKey(apiKey2),
        WithGroup(group2),
      );

      // Verify they're different instances with different configs
      expect(client1).not.toBe(client2);
      expect((client1 as any)._config).not.toBe((client2 as any)._config);

      const config1 = (client1 as any)._config;
      const config2 = (client2 as any)._config;

      expect(config1.apiKey).toBe(apiKey1);
      expect(config1.group).toBe(group1);
      expect(config2.apiKey).toBe(apiKey2);
      expect(config2.group).toBe(group2);
    });
  });
});
