/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { BoolExactCriterion } from "./boolExactCriterion_pb";
import type { TextExactCriterion } from "./textExactCriterion_pb";
import type { TextNEExactCriterion } from "./textNEExactCriterion_pb";
import type { TextSubstringCriterion } from "./textSubstringCriterion_pb";
import type { TextListCriterion } from "./textListCriterion_pb";
import type { TextNINListCriterion } from "./textNINListCriterion_pb";
import type { Uint32ExactCriterion } from "./uint32ExactCriterion_pb";
import type { Uint32NEExactCriterion } from "./uint32NEExactCriterion_pb";
import type { Uint32ListCriterion } from "./uint32ListCriterion_pb";
import type { Uint32RangeCriterion } from "./uint32RangeCriterion_pb";
import type { Uint32NINListCriterion } from "./uint32NINListCriterion_pb";
import type { DateRangeCriterion } from "./dateRangeCriterion_pb";
import type { Int64ExactCriterion } from "./int64ExactCriterion_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/criterion.proto.
 */
export declare const file_search_criterion: GenFile;
/**
 * Criterion is a placeholder for generic search criterion
 *
 * @generated from message api.search.Criterion
 */
export type Criterion = Message<"api.search.Criterion"> & {
    /**
     * @generated from oneof api.search.Criterion.criterion
     */
    criterion: {
        /**
         * @generated from field: api.search.ORCriterion orCriterion = 1;
         */
        value: ORCriterion;
        case: "orCriterion";
    } | {
        /**
         * @generated from field: api.search.BoolExactCriterion boolExactCriterion = 2;
         */
        value: BoolExactCriterion;
        case: "boolExactCriterion";
    } | {
        /**
         * @generated from field: api.search.TextExactCriterion textExactCriterion = 3;
         */
        value: TextExactCriterion;
        case: "textExactCriterion";
    } | {
        /**
         * @generated from field: api.search.TextNEExactCriterion textNEExactCriterion = 4;
         */
        value: TextNEExactCriterion;
        case: "textNEExactCriterion";
    } | {
        /**
         * @generated from field: api.search.TextSubstringCriterion textSubstringCriterion = 5;
         */
        value: TextSubstringCriterion;
        case: "textSubstringCriterion";
    } | {
        /**
         * @generated from field: api.search.TextListCriterion textListCriterion = 6;
         */
        value: TextListCriterion;
        case: "textListCriterion";
    } | {
        /**
         * @generated from field: api.search.TextNINListCriterion textNINListCriterion = 7;
         */
        value: TextNINListCriterion;
        case: "textNINListCriterion";
    } | {
        /**
         * @generated from field: api.search.Uint32ExactCriterion uint32ExactCriterion = 8;
         */
        value: Uint32ExactCriterion;
        case: "uint32ExactCriterion";
    } | {
        /**
         * @generated from field: api.search.Uint32NEExactCriterion uint32NEExactCriterion = 9;
         */
        value: Uint32NEExactCriterion;
        case: "uint32NEExactCriterion";
    } | {
        /**
         * @generated from field: api.search.Uint32ListCriterion uint32ListCriterion = 10;
         */
        value: Uint32ListCriterion;
        case: "uint32ListCriterion";
    } | {
        /**
         * @generated from field: api.search.Uint32RangeCriterion uint32RangeCriterion = 11;
         */
        value: Uint32RangeCriterion;
        case: "uint32RangeCriterion";
    } | {
        /**
         * @generated from field: api.search.Uint32NINListCriterion uint32NINListCriterion = 12;
         */
        value: Uint32NINListCriterion;
        case: "uint32NINListCriterion";
    } | {
        /**
         * @generated from field: api.search.DateRangeCriterion dateRangeCriterion = 13;
         */
        value: DateRangeCriterion;
        case: "dateRangeCriterion";
    } | {
        /**
         * @generated from field: api.search.Int64ExactCriterion int64ExactCriterion = 14;
         */
        value: Int64ExactCriterion;
        case: "int64ExactCriterion";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message api.search.Criterion.
 * Use `create(CriterionSchema)` to create a new message.
 */
export declare const CriterionSchema: GenMessage<Criterion>;
/**
 * ORCriterion allows the construction of an OR list of criterion.
 *
 * @generated from message api.search.ORCriterion
 */
export type ORCriterion = Message<"api.search.ORCriterion"> & {
    /**
     * criteria is a list of search.Criterion that are used to construct an OR
     * list
     *
     * @generated from field: repeated api.search.Criterion criteria = 1;
     */
    criteria: Criterion[];
};
/**
 * Describes the message api.search.ORCriterion.
 * Use `create(ORCriterionSchema)` to create a new message.
 */
export declare const ORCriterionSchema: GenMessage<ORCriterion>;
