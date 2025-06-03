/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file num/decimal.proto.
 */
export declare const file_num_decimal: GenFile;
/**
 * @generated from message api.num.Decimal
 */
export type Decimal = Message<"api.num.Decimal"> & {
    /**
     * @generated from field: string value = 1;
     */
    value: string;
};
/**
 * Describes the message api.num.Decimal.
 * Use `create(DecimalSchema)` to create a new message.
 */
export declare const DecimalSchema: GenMessage<Decimal>;
