/**
 * Integration tests for UserServiceWeb validation
 * Tests buf.validate schema validation before network calls
 */

import { create } from "@bufbuild/protobuf";
import {
  GetUserRequestSchema,
  AssignRolesToUserRequestSchema,
} from "./service_pb";
import { UserServiceWeb } from "./service_web_meshts";
import { WithServerUrl } from "../../../config";

describe("UserServiceWeb - Request validation (before network call)", () => {
  let client: UserServiceWeb;

  beforeEach(() => {
    // Create client with dummy server URL - validation happens before network call
    client = new UserServiceWeb(WithServerUrl("http://localhost:9999"));
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

    it("should throw validation error for wrong resource type", async () => {
      const request = create(GetUserRequestSchema, {
        name: "api_users/01ARZ3NDEKTSV4YWVF8F5BH3AB",
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

  describe("AssignRolesToUserRequest validation", () => {
    it("should pass validation with valid request and fail at network layer", async () => {
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

    it("should throw validation error for empty name", async () => {
      const request = create(AssignRolesToUserRequestSchema, {
        name: "",
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

    it("should throw validation error for invalid ULID in name", async () => {
      const request = create(AssignRolesToUserRequestSchema, {
        name: "users/invalid",
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
