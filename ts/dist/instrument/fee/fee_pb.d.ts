/* eslint-disable */
// @ts-nocheck
import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Data } from "./data_pb";
import type { Amount } from "../../ledger/amount_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/fee/fee.proto.
 */
export declare const file_instrument_fee_fee: GenFile;
/**
 *
 * Fee represents a financial charge associated with an Instrument,
 * imposed on the Instrument Issuer.
 * A Fee is generated using a FeeProfile, which determines its amount
 * and other related fields.
 * Only Mesh is authorized to create and update Fee records.
 *
 * @bson-marshalled
 *
 * @generated from message api.instrument.fee.Fee
 */
export type Fee = Message<"api.instrument.fee.Fee"> & {
    /**
     *
     * ID is a universally unique identifier set in the application layer.
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     *
     * InstrumentName refers to the instrument against which this Fee applied.
     *
     * @generated from field: string instrumentName = 2;
     */
    instrumentName: string;
    /**
     *
     * State is the fee status.
     *
     * @generated from field: api.instrument.fee.State state = 3;
     */
    state: State;
    /**
     *
     * Description is the description of this Fee.
     * It explains the purpose and context behind the charge.
     *
     * @generated from field: string description = 4;
     */
    description: string;
    /**
     *
     * AmountInclVAT is the total amount charged, inclusive of VAT.
     * This field captures the gross charge that the instrument issuer must pay.
     *
     * @generated from field: api.ledger.Amount amountInclVAT = 5;
     */
    amountInclVAT?: Amount;
    /**
     *
     * VATAmount is the portion of the AmountInclVAT that constitutes VAT.
     *
     * @generated from field: api.ledger.Amount vatAmount = 6;
     */
    vatAmount?: Amount;
    /**
     *
     * Category is the type of Fee being applied. It categorises fees based on
     * their purpose and the services they correspond to. Supported categories
     * include:
     * - Tokenisation: Fee for tokenizing assets.
     * - Listing: Fee for listing the instrument on a platform.
     * - PrimaryMarketSettlement: Fee related to primary market transaction
     * settlements.
     * - AUM: Assets Under Management fee.
     *
     * @generated from field: api.instrument.fee.Category category = 7;
     */
    category: Category;
    /**
     *
     * PaymentDate is the date on which the Fee was paid.
     *
     * @generated from field: google.protobuf.Timestamp paymentDate = 8;
     */
    paymentDate?: Timestamp;
    /**
     *
     * Data is the additional contextual information related to calculation,
     * taxation and billing of the Fee.
     *
     * @generated from field: api.instrument.fee.Data data = 9;
     */
    data?: Data;
};
/**
 * Describes the message api.instrument.fee.Fee.
 * Use `create(FeeSchema)` to create a new message.
 */
export declare const FeeSchema: GenMessage<Fee>;
/**
 *
 * State is the state of a Fee in its state diagram.
 *
 * @generated from enum api.instrument.fee.State
 */
export declare enum State {
    /**
     * 0 not used to prevent unexpected default value behaviour.
     *
     * @generated from enum value: UNDEFINED_STATE = 0;
     */
    UNDEFINED_STATE = 0,
    /**
     * @generated from enum value: UPCOMING_STATE = 1;
     */
    UPCOMING_STATE = 1,
    /**
     * @generated from enum value: DUE_STATE = 2;
     */
    DUE_STATE = 2,
    /**
     * @generated from enum value: PAYMENT_IN_PROGRESS_STATE = 3;
     */
    PAYMENT_IN_PROGRESS_STATE = 3,
    /**
     * @generated from enum value: FAILED_STATE = 4;
     */
    FAILED_STATE = 4,
    /**
     * @generated from enum value: CANCELLED_STATE = 5;
     */
    CANCELLED_STATE = 5,
    /**
     * @generated from enum value: PAID_STATE = 6;
     */
    PAID_STATE = 6
}
/**
 * Describes the enum api.instrument.fee.State.
 */
export declare const StateSchema: GenEnum<State>;
/**
 *
 * Category defines the different types of Fees that can be applied to an instrument.
 *
 * @generated from enum api.instrument.fee.Category
 */
export declare enum Category {
    /**
     * 0 not used to prevent unexpected default value behaviour.
     *
     * @generated from enum value: UNDEFINED_CATEGORY = 0;
     */
    UNDEFINED_CATEGORY = 0,
    /**
     * @generated from enum value: TOKENISATION_CATEGORY = 1;
     */
    TOKENISATION_CATEGORY = 1,
    /**
     * @generated from enum value: LISTING_CATEGORY = 2;
     */
    LISTING_CATEGORY = 2,
    /**
     * @generated from enum value: PRIMARY_MARKET_SETTLEMENT_CATEGORY = 3;
     */
    PRIMARY_MARKET_SETTLEMENT_CATEGORY = 3,
    /**
     * @generated from enum value: AUM_CATEGORY = 4;
     */
    AUM_CATEGORY = 4
}
/**
 * Describes the enum api.instrument.fee.Category.
 */
export declare const CategorySchema: GenEnum<Category>;
