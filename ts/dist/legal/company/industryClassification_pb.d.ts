/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file legal/company/industryClassification.proto.
 */
export declare const file_legal_company_industryClassification: GenFile;
/**
 * @generated from message api.legal.company.IndustryClassification
 */
export type IndustryClassification = Message<"api.legal.company.IndustryClassification"> & {
    /**
     * Industry code using the GICS standard (Global Industry Classification Standard)
     *
     * @generated from field: int32 industryCode = 1;
     */
    industryCode: number;
    /**
     * Name/description of the industry based on the GICS code
     *
     * @generated from field: string industryName = 2;
     */
    industryName: string;
    /**
     * Sub-industry code under the main industry using GICS classification
     *
     * @generated from field: int32 subIndustryCode = 3;
     */
    subIndustryCode: number;
    /**
     * Name/description of the sub-industry based on the GICS sub-industry code
     *
     * @generated from field: string subIndustryName = 4;
     */
    subIndustryName: string;
};
/**
 * Describes the message api.legal.company.IndustryClassification.
 * Use `create(IndustryClassificationSchema)` to create a new message.
 */
export declare const IndustryClassificationSchema: GenMessage<IndustryClassification>;
