/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Permission } from "./permission_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file iam/role/role.proto.
 */
export declare const file_iam_role_role: GenFile;
/**
 *
 * Role is a collection of permissions.
 *
 * @generated from message api.iam.role.Role
 */
export type Role = Message<"api.iam.role.Role"> & {
    /**
     *
     * Name is the name of the Role.
     *
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     *
     * Permissions are the permissions on this role.
     *
     * @generated from field: repeated api.iam.role.Permission permissions = 2;
     */
    permissions: Permission[];
};
/**
 * Describes the message api.iam.role.Role.
 * Use `create(RoleSchema)` to create a new message.
 */
export declare const RoleSchema: GenMessage<Role>;
