/* eslint-disable */
// @ts-nocheck
// package: api.search
// file: api/proto/search/criterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_search_boolExactCriterion_pb from "../search/boolExactCriterion_pb";
import * as api_proto_search_textExactCriterion_pb from "../search/textExactCriterion_pb";
import * as api_proto_search_textNEExactCriterion_pb from "../search/textNEExactCriterion_pb";
import * as api_proto_search_textSubstringCriterion_pb from "../search/textSubstringCriterion_pb";
import * as api_proto_search_textListCriterion_pb from "../search/textListCriterion_pb";
import * as api_proto_search_textNINListCriterion_pb from "../search/textNINListCriterion_pb";
import * as api_proto_search_uint32ExactCriterion_pb from "../search/uint32ExactCriterion_pb";
import * as api_proto_search_uint32NEExactCriterion_pb from "../search/uint32NEExactCriterion_pb";
import * as api_proto_search_uint32ListCriterion_pb from "../search/uint32ListCriterion_pb";
import * as api_proto_search_uint32NINListCriterion_pb from "../search/uint32NINListCriterion_pb";
import * as api_proto_search_dateRangeCriterion_pb from "../search/dateRangeCriterion_pb";
import * as api_proto_search_int64ExactCriterion_pb from "../search/int64ExactCriterion_pb";

export class Criterion extends jspb.Message { 

    hasOrcriterion(): boolean;
    clearOrcriterion(): void;
    getOrcriterion(): ORCriterion | undefined;
    setOrcriterion(value?: ORCriterion): Criterion;

    hasBoolexactcriterion(): boolean;
    clearBoolexactcriterion(): void;
    getBoolexactcriterion(): api_proto_search_boolExactCriterion_pb.BoolExactCriterion | undefined;
    setBoolexactcriterion(value?: api_proto_search_boolExactCriterion_pb.BoolExactCriterion): Criterion;

    hasTextexactcriterion(): boolean;
    clearTextexactcriterion(): void;
    getTextexactcriterion(): api_proto_search_textExactCriterion_pb.TextExactCriterion | undefined;
    setTextexactcriterion(value?: api_proto_search_textExactCriterion_pb.TextExactCriterion): Criterion;

    hasTextneexactcriterion(): boolean;
    clearTextneexactcriterion(): void;
    getTextneexactcriterion(): api_proto_search_textNEExactCriterion_pb.TextNEExactCriterion | undefined;
    setTextneexactcriterion(value?: api_proto_search_textNEExactCriterion_pb.TextNEExactCriterion): Criterion;

    hasTextsubstringcriterion(): boolean;
    clearTextsubstringcriterion(): void;
    getTextsubstringcriterion(): api_proto_search_textSubstringCriterion_pb.TextSubstringCriterion | undefined;
    setTextsubstringcriterion(value?: api_proto_search_textSubstringCriterion_pb.TextSubstringCriterion): Criterion;

    hasTextlistcriterion(): boolean;
    clearTextlistcriterion(): void;
    getTextlistcriterion(): api_proto_search_textListCriterion_pb.TextListCriterion | undefined;
    setTextlistcriterion(value?: api_proto_search_textListCriterion_pb.TextListCriterion): Criterion;

    hasTextninlistcriterion(): boolean;
    clearTextninlistcriterion(): void;
    getTextninlistcriterion(): api_proto_search_textNINListCriterion_pb.TextNINListCriterion | undefined;
    setTextninlistcriterion(value?: api_proto_search_textNINListCriterion_pb.TextNINListCriterion): Criterion;

    hasUint32exactcriterion(): boolean;
    clearUint32exactcriterion(): void;
    getUint32exactcriterion(): api_proto_search_uint32ExactCriterion_pb.Uint32ExactCriterion | undefined;
    setUint32exactcriterion(value?: api_proto_search_uint32ExactCriterion_pb.Uint32ExactCriterion): Criterion;

    hasUint32neexactcriterion(): boolean;
    clearUint32neexactcriterion(): void;
    getUint32neexactcriterion(): api_proto_search_uint32NEExactCriterion_pb.Uint32NEExactCriterion | undefined;
    setUint32neexactcriterion(value?: api_proto_search_uint32NEExactCriterion_pb.Uint32NEExactCriterion): Criterion;

    hasUint32listcriterion(): boolean;
    clearUint32listcriterion(): void;
    getUint32listcriterion(): api_proto_search_uint32ListCriterion_pb.Uint32ListCriterion | undefined;
    setUint32listcriterion(value?: api_proto_search_uint32ListCriterion_pb.Uint32ListCriterion): Criterion;

    hasUint32ninlistcriterion(): boolean;
    clearUint32ninlistcriterion(): void;
    getUint32ninlistcriterion(): api_proto_search_uint32NINListCriterion_pb.Uint32NINListCriterion | undefined;
    setUint32ninlistcriterion(value?: api_proto_search_uint32NINListCriterion_pb.Uint32NINListCriterion): Criterion;

    hasDaterangecriterion(): boolean;
    clearDaterangecriterion(): void;
    getDaterangecriterion(): api_proto_search_dateRangeCriterion_pb.DateRangeCriterion | undefined;
    setDaterangecriterion(value?: api_proto_search_dateRangeCriterion_pb.DateRangeCriterion): Criterion;

    hasInt64exactcriterion(): boolean;
    clearInt64exactcriterion(): void;
    getInt64exactcriterion(): api_proto_search_int64ExactCriterion_pb.Int64ExactCriterion | undefined;
    setInt64exactcriterion(value?: api_proto_search_int64ExactCriterion_pb.Int64ExactCriterion): Criterion;

    getCriterionCase(): Criterion.CriterionCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Criterion.AsObject;
    static toObject(includeInstance: boolean, msg: Criterion): Criterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Criterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Criterion;
    static deserializeBinaryFromReader(message: Criterion, reader: jspb.BinaryReader): Criterion;
}

export namespace Criterion {
    export type AsObject = {
        orcriterion?: ORCriterion.AsObject,
        boolexactcriterion?: api_proto_search_boolExactCriterion_pb.BoolExactCriterion.AsObject,
        textexactcriterion?: api_proto_search_textExactCriterion_pb.TextExactCriterion.AsObject,
        textneexactcriterion?: api_proto_search_textNEExactCriterion_pb.TextNEExactCriterion.AsObject,
        textsubstringcriterion?: api_proto_search_textSubstringCriterion_pb.TextSubstringCriterion.AsObject,
        textlistcriterion?: api_proto_search_textListCriterion_pb.TextListCriterion.AsObject,
        textninlistcriterion?: api_proto_search_textNINListCriterion_pb.TextNINListCriterion.AsObject,
        uint32exactcriterion?: api_proto_search_uint32ExactCriterion_pb.Uint32ExactCriterion.AsObject,
        uint32neexactcriterion?: api_proto_search_uint32NEExactCriterion_pb.Uint32NEExactCriterion.AsObject,
        uint32listcriterion?: api_proto_search_uint32ListCriterion_pb.Uint32ListCriterion.AsObject,
        uint32ninlistcriterion?: api_proto_search_uint32NINListCriterion_pb.Uint32NINListCriterion.AsObject,
        daterangecriterion?: api_proto_search_dateRangeCriterion_pb.DateRangeCriterion.AsObject,
        int64exactcriterion?: api_proto_search_int64ExactCriterion_pb.Int64ExactCriterion.AsObject,
    }

    export enum CriterionCase {
        CRITERION_NOT_SET = 0,
        ORCRITERION = 1,
        BOOLEXACTCRITERION = 2,
        TEXTEXACTCRITERION = 3,
        TEXTNEEXACTCRITERION = 4,
        TEXTSUBSTRINGCRITERION = 5,
        TEXTLISTCRITERION = 6,
        TEXTNINLISTCRITERION = 7,
        UINT32EXACTCRITERION = 8,
        UINT32NEEXACTCRITERION = 9,
        UINT32LISTCRITERION = 10,
        UINT32NINLISTCRITERION = 11,
        DATERANGECRITERION = 12,
        INT64EXACTCRITERION = 13,
    }

}

export class ORCriterion extends jspb.Message { 
    clearCriteriaList(): void;
    getCriteriaList(): Array<Criterion>;
    setCriteriaList(value: Array<Criterion>): ORCriterion;
    addCriteria(value?: Criterion, index?: number): Criterion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ORCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: ORCriterion): ORCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ORCriterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ORCriterion;
    static deserializeBinaryFromReader(message: ORCriterion, reader: jspb.BinaryReader): ORCriterion;
}

export namespace ORCriterion {
    export type AsObject = {
        criteriaList: Array<Criterion.AsObject>,
    }
}
