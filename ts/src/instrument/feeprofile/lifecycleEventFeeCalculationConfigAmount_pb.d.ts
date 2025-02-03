import * as jspb from 'google-protobuf'

import * as ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "ledger/amount.proto"


export class AmountLifecycleEventFeeCalculationConfig extends jspb.Message {
  getAmount(): ledger_amount_pb.Amount | undefined;
  setAmount(value?: ledger_amount_pb.Amount): AmountLifecycleEventFeeCalculationConfig;
  hasAmount(): boolean;
  clearAmount(): AmountLifecycleEventFeeCalculationConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AmountLifecycleEventFeeCalculationConfig.AsObject;
  static toObject(includeInstance: boolean, msg: AmountLifecycleEventFeeCalculationConfig): AmountLifecycleEventFeeCalculationConfig.AsObject;
  static serializeBinaryToWriter(message: AmountLifecycleEventFeeCalculationConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AmountLifecycleEventFeeCalculationConfig;
  static deserializeBinaryFromReader(message: AmountLifecycleEventFeeCalculationConfig, reader: jspb.BinaryReader): AmountLifecycleEventFeeCalculationConfig;
}

export namespace AmountLifecycleEventFeeCalculationConfig {
  export type AsObject = {
    amount?: ledger_amount_pb.Amount.AsObject,
  }
}

