import * as jspb from 'google-protobuf'

import * as search_boolExactCriterion_pb from '../search/boolExactCriterion_pb'; // proto import: "search/boolExactCriterion.proto"
import * as search_textExactCriterion_pb from '../search/textExactCriterion_pb'; // proto import: "search/textExactCriterion.proto"
import * as search_textNEExactCriterion_pb from '../search/textNEExactCriterion_pb'; // proto import: "search/textNEExactCriterion.proto"
import * as search_textSubstringCriterion_pb from '../search/textSubstringCriterion_pb'; // proto import: "search/textSubstringCriterion.proto"
import * as search_textListCriterion_pb from '../search/textListCriterion_pb'; // proto import: "search/textListCriterion.proto"
import * as search_textNINListCriterion_pb from '../search/textNINListCriterion_pb'; // proto import: "search/textNINListCriterion.proto"
import * as search_uint32ExactCriterion_pb from '../search/uint32ExactCriterion_pb'; // proto import: "search/uint32ExactCriterion.proto"
import * as search_uint32NEExactCriterion_pb from '../search/uint32NEExactCriterion_pb'; // proto import: "search/uint32NEExactCriterion.proto"
import * as search_uint32ListCriterion_pb from '../search/uint32ListCriterion_pb'; // proto import: "search/uint32ListCriterion.proto"
import * as search_dateRangeCriterion_pb from '../search/dateRangeCriterion_pb'; // proto import: "search/dateRangeCriterion.proto"


export class Criterion extends jspb.Message {
  getBoolexactcriterion(): search_boolExactCriterion_pb.BoolExactCriterion | undefined;
  setBoolexactcriterion(value?: search_boolExactCriterion_pb.BoolExactCriterion): Criterion;
  hasBoolexactcriterion(): boolean;
  clearBoolexactcriterion(): Criterion;

  getTextexactcriterion(): search_textExactCriterion_pb.TextExactCriterion | undefined;
  setTextexactcriterion(value?: search_textExactCriterion_pb.TextExactCriterion): Criterion;
  hasTextexactcriterion(): boolean;
  clearTextexactcriterion(): Criterion;

  getTextneexactcriterion(): search_textNEExactCriterion_pb.TextNEExactCriterion | undefined;
  setTextneexactcriterion(value?: search_textNEExactCriterion_pb.TextNEExactCriterion): Criterion;
  hasTextneexactcriterion(): boolean;
  clearTextneexactcriterion(): Criterion;

  getTextsubstringcriterion(): search_textSubstringCriterion_pb.TextSubstringCriterion | undefined;
  setTextsubstringcriterion(value?: search_textSubstringCriterion_pb.TextSubstringCriterion): Criterion;
  hasTextsubstringcriterion(): boolean;
  clearTextsubstringcriterion(): Criterion;

  getTextlistcriterion(): search_textListCriterion_pb.TextListCriterion | undefined;
  setTextlistcriterion(value?: search_textListCriterion_pb.TextListCriterion): Criterion;
  hasTextlistcriterion(): boolean;
  clearTextlistcriterion(): Criterion;

  getTextninlistcriterion(): search_textNINListCriterion_pb.TextNINListCriterion | undefined;
  setTextninlistcriterion(value?: search_textNINListCriterion_pb.TextNINListCriterion): Criterion;
  hasTextninlistcriterion(): boolean;
  clearTextninlistcriterion(): Criterion;

  getUint32exactcriterion(): search_uint32ExactCriterion_pb.Uint32ExactCriterion | undefined;
  setUint32exactcriterion(value?: search_uint32ExactCriterion_pb.Uint32ExactCriterion): Criterion;
  hasUint32exactcriterion(): boolean;
  clearUint32exactcriterion(): Criterion;

  getUint32neexactcriterion(): search_uint32NEExactCriterion_pb.Uint32NEExactCriterion | undefined;
  setUint32neexactcriterion(value?: search_uint32NEExactCriterion_pb.Uint32NEExactCriterion): Criterion;
  hasUint32neexactcriterion(): boolean;
  clearUint32neexactcriterion(): Criterion;

  getUint32listcriterion(): search_uint32ListCriterion_pb.Uint32ListCriterion | undefined;
  setUint32listcriterion(value?: search_uint32ListCriterion_pb.Uint32ListCriterion): Criterion;
  hasUint32listcriterion(): boolean;
  clearUint32listcriterion(): Criterion;

  getDaterangecriterion(): search_dateRangeCriterion_pb.DateRangeCriterion | undefined;
  setDaterangecriterion(value?: search_dateRangeCriterion_pb.DateRangeCriterion): Criterion;
  hasDaterangecriterion(): boolean;
  clearDaterangecriterion(): Criterion;

  getOrcriterion(): ORCriterion | undefined;
  setOrcriterion(value?: ORCriterion): Criterion;
  hasOrcriterion(): boolean;
  clearOrcriterion(): Criterion;

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
    boolexactcriterion?: search_boolExactCriterion_pb.BoolExactCriterion.AsObject,
    textexactcriterion?: search_textExactCriterion_pb.TextExactCriterion.AsObject,
    textneexactcriterion?: search_textNEExactCriterion_pb.TextNEExactCriterion.AsObject,
    textsubstringcriterion?: search_textSubstringCriterion_pb.TextSubstringCriterion.AsObject,
    textlistcriterion?: search_textListCriterion_pb.TextListCriterion.AsObject,
    textninlistcriterion?: search_textNINListCriterion_pb.TextNINListCriterion.AsObject,
    uint32exactcriterion?: search_uint32ExactCriterion_pb.Uint32ExactCriterion.AsObject,
    uint32neexactcriterion?: search_uint32NEExactCriterion_pb.Uint32NEExactCriterion.AsObject,
    uint32listcriterion?: search_uint32ListCriterion_pb.Uint32ListCriterion.AsObject,
    daterangecriterion?: search_dateRangeCriterion_pb.DateRangeCriterion.AsObject,
    orcriterion?: ORCriterion.AsObject,
  }

  export enum CriterionCase { 
    CRITERION_NOT_SET = 0,
    BOOLEXACTCRITERION = 1,
    TEXTEXACTCRITERION = 2,
    TEXTNEEXACTCRITERION = 3,
    TEXTSUBSTRINGCRITERION = 4,
    TEXTLISTCRITERION = 5,
    TEXTNINLISTCRITERION = 6,
    UINT32EXACTCRITERION = 7,
    UINT32NEEXACTCRITERION = 8,
    UINT32LISTCRITERION = 9,
    DATERANGECRITERION = 10,
    ORCRITERION = 11,
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

