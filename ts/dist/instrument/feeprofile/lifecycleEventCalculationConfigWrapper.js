/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleEventCalculationConfigWrapper = void 0;
const lifecycleEventCalculationConfig_pb_1 = require("./lifecycleEventCalculationConfig_pb");
const lifecycleEventCalculationConfigType_pb_1 = require("./lifecycleEventCalculationConfigType_pb");
const protobuf_1 = require("@bufbuild/protobuf");
/**
 * Wrapper class for LifecycleEventCalculationConfig.
 */
class LifecycleEventCalculationConfigWrapper {
    /**
     * Constructs a new LifecycleEventCalculationConfigWrapper instance.
     * @param {LifecycleEventCalculationConfig} lifecycleEventCalculationConfig - The calculation configuration  instance to wrap.
     */
    constructor(lifecycleEventCalculationConfig) {
        this._lifecycleEventCalculationConfig =
            lifecycleEventCalculationConfig !== null && lifecycleEventCalculationConfig !== void 0 ? lifecycleEventCalculationConfig : (0, protobuf_1.create)(lifecycleEventCalculationConfig_pb_1.LifecycleEventCalculationConfigSchema);
    }
    /**
     * Gets the type of the wrapped calculation configuration .
     * @returns {LifecycleEventCalculationConfigType} The type of the wrapped calculation configuration .
     */
    get lifecycleEventCalculationConfigType() {
        switch (true) {
            case this._lifecycleEventCalculationConfig.LifecycleEventCalculationConfig.case === "amountLifecycleEventCalculationConfig":
                return lifecycleEventCalculationConfigType_pb_1.LifecycleEventCalculationConfigType.AMOUNT_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE;
            case this._lifecycleEventCalculationConfig.LifecycleEventCalculationConfig.case === "rateLifecycleEventCalculationConfig":
                return lifecycleEventCalculationConfigType_pb_1.LifecycleEventCalculationConfigType.RATE_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE;
            default:
                return lifecycleEventCalculationConfigType_pb_1.LifecycleEventCalculationConfigType.UNDEFINED_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE;
        }
    }
    /**
     * Gets the wrapped calculation configuration  instance.
     * @returns {LifecycleEventCalculationConfig} The wrapped calculation configuration .
     */
    get lifecycleEventCalculationConfig() {
        return this._lifecycleEventCalculationConfig;
    }
}
exports.LifecycleEventCalculationConfigWrapper = LifecycleEventCalculationConfigWrapper;
