import * as jspb from 'google-protobuf'

import * as ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "ledger/amount.proto"


export class AmountLifecycleEventCalculationConfig extends jspb.Message {
  getAmount(): ledger_amount_pb.Amount | undefined;
  setAmount(value?: ledger_amount_pb.Amount): AmountLifecycleEventCalculationConfig;
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
    amount?: ledger_amount_pb.Amount.AsObject,
  }
}

