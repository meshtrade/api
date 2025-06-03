/* eslint-disable */
// @ts-nocheck
import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv2";
/**
 * Describes the file client/clientType.proto.
 */
export declare const file_client_clientType: GenFile;
/**
 * @generated from enum api.client.ClientType
 */
export declare enum ClientType {
    /**
     * @generated from enum value: UNDEFINED_COMPANY_ClientType = 0;
     */
    UNDEFINED_COMPANY_ClientType = 0,
    /**
     * @generated from enum value: Issuer_Company_ClientType = 1;
     */
    Issuer_Company_ClientType = 1,
    /**
     * @generated from enum value: Investor_Company_ClientType = 2;
     */
    Investor_Company_ClientType = 2,
    /**
     * @generated from enum value: Managing_Company_ClientType = 3;
     */
    Managing_Company_ClientType = 3
}
/**
 * Describes the enum api.client.ClientType.
 */
export declare const ClientTypeSchema: GenEnum<ClientType>;
