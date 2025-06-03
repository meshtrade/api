/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { AmountData } from "./dataAmount_pb";
import type { RateData } from "./dataRate_pb";
import type { PerUnitData } from "./dataPerUnit_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/fee/data.proto.
 */
export declare const file_instrument_fee_data: GenFile;
/**
 *
 * Data is the generic calculation data that is attached to a Fee for reference.
 *
 * @bson-marshalled
 *
 * @generated from message api.instrument.fee.Data
 */
export type Data = Message<"api.instrument.fee.Data"> & {
    /**
     * @generated from oneof api.instrument.fee.Data.Data
     */
    Data: {
        /**
         * @generated from field: api.instrument.fee.AmountData amountData = 1;
         */
        value: AmountData;
        case: "amountData";
    } | {
        /**
         * @generated from field: api.instrument.fee.RateData rateData = 2;
         */
        value: RateData;
        case: "rateData";
    } | {
        /**
         * @generated from field: api.instrument.fee.PerUnitData perUnitData = 3;
         */
        value: PerUnitData;
        case: "perUnitData";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message api.instrument.fee.Data.
 * Use `create(DataSchema)` to create a new message.
 */
export declare const DataSchema: GenMessage<Data>;
