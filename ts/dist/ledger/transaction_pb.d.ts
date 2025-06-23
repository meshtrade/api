/* eslint-disable */
// @ts-nocheck
// package: api.ledger
// file: api/proto/ledger/transaction.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export enum TransactionState {
    UNDEFINED_TRANSACTION_STATE = 0,
    DRAFT_TRANSACTION_STATE = 1,
    SIGNING_IN_PROGRESS_TRANSACTION_STATE = 2,
    PENDING_TRANSACTION_STATE = 3,
    SUBMISSION_IN_PROGRESS_TRANSACTION_STATE = 4,
    FAILED_TRANSACTION_STATE = 5,
    INDETERMINATE_TRANSACTION_STATE = 6,
    SUCCESSFUL_TRANSACTION_STATE = 7,
}

export enum TransactionAction {
    UNDEFINED_TRANSACTION_ACTION = 0,
    DO_NOTHING_TRANSACTION_ACTION = 1,
    BUILD_TRANSACTION_ACTION = 2,
    COMMIT_TRANSACTION_ACTION = 3,
    SIGN_TRANSACTION_ACTION = 4,
    MARK_PENDING_TRANSACTION_ACTION = 5,
    SUBMIT_TRANSACTION_ACTION = 6,
}
