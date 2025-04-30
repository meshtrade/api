import * as jspb from 'google-protobuf'

import * as api_proto_search_boolExactCriterion_pb from '../search/boolExactCriterion_pb'; // proto import: "api/proto/search/boolExactCriterion.proto"
import * as api_proto_search_textExactCriterion_pb from '../search/textExactCriterion_pb'; // proto import: "api/proto/search/textExactCriterion.proto"
import * as api_proto_search_textNEExactCriterion_pb from '../search/textNEExactCriterion_pb'; // proto import: "api/proto/search/textNEExactCriterion.proto"
import * as api_proto_search_textSubstringCriterion_pb from '../search/textSubstringCriterion_pb'; // proto import: "api/proto/search/textSubstringCriterion.proto"
import * as api_proto_search_textListCriterion_pb from '../search/textListCriterion_pb'; // proto import: "api/proto/search/textListCriterion.proto"
import * as api_proto_search_textNINListCriterion_pb from '../search/textNINListCriterion_pb'; // proto import: "api/proto/search/textNINListCriterion.proto"
import * as api_proto_search_uint32ExactCriterion_pb from '../search/uint32ExactCriterion_pb'; // proto import: "api/proto/search/uint32ExactCriterion.proto"
import * as api_proto_search_uint32NEExactCriterion_pb from '../search/uint32NEExactCriterion_pb'; // proto import: "api/proto/search/uint32NEExactCriterion.proto"
import * as api_proto_search_uint32ListCriterion_pb from '../search/uint32ListCriterion_pb'; // proto import: "api/proto/search/uint32ListCriterion.proto"
import * as api_proto_search_uint32RangeCriterion_pb from '../search/uint32RangeCriterion_pb'; // proto import: "api/proto/search/uint32RangeCriterion.proto"
import * as api_proto_search_uint32NINListCriterion_pb from '../search/uint32NINListCriterion_pb'; // proto import: "api/proto/search/uint32NINListCriterion.proto"
import * as api_proto_search_dateRangeCriterion_pb from '../search/dateRangeCriterion_pb'; // proto import: "api/proto/search/dateRangeCriterion.proto"
import * as api_proto_search_int64ExactCriterion_pb from '../search/int64ExactCriterion_pb'; // proto import: "api/proto/search/int64ExactCriterion.proto"


export class Criterion extends jspb.Message {
  getOrcriterion(): ORCriterion | undefined;
  setOrcriterion(value?: ORCriterion): Criterion;
  hasOrcriterion(): boolean;
  clearOrcriterion(): Criterion;

  getBoolexactcriterion(): api_proto_search_boolExactCriterion_pb.BoolExactCriterion | undefined;
  setBoolexactcriterion(value?: api_proto_search_boolExactCriterion_pb.BoolExactCriterion): Criterion;
  hasBoolexactcriterion(): boolean;
  clearBoolexactcriterion(): Criterion;

  getTextexactcriterion(): api_proto_search_textExactCriterion_pb.TextExactCriterion | undefined;
  setTextexactcriterion(value?: api_proto_search_textExactCriterion_pb.TextExactCriterion): Criterion;
  hasTextexactcriterion(): boolean;
  clearTextexactcriterion(): Criterion;

  getTextneexactcriterion(): api_proto_search_textNEExactCriterion_pb.TextNEExactCriterion | undefined;
  setTextneexactcriterion(value?: api_proto_search_textNEExactCriterion_pb.TextNEExactCriterion): Criterion;
  hasTextneexactcriterion(): boolean;
  clearTextneexactcriterion(): Criterion;

  getTextsubstringcriterion(): api_proto_search_textSubstringCriterion_pb.TextSubstringCriterion | undefined;
  setTextsubstringcriterion(value?: api_proto_search_textSubstringCriterion_pb.TextSubstringCriterion): Criterion;
  hasTextsubstringcriterion(): boolean;
  clearTextsubstringcriterion(): Criterion;

  getTextlistcriterion(): api_proto_search_textListCriterion_pb.TextListCriterion | undefined;
  setTextlistcriterion(value?: api_proto_search_textListCriterion_pb.TextListCriterion): Criterion;
  hasTextlistcriterion(): boolean;
  clearTextlistcriterion(): Criterion;

  getTextninlistcriterion(): api_proto_search_textNINListCriterion_pb.TextNINListCriterion | undefined;
  setTextninlistcriterion(value?: api_proto_search_textNINListCriterion_pb.TextNINListCriterion): Criterion;
  hasTextninlistcriterion(): boolean;
  clearTextninlistcriterion(): Criterion;

  getUint32exactcriterion(): api_proto_search_uint32ExactCriterion_pb.Uint32ExactCriterion | undefined;
  setUint32exactcriterion(value?: api_proto_search_uint32ExactCriterion_pb.Uint32ExactCriterion): Criterion;
  hasUint32exactcriterion(): boolean;
  clearUint32exactcriterion(): Criterion;

  getUint32neexactcriterion(): api_proto_search_uint32NEExactCriterion_pb.Uint32NEExactCriterion | undefined;
  setUint32neexactcriterion(value?: api_proto_search_uint32NEExactCriterion_pb.Uint32NEExactCriterion): Criterion;
  hasUint32neexactcriterion(): boolean;
  clearUint32neexactcriterion(): Criterion;

  getUint32listcriterion(): api_proto_search_uint32ListCriterion_pb.Uint32ListCriterion | undefined;
  setUint32listcriterion(value?: api_proto_search_uint32ListCriterion_pb.Uint32ListCriterion): Criterion;
  hasUint32listcriterion(): boolean;
  clearUint32listcriterion(): Criterion;

  getUint32rangecriterion(): api_proto_search_uint32RangeCriterion_pb.Uint32RangeCriterion | undefined;
  setUint32rangecriterion(value?: api_proto_search_uint32RangeCriterion_pb.Uint32RangeCriterion): Criterion;
  hasUint32rangecriterion(): boolean;
  clearUint32rangecriterion(): Criterion;

  getUint32ninlistcriterion(): api_proto_search_uint32NINListCriterion_pb.Uint32NINListCriterion | undefined;
  setUint32ninlistcriterion(value?: api_proto_search_uint32NINListCriterion_pb.Uint32NINListCriterion): Criterion;
  hasUint32ninlistcriterion(): boolean;
  clearUint32ninlistcriterion(): Criterion;

  getDaterangecriterion(): api_proto_search_dateRangeCriterion_pb.DateRangeCriterion | undefined;
  setDaterangecriterion(value?: api_proto_search_dateRangeCriterion_pb.DateRangeCriterion): Criterion;
  hasDaterangecriterion(): boolean;
  clearDaterangecriterion(): Criterion;

  getInt64exactcriterion(): api_proto_search_int64ExactCriterion_pb.Int64ExactCriterion | undefined;
  setInt64exactcriterion(value?: api_proto_search_int64ExactCriterion_pb.Int64ExactCriterion): Criterion;
  hasInt64exactcriterion(): boolean;
  clearInt64exactcriterion(): Criterion;

  getCriterionCase(): Criterion.CriterionCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Criterion.AsObject;
  static toObject(includeInstance: boolean, msg: Criterion): Criterion.AsObject;
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
    uint32rangecriterion?: api_proto_search_uint32RangeCriterion_pb.Uint32RangeCriterion.AsObject,
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
    UINT32RANGECRITERION = 11,
    UINT32NINLISTCRITERION = 12,
    DATERANGECRITERION = 13,
    INT64EXACTCRITERION = 14,
  }
}

export class ORCriterion extends jspb.Message {
  getCriteriaList(): Array<Criterion>;
  setCriteriaList(value: Array<Criterion>): ORCriterion;
  clearCriteriaList(): ORCriterion;
  addCriteria(value?: Criterion, index?: number): Criterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ORCriterion.AsObject;
  static toObject(includeInstance: boolean, msg: ORCriterion): ORCriterion.AsObject;
  static serializeBinaryToWriter(message: ORCriterion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ORCriterion;
  static deserializeBinaryFromReader(message: ORCriterion, reader: jspb.BinaryReader): ORCriterion;
}

export namespace ORCriterion {
  export type AsObject = {
    criteriaList: Array<Criterion.AsObject>,
  }
}

