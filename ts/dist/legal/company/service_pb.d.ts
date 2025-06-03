/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Criterion } from "../../search/criterion_pb";
import type { Query } from "../../search/query_pb";
import type { Company } from "./company_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file legal/company/service.proto.
 */
export declare const file_legal_company_service: GenFile;
/**
 *
 * ListRequest is the List method request on the Fee Service.
 *
 * @generated from message api.legal.company.ListRequest
 */
export type ListRequest = Message<"api.legal.company.ListRequest"> & {
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
 * Describes the message api.legal.company.ListRequest.
 * Use `create(ListRequestSchema)` to create a new message.
 */
export declare const ListRequestSchema: GenMessage<ListRequest>;
/**
 *
 * ListResponse is the List method response on the Fee Service.
 *
 * @generated from message api.legal.company.ListResponse
 */
export type ListResponse = Message<"api.legal.company.ListResponse"> & {
    /**
     *
     * Fees are the list of fees that were retrieved.
     *
     * @generated from field: repeated api.legal.company.Company companies = 1;
     */
    companies: Company[];
    /**
     *
     * Total is the total number of fees that match the given criteria.
     *
     * @generated from field: int64 total = 2;
     */
    total: bigint;
};
/**
 * Describes the message api.legal.company.ListResponse.
 * Use `create(ListResponseSchema)` to create a new message.
 */
export declare const ListResponseSchema: GenMessage<ListResponse>;
/**
 * @generated from service api.legal.company.Service
 */
export declare const Service: GenService<{
    /**
     * @generated from rpc api.legal.company.Service.List
     */
    list: {
        methodKind: "unary";
        input: typeof ListRequestSchema;
        output: typeof ListResponseSchema;
    };
}>;
