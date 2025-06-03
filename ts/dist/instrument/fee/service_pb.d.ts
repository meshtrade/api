/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Fee } from "./fee_pb";
import type { Amount } from "../../ledger/amount_pb";
import type { Criterion } from "../../search/criterion_pb";
import type { Query } from "../../search/query_pb";
import type { LifecycleEventCategory } from "../feeprofile/lifecycleEventCategory_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/fee/service.proto.
 */
export declare const file_instrument_fee_service: GenFile;
/**
 *
 * GetRequest is the Get method request on the Fee Service.
 *
 * @generated from message api.instrument.fee.GetRequest
 */
export type GetRequest = Message<"api.instrument.fee.GetRequest"> & {
    /**
     *
     * Criteria is the search criteria that specifies which Fee to retrieve.
     *
     * @generated from field: repeated api.search.Criterion criteria = 1;
     */
    criteria: Criterion[];
};
/**
 * Describes the message api.instrument.fee.GetRequest.
 * Use `create(GetRequestSchema)` to create a new message.
 */
export declare const GetRequestSchema: GenMessage<GetRequest>;
/**
 *
 * GetResponse is the Get method response on the Fee Service.
 *
 * @generated from message api.instrument.fee.GetResponse
 */
export type GetResponse = Message<"api.instrument.fee.GetResponse"> & {
    /**
     *
     * Fee is the Fee that was retrieved.
     *
     * @generated from field: api.instrument.fee.Fee fee = 1;
     */
    fee?: Fee;
};
/**
 * Describes the message api.instrument.fee.GetResponse.
 * Use `create(GetResponseSchema)` to create a new message.
 */
export declare const GetResponseSchema: GenMessage<GetResponse>;
/**
 *
 * ListRequest is the List method request on the Fee Service.
 *
 * @generated from message api.instrument.fee.ListRequest
 */
export type ListRequest = Message<"api.instrument.fee.ListRequest"> & {
    /**
     *
     * Criteria is the search criteria that specifies which fees to retrieve.
     *
     * @generated from field: repeated api.search.Criterion criteria = 1;
     */
    criteria: Criterion[];
    /**
     *
     * Query controls pagination of the fees.
     *
     * @generated from field: api.search.Query query = 2;
     */
    query?: Query;
};
/**
 * Describes the message api.instrument.fee.ListRequest.
 * Use `create(ListRequestSchema)` to create a new message.
 */
export declare const ListRequestSchema: GenMessage<ListRequest>;
/**
 *
 * ListResponse is the List method response on the Fee Service.
 *
 * @generated from message api.instrument.fee.ListResponse
 */
export type ListResponse = Message<"api.instrument.fee.ListResponse"> & {
    /**
     *
     * Fees are the list of fees that were retrieved.
     *
     * @generated from field: repeated api.instrument.fee.Fee fees = 1;
     */
    fees: Fee[];
    /**
     *
     * Total is the total number of fees that match the given criteria.
     *
     * @generated from field: int64 total = 2;
     */
    total: bigint;
};
/**
 * Describes the message api.instrument.fee.ListResponse.
 * Use `create(ListResponseSchema)` to create a new message.
 */
export declare const ListResponseSchema: GenMessage<ListResponse>;
/**
 *
 * CalculateMintingFeesRequest is the CalculateMintingFees method request on the Fee Service.
 *
 * @generated from message api.instrument.fee.CalculateMintingFeesRequest
 */
export type CalculateMintingFeesRequest = Message<"api.instrument.fee.CalculateMintingFeesRequest"> & {
    /**
     *
     * Amount is the mint Amount for which fees are calculated.
     *
     * @generated from field: api.ledger.Amount Amount = 1;
     */
    Amount?: Amount;
};
/**
 * Describes the message api.instrument.fee.CalculateMintingFeesRequest.
 * Use `create(CalculateMintingFeesRequestSchema)` to create a new message.
 */
export declare const CalculateMintingFeesRequestSchema: GenMessage<CalculateMintingFeesRequest>;
/**
 *
 * CalculateMintingFeesResponse is the CalculateMintingFees method response on the Fee Service.
 *
 * @generated from message api.instrument.fee.CalculateMintingFeesResponse
 */
export type CalculateMintingFeesResponse = Message<"api.instrument.fee.CalculateMintingFeesResponse"> & {
    /**
     *
     * Fees are the fees calculated for the requested mint amount.
     *
     * @generated from field: repeated api.instrument.fee.Fee Fees = 1;
     */
    Fees: Fee[];
};
/**
 * Describes the message api.instrument.fee.CalculateMintingFeesResponse.
 * Use `create(CalculateMintingFeesResponseSchema)` to create a new message.
 */
export declare const CalculateMintingFeesResponseSchema: GenMessage<CalculateMintingFeesResponse>;
/**
 *
 * CalculateBurningFeesRequest is the CalculateBurningFees method request on the Fee Service.
 *
 * @generated from message api.instrument.fee.CalculateBurningFeesRequest
 */
export type CalculateBurningFeesRequest = Message<"api.instrument.fee.CalculateBurningFeesRequest"> & {
    /**
     *
     * Amount is the burn Amount for which fees are calculated.
     *
     * @generated from field: api.ledger.Amount Amount = 1;
     */
    Amount?: Amount;
};
/**
 * Describes the message api.instrument.fee.CalculateBurningFeesRequest.
 * Use `create(CalculateBurningFeesRequestSchema)` to create a new message.
 */
export declare const CalculateBurningFeesRequestSchema: GenMessage<CalculateBurningFeesRequest>;
/**
 *
 * CalculateBurningFeesResponse is the CalculateBurningFees method response on the Fee Service.
 *
 * @generated from message api.instrument.fee.CalculateBurningFeesResponse
 */
export type CalculateBurningFeesResponse = Message<"api.instrument.fee.CalculateBurningFeesResponse"> & {
    /**
     *
     * Fees are the fees calculated for the requested burn amount.
     *
     * @generated from field: repeated api.instrument.fee.Fee Fees = 1;
     */
    Fees: Fee[];
};
/**
 * Describes the message api.instrument.fee.CalculateBurningFeesResponse.
 * Use `create(CalculateBurningFeesResponseSchema)` to create a new message.
 */
export declare const CalculateBurningFeesResponseSchema: GenMessage<CalculateBurningFeesResponse>;
/**
 *
 * CalculateLifecycleFeesRequest is the CalculateLifecycleFees method request on the Fee Service.
 *
 * @generated from message api.instrument.fee.CalculateLifecycleFeesRequest
 */
export type CalculateLifecycleFeesRequest = Message<"api.instrument.fee.CalculateLifecycleFeesRequest"> & {
    /**
     *
     * InstrumentID is the id of the instrument for which lifecycle fees are calculated.
     *
     * @generated from field: string instrumentID = 1;
     */
    instrumentID: string;
    /**
     *
     * LifecycleEventCategory is the category of lifecycle events for which
     * lifecycle fees are calculated
     *
     * @generated from field: api.instrument.feeprofile.LifecycleEventCategory lifecycleEventCategory = 2;
     */
    lifecycleEventCategory: LifecycleEventCategory;
};
/**
 * Describes the message api.instrument.fee.CalculateLifecycleFeesRequest.
 * Use `create(CalculateLifecycleFeesRequestSchema)` to create a new message.
 */
export declare const CalculateLifecycleFeesRequestSchema: GenMessage<CalculateLifecycleFeesRequest>;
/**
 *
 * CalculateLifecycleFeesResponse is the CalculateLifecycleFees method response on the Fee Service.
 *
 * @generated from message api.instrument.fee.CalculateLifecycleFeesResponse
 */
export type CalculateLifecycleFeesResponse = Message<"api.instrument.fee.CalculateLifecycleFeesResponse"> & {
    /**
     *
     * Fees are the fees calculated for the requested instrument.
     *
     * @generated from field: repeated api.instrument.fee.Fee Fees = 1;
     */
    Fees: Fee[];
};
/**
 * Describes the message api.instrument.fee.CalculateLifecycleFeesResponse.
 * Use `create(CalculateLifecycleFeesResponseSchema)` to create a new message.
 */
export declare const CalculateLifecycleFeesResponseSchema: GenMessage<CalculateLifecycleFeesResponse>;
/**
 *
 * FullUpdateRequest is the empty FullUpdate method request on the Fee Service.
 *
 * @generated from message api.instrument.fee.FullUpdateRequest
 */
export type FullUpdateRequest = Message<"api.instrument.fee.FullUpdateRequest"> & {};
/**
 * Describes the message api.instrument.fee.FullUpdateRequest.
 * Use `create(FullUpdateRequestSchema)` to create a new message.
 */
export declare const FullUpdateRequestSchema: GenMessage<FullUpdateRequest>;
/**
 *
 * FullUpdateResponse is the empty FullUpdate method response on the Fee Service.
 *
 * @generated from message api.instrument.fee.FullUpdateResponse
 */
export type FullUpdateResponse = Message<"api.instrument.fee.FullUpdateResponse"> & {};
/**
 * Describes the message api.instrument.fee.FullUpdateResponse.
 * Use `create(FullUpdateResponseSchema)` to create a new message.
 */
export declare const FullUpdateResponseSchema: GenMessage<FullUpdateResponse>;
/**
 *
 * Service is the Fee Service.
 *
 * @generated from service api.instrument.fee.Service
 */
export declare const Service: GenService<{
    /**
     * @generated from rpc api.instrument.fee.Service.Get
     */
    get: {
        methodKind: "unary";
        input: typeof GetRequestSchema;
        output: typeof GetResponseSchema;
    };
    /**
     * @generated from rpc api.instrument.fee.Service.List
     */
    list: {
        methodKind: "unary";
        input: typeof ListRequestSchema;
        output: typeof ListResponseSchema;
    };
    /**
     * @generated from rpc api.instrument.fee.Service.CalculateMintingFees
     */
    calculateMintingFees: {
        methodKind: "unary";
        input: typeof CalculateMintingFeesRequestSchema;
        output: typeof CalculateMintingFeesResponseSchema;
    };
    /**
     * @generated from rpc api.instrument.fee.Service.CalculateBurningFees
     */
    calculateBurningFees: {
        methodKind: "unary";
        input: typeof CalculateBurningFeesRequestSchema;
        output: typeof CalculateBurningFeesResponseSchema;
    };
    /**
     * @generated from rpc api.instrument.fee.Service.CalculateLifecycleFees
     */
    calculateLifecycleFees: {
        methodKind: "unary";
        input: typeof CalculateLifecycleFeesRequestSchema;
        output: typeof CalculateLifecycleFeesResponseSchema;
    };
    /**
     * @generated from rpc api.instrument.fee.Service.FullUpdate
     */
    fullUpdate: {
        methodKind: "unary";
        input: typeof FullUpdateRequestSchema;
        output: typeof FullUpdateResponseSchema;
    };
}>;
