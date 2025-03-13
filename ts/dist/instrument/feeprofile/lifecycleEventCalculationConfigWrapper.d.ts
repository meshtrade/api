/* eslint-disable */
// @ts-nocheck
import { LifecycleEventCalculationConfig } from "./lifecycleEventCalculationConfig_pb";
import { LifecycleEventCalculationConfigType } from "./lifecycleEventCalculationConfigType_pb";
/**
 * Wrapper class for LifecycleEventCalculationConfig.
 */
export declare class LifecycleEventCalculationConfigWrapper {
    private _lifecycleEventCalculationConfig;
    /**
     * Constructs a new LifecycleEventCalculationConfigWrapper instance.
     * @param {LifecycleEventCalculationConfig} lifecycleEventCalculationConfig - The schedule configuration  instance to wrap.
     */
    constructor(lifecycleEventCalculationConfig?: LifecycleEventCalculationConfig);
    /**
     * Gets the type of the wrapped schedule configuration .
     * @returns {LifecycleEventCalculationConfigType} The type of the wrapped schedule configuration .
     */
    get lifecycleEventCalculationConfigType(): LifecycleEventCalculationConfigType;
    /**
     * Gets the wrapped schedule configuration  instance.
     * @returns {LifecycleEventCalculationConfig} The wrapped schedule configuration .
     */
    get lifecycleEventCalculationConfig(): LifecycleEventCalculationConfig;
}
