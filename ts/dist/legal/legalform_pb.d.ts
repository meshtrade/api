/* eslint-disable */
// @ts-nocheck
import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv2";
/**
 * Describes the file legal/legalform.proto.
 */
export declare const file_legal_legalform: GenFile;
/**
 * Enum for LegalForm
 *
 * @generated from enum api.legal.LegalForm
 */
export declare enum LegalForm {
    /**
     * Default unknown legal form
     *
     * 0 not used to prevent unexpected default value behaviour.
     *
     * @generated from enum value: UNDEFINED_LEGAL_FORM = 0;
     */
    UNDEFINED_LEGAL_FORM = 0,
    /**
     * South African Company
     *
     * @generated from enum value: SOUTH_AFRICAN_COMPANY_LEGAL_FORM = 1;
     */
    SOUTH_AFRICAN_COMPANY_LEGAL_FORM = 1,
    /**
     * Sole Proprietorship
     *
     * @generated from enum value: SOLE_PROPRIETORSHIP_LEGAL_FORM = 2;
     */
    SOLE_PROPRIETORSHIP_LEGAL_FORM = 2,
    /**
     * Close Corporation
     *
     * @generated from enum value: CLOSE_CORPORATION_LEGAL_FORM = 3;
     */
    CLOSE_CORPORATION_LEGAL_FORM = 3,
    /**
     * Foreign Company
     *
     * @generated from enum value: FOREIGN_COMPANY_LEGAL_FORM = 4;
     */
    FOREIGN_COMPANY_LEGAL_FORM = 4,
    /**
     * Listed Company
     *
     * @generated from enum value: LISTED_COMPANY_LEGAL_FORM = 5;
     */
    LISTED_COMPANY_LEGAL_FORM = 5,
    /**
     * Partnership
     *
     * @generated from enum value: PARTNERSHIP_LEGAL_FORM = 6;
     */
    PARTNERSHIP_LEGAL_FORM = 6,
    /**
     * Trust
     *
     * @generated from enum value: TRUST_LEGAL_FORM = 7;
     */
    TRUST_LEGAL_FORM = 7,
    /**
     * Other legal form
     *
     * @generated from enum value: OTHER_LEGAL_FORM = 8;
     */
    OTHER_LEGAL_FORM = 8
}
/**
 * Describes the enum api.legal.LegalForm.
 */
export declare const LegalFormSchema: GenEnum<LegalForm>;
