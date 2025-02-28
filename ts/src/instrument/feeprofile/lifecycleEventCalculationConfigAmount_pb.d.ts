import * as jspb from 'google-protobuf'

import * as api_proto_ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "api/proto/ledger/amount.proto"


export class AmountLifecycleEventCalculationConfig extends jspb.Message {
  getAmount(): api_proto_ledger_amount_pb.Amount | undefined;
  setAmount(value?: api_proto_ledger_amount_pb.Amount): AmountLifecycleEventCalculationConfig;
  hasAmount(): boolean;
  clearAmount(): AmountLifecycleEventCalculationConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AmountLifecycleEventCalculationConfig.AsObject;
  static toObject(includeInstance: boolean, msg: AmountLifecycleEventCalculationConfig): AmountLifecycleEventCalculationConfig.AsObject;
  static serializeBinaryToWriter(message: AmountLifecycleEventCalculationConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AmountLifecycleEventCalculationConfig;
  static deserializeBinaryFromReader(message: AmountLifecycleEventCalculationConfig, reader: jspb.BinaryReader): AmountLifecycleEventCalculationConfig;
}

export namespace AmountLifecycleEventCalculationConfig {
  export type AsObject = {
    amount?: api_proto_ledger_amount_pb.Amount.AsObject,
  }
}

