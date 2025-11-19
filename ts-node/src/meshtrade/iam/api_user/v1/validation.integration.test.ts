/**
 * Integration tests for APIUserServiceNode validation
 * Tests buf.validate schema validation before network calls
 */

import { create } from "@bufbuild/protobuf";
import {
  GetAPIUserRequestSchema,
  GetAPIUserByKeyHashRequestSchema,
  AssignRolesToAPIUserRequestSchema,
} from "./service_pb";
import { APIUserServiceNode } from "./service_node_meshts";
import { WithServerUrl } from "../../../config";

describe("APIUserServiceNode - Request validation (before network call)", () => {
  let client: APIUserServiceNode;

  beforeEach(() => {
    // Create client with dummy server URL - validation happens before network call
    client = new APIUserServiceNode(WithServerUrl("http://localhost:9999"));
  });

  describe("GetAPIUserRequest validation", () => {
    it("should pass validation with valid request and fail at network layer", async () => {
      const request = create(GetAPIUserRequestSchema, {
        name: "api_users/01ARZ3NDEKTSV4YWVF8F5BH3AB",
      });

      try {
        await client.getAPIUser(request);
        fail("Expected network error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        // Validation passed - should get network error, not validation error
        expect((error as Error).message).not.toContain("Validation failed");
      }
    });

    it("should throw validation error for empty name", async () => {
      const request = create(GetAPIUserRequestSchema, {
        name: "",
      });

      try {
        await client.getAPIUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });

    it("should throw validation error for invalid ULID format", async () => {
      const request = create(GetAPIUserRequestSchema, {
        name: "api_users/invalid",
      });

      try {
        await client.getAPIUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });

    it("should throw validation error for lowercase ULID", async () => {
      const request = create(GetAPIUserRequestSchema, {
        name: "api_users/01arz3ndektsv4ywvf8f5bh3ab",
      });

      try {
        await client.getAPIUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });
  });

  describe("GetAPIUserByKeyHashRequest validation", () => {
    it("should pass validation with valid base64 key hash and fail at network layer", async () => {
      const request = create(GetAPIUserByKeyHashRequestSchema, {
        // 44-character base64: 43 base64 chars + 1 '=' padding
        keyHash: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQ=",
      });

      try {
        await client.getAPIUserByKeyHash(request);
        fail("Expected network error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        // Validation passed - should get network error, not validation error
        expect((error as Error).message).not.toContain("Validation failed");
      }
    });

    it("should throw validation error for invalid base64 format", async () => {
      const request = create(GetAPIUserByKeyHashRequestSchema, {
        keyHash: "invalid-base64",
      });

      try {
        await client.getAPIUserByKeyHash(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });

    it("should throw validation error for empty key hash", async () => {
      const request = create(GetAPIUserByKeyHashRequestSchema, {
        keyHash: "",
      });

      try {
        await client.getAPIUserByKeyHash(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });
  });

  describe("AssignRolesToAPIUserRequest validation", () => {
    it("should pass validation with valid inputs and fail at network layer", async () => {
      const request = create(AssignRolesToAPIUserRequestSchema, {
        name: "api_users/01ARZ3NDEKTSV4YWVF8F5BH3AB",
        roles: [
          "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB/roles/1234567",
          "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB/roles/12345678",
        ],
      });

      try {
        await client.assignRolesToAPIUser(request);
        fail("Expected network error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        // Validation passed - should get network error, not validation error
        expect((error as Error).message).not.toContain("Validation failed");
      }
    });

    it("should throw validation error for invalid role format", async () => {
      const request = create(AssignRolesToAPIUserRequestSchema, {
        name: "api_users/01ARZ3NDEKTSV4YWVF8F5BH3AB",
        roles: ["invalid-role-format"],
      });

      try {
        await client.assignRolesToAPIUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });

    it("should throw validation error for empty roles array", async () => {
      const request = create(AssignRolesToAPIUserRequestSchema, {
        name: "api_users/01ARZ3NDEKTSV4YWVF8F5BH3AB",
        roles: [],
      });

      try {
        await client.assignRolesToAPIUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });

    it("should throw validation error for invalid api_user name", async () => {
      const request = create(AssignRolesToAPIUserRequestSchema, {
        name: "invalid",
        roles: ["groups/01ARZ3NDEKTSV4YWVF8F5BH3AB/roles/1234567"],
      });

      try {
        await client.assignRolesToAPIUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });
  });
});
