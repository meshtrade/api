/**
 * Integration tests for UserServiceNode validation
 * Tests buf.validate schema validation before network calls
 */

import { create } from "@bufbuild/protobuf";
import {
  GetUserRequestSchema,
  GetUserByEmailRequestSchema,
  AssignRolesToUserRequestSchema,
} from "./service_pb";
import { UserServiceNode } from "./service_node_meshts";
import { WithServerUrl } from "../../../config";

describe("UserServiceNode - Request validation (before network call)", () => {
  let client: UserServiceNode;

  beforeEach(() => {
    // Create client with dummy server URL - validation happens before network call
    client = new UserServiceNode(WithServerUrl("http://localhost:9999"));
  });

  describe("GetUserRequest validation", () => {
    it("should pass validation with valid request and fail at network layer", async () => {
      const request = create(GetUserRequestSchema, {
        name: "users/01ARZ3NDEKTSV4YWVF8F5BH3AB",
      });

      try {
        await client.getUser(request);
        fail("Expected network error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        // Validation passed - should get network error, not validation error
        expect((error as Error).message).not.toContain("Validation failed");
      }
    });

    it("should throw validation error for empty name", async () => {
      const request = create(GetUserRequestSchema, {
        name: "",
      });

      try {
        await client.getUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });

    it("should throw validation error for invalid ULID format", async () => {
      const request = create(GetUserRequestSchema, {
        name: "users/invalid",
      });

      try {
        await client.getUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });

    it("should throw validation error for lowercase ULID", async () => {
      const request = create(GetUserRequestSchema, {
        name: "users/01arz3ndektsv4ywvf8f5bh3ab",
      });

      try {
        await client.getUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });
  });

  describe("GetUserByEmailRequest validation", () => {
    it("should pass validation with valid email and fail at network layer", async () => {
      const request = create(GetUserByEmailRequestSchema, {
        email: "user@example.com",
      });

      try {
        await client.getUserByEmail(request);
        fail("Expected network error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        // Validation passed - should get network error, not validation error
        expect((error as Error).message).not.toContain("Validation failed");
      }
    });

    it("should throw validation error for invalid email format", async () => {
      const request = create(GetUserByEmailRequestSchema, {
        email: "not-an-email",
      });

      try {
        await client.getUserByEmail(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });

    it("should throw validation error for empty email", async () => {
      const request = create(GetUserByEmailRequestSchema, {
        email: "",
      });

      try {
        await client.getUserByEmail(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });
  });

  describe("AssignRolesToUserRequest validation", () => {
    it("should pass validation with valid inputs and fail at network layer", async () => {
      const request = create(AssignRolesToUserRequestSchema, {
        name: "users/01ARZ3NDEKTSV4YWVF8F5BH3AB",
        roles: [
          "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB/roles/1234567",
          "groups/01ARZ3NDEKTSV4YWVF8F5BH3AB/roles/12345678",
        ],
      });

      try {
        await client.assignRolesToUser(request);
        fail("Expected network error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        // Validation passed - should get network error, not validation error
        expect((error as Error).message).not.toContain("Validation failed");
      }
    });

    it("should throw validation error for invalid role format", async () => {
      const request = create(AssignRolesToUserRequestSchema, {
        name: "users/01ARZ3NDEKTSV4YWVF8F5BH3AB",
        roles: ["invalid-role-format"],
      });

      try {
        await client.assignRolesToUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });

    it("should throw validation error for empty roles array", async () => {
      const request = create(AssignRolesToUserRequestSchema, {
        name: "users/01ARZ3NDEKTSV4YWVF8F5BH3AB",
        roles: [],
      });

      try {
        await client.assignRolesToUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });

    it("should throw validation error for invalid user name", async () => {
      const request = create(AssignRolesToUserRequestSchema, {
        name: "invalid",
        roles: ["groups/01ARZ3NDEKTSV4YWVF8F5BH3AB/roles/1234567"],
      });

      try {
        await client.assignRolesToUser(request);
        fail("Expected validation error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("Validation failed");
      }
    });
  });
});
