/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file iam/role/permission.proto.
 */
export declare const file_iam_role_permission: GenFile;
/**
 *
 * Permission is the ability to perform an activity in the system.
 *
 * @generated from message api.iam.role.Permission
 */
export type Permission = Message<"api.iam.role.Permission"> & {
    /**
     *
     * ServiceProvider is the name of the Service Provider that provides Service.
     *
     * @generated from field: string serviceProvider = 1;
     */
    serviceProvider: string;
    /**
     *
     * Service is the name of the Service on ServiceProvider that this Permission grants access to.
     *
     * @generated from field: string service = 2;
     */
    service: string;
    /**
     *
     * Description describes the purpose of this permission.
     *
     * @generated from field: string description = 3;
     */
    description: string;
};
/**
 * Describes the message api.iam.role.Permission.
 * Use `create(PermissionSchema)` to create a new message.
 */
export declare const PermissionSchema: GenMessage<Permission>;
