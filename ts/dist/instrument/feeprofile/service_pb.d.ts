/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { FeeProfile } from "./feeProfile_pb";
import type { Criterion } from "../../search/criterion_pb";
import type { Query } from "../../search/query_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/feeprofile/service.proto.
 */
export declare const file_instrument_feeprofile_service: GenFile;
/**
 *
 * CreateRequest is the Create method request on the Fee Profile Service.
 *
 * @generated from message api.instrument.feeprofile.CreateRequest
 */
export type CreateRequest = Message<"api.instrument.feeprofile.CreateRequest"> & {
    /**
     *
     * FeeProfile is the FeeProfile to be created.
     *
     * @generated from field: api.instrument.feeprofile.FeeProfile feeProfile = 1;
     */
    feeProfile?: FeeProfile;
};
/**
 * Describes the message api.instrument.feeprofile.CreateRequest.
 * Use `create(CreateRequestSchema)` to create a new message.
 */
export declare const CreateRequestSchema: GenMessage<CreateRequest>;
/**
 *
 * CreateResponse is the Create method response on the Fee Profile Service.
 *
 * @generated from message api.instrument.feeprofile.CreateResponse
 */
export type CreateResponse = Message<"api.instrument.feeprofile.CreateResponse"> & {
    /**
     *
     * FeeProfile is the FeeProfile that was created.
     *
     * @generated from field: api.instrument.feeprofile.FeeProfile feeProfile = 1;
     */
    feeProfile?: FeeProfile;
};
/**
 * Describes the message api.instrument.feeprofile.CreateResponse.
 * Use `create(CreateResponseSchema)` to create a new message.
 */
export declare const CreateResponseSchema: GenMessage<CreateResponse>;
/**
 *
 * UpdateRequest is the Update method request on the Fee Profile Service.
 *
 * @generated from message api.instrument.feeprofile.UpdateRequest
 */
export type UpdateRequest = Message<"api.instrument.feeprofile.UpdateRequest"> & {
    /**
     *
     * FeeProfile is the FeeProfile to be updated.
     *
     * @generated from field: api.instrument.feeprofile.FeeProfile feeProfile = 1;
     */
    feeProfile?: FeeProfile;
};
/**
 * Describes the message api.instrument.feeprofile.UpdateRequest.
 * Use `create(UpdateRequestSchema)` to create a new message.
 */
export declare const UpdateRequestSchema: GenMessage<UpdateRequest>;
/**
 *
 * UpdateResponse is the Update method response on the Fee Profile Service.
 *
 * @generated from message api.instrument.feeprofile.UpdateResponse
 */
export type UpdateResponse = Message<"api.instrument.feeprofile.UpdateResponse"> & {
    /**
     *
     * FeeProfile is the FeeProfile that was updated.
     *
     * @generated from field: api.instrument.feeprofile.FeeProfile feeProfile = 1;
     */
    feeProfile?: FeeProfile;
};
/**
 * Describes the message api.instrument.feeprofile.UpdateResponse.
 * Use `create(UpdateResponseSchema)` to create a new message.
 */
export declare const UpdateResponseSchema: GenMessage<UpdateResponse>;
/**
 *
 * ListRequest is the List method request on the Fee Profile Service.
 *
 * @generated from message api.instrument.feeprofile.ListRequest
 */
export type ListRequest = Message<"api.instrument.feeprofile.ListRequest"> & {
    /**
     *
     * Criteria is the search criteria that specifies which fee profiles to retrieve.
     *
     * @generated from field: repeated api.search.Criterion criteria = 1;
     */
    criteria: Criterion[];
    /**
     *
     * Query controls pagination of the fee profile listing.
     *
     * @generated from field: api.search.Query query = 2;
     */
    query?: Query;
};
/**
 * Describes the message api.instrument.feeprofile.ListRequest.
 * Use `create(ListRequestSchema)` to create a new message.
 */
export declare const ListRequestSchema: GenMessage<ListRequest>;
/**
 *
 * ListResponse is the List method response on the Fee Profile Service.
 *
 * @generated from message api.instrument.feeprofile.ListResponse
 */
export type ListResponse = Message<"api.instrument.feeprofile.ListResponse"> & {
    /**
     *
     * FeeProfiles are the list of fee profiles that were retrieved.
     *
     * @generated from field: repeated api.instrument.feeprofile.FeeProfile feeProfiles = 1;
     */
    feeProfiles: FeeProfile[];
    /**
     *
     * Total is the total number of fee profiles that match the given criteria.
     *
     * @generated from field: int64 total = 2;
     */
    total: bigint;
};
/**
 * Describes the message api.instrument.feeprofile.ListResponse.
 * Use `create(ListResponseSchema)` to create a new message.
 */
export declare const ListResponseSchema: GenMessage<ListResponse>;
/**
 *
 * GetRequest is the Get method request on the Fee Profile Service.
 *
 * @generated from message api.instrument.feeprofile.GetRequest
 */
export type GetRequest = Message<"api.instrument.feeprofile.GetRequest"> & {
    /**
     *
     * Criteria is the search criteria that specifies which fee profile to retrieve.
     *
     * @generated from field: repeated api.search.Criterion criteria = 1;
     */
    criteria: Criterion[];
};
/**
 * Describes the message api.instrument.feeprofile.GetRequest.
 * Use `create(GetRequestSchema)` to create a new message.
 */
export declare const GetRequestSchema: GenMessage<GetRequest>;
/**
 *
 * GetResponse is the Get method response on the Fee Profile Service.
 *
 * @generated from message api.instrument.feeprofile.GetResponse
 */
export type GetResponse = Message<"api.instrument.feeprofile.GetResponse"> & {
    /**
     *
     * FeeProfile are the is the fee profile that was retrieved.
     *
     * @generated from field: api.instrument.feeprofile.FeeProfile feeProfile = 1;
     */
    feeProfile?: FeeProfile;
};
/**
 * Describes the message api.instrument.feeprofile.GetResponse.
 * Use `create(GetResponseSchema)` to create a new message.
 */
export declare const GetResponseSchema: GenMessage<GetResponse>;
/**
 *
 * Service is the Fee Profile Service.
 *
 * @generated from service api.instrument.feeprofile.Service
 */
export declare const Service: GenService<{
    /**
     * @generated from rpc api.instrument.feeprofile.Service.Create
     */
    create: {
        methodKind: "unary";
        input: typeof CreateRequestSchema;
        output: typeof CreateResponseSchema;
    };
    /**
     * @generated from rpc api.instrument.feeprofile.Service.Update
     */
    update: {
        methodKind: "unary";
        input: typeof UpdateRequestSchema;
        output: typeof UpdateResponseSchema;
    };
    /**
     * @generated from rpc api.instrument.feeprofile.Service.List
     */
    list: {
        methodKind: "unary";
        input: typeof ListRequestSchema;
        output: typeof ListResponseSchema;
    };
    /**
     * @generated from rpc api.instrument.feeprofile.Service.Get
     */
    get: {
        methodKind: "unary";
        input: typeof GetRequestSchema;
        output: typeof GetResponseSchema;
    };
}>;
