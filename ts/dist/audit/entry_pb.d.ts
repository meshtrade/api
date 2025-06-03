/* eslint-disable */
// @ts-nocheck
import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file audit/entry.proto.
 */
export declare const file_audit_entry: GenFile;
/**
 *
 * Entry is an audit entry that is used to track versions of entities as well as
 * which user changed the entity and what action they performed on it.
 * @bson-marshalled
 *
 * @generated from message api.audit.Entry
 */
export type Entry = Message<"api.audit.Entry"> & {
    /**
     *
     * UserID is the ID of the user that did something to the entity that
     * contains this Entry.
     *
     * @generated from field: string userID = 1;
     */
    userID: string;
    /**
     *
     * Action is the action that was performed on the entity that contains this
     * Entry that required a the audit entry to be updated.
     *
     * @generated from field: api.audit.Action action = 2;
     */
    action: Action;
    /**
     *
     * Time is the time at which the Action took place.
     *
     * @generated from field: google.protobuf.Timestamp time = 4;
     */
    time?: Timestamp;
    /**
     *
     * Version increments each time the Entry on an entity is changed.
     *
     * @generated from field: uint32 version = 5;
     */
    version: number;
};
/**
 * Describes the message api.audit.Entry.
 * Use `create(EntrySchema)` to create a new message.
 */
export declare const EntrySchema: GenMessage<Entry>;
/**
 *
 * Action is the type of action performed on an entity.
 *
 * @generated from enum api.audit.Action
 */
export declare enum Action {
    /**
     * 0 not used to prevent unexpected default value behaviour
     *
     * @generated from enum value: UNDEFINED_ACTION = 0;
     */
    UNDEFINED_ACTION = 0,
    /**
     * Entity created
     *
     * @generated from enum value: CREATED_ACTION = 1;
     */
    CREATED_ACTION = 1,
    /**
     * Entity modified
     *
     * @generated from enum value: MODIFIED_ACTION = 2;
     */
    MODIFIED_ACTION = 2,
    /**
     * Entity deleted
     *
     * @generated from enum value: DELETED_ACTION = 3;
     */
    DELETED_ACTION = 3,
    /**
     * Entity restored
     *
     * @generated from enum value: RESTORED_ACTION = 4;
     */
    RESTORED_ACTION = 4
}
/**
 * Describes the enum api.audit.Action.
 */
export declare const ActionSchema: GenEnum<Action>;
