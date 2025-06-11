import { LifecycleEventCalculationConfig } from "./lifecycleEventCalculationConfig_pb";
import { LifecycleEventCalculationConfigType } from "./lifecycleEventCalculationConfigType_pb";
/**
 * Wrapper class for LifecycleEventCalculationConfig.
 */
export declare class LifecycleEventCalculationConfigWrapper {
    private _lifecycleEventCalculationConfig;
    /**
     * Constructs a new LifecycleEventCalculationConfigWrapper instance.
     * @param {LifecycleEventCalculationConfig} lifecycleEventCalculationConfig - The calculation configuration  instance to wrap.
     */
    constructor(lifecycleEventCalculationConfig?: LifecycleEventCalculationConfig);
    /**
     * Gets the type of the wrapped calculation configuration .
     * @returns {LifecycleEventCalculationConfigType} The type of the wrapped calculation configuration .
     */
    get lifecycleEventCalculationConfigType(): LifecycleEventCalculationConfigType;
    /**
     * Gets the wrapped calculation configuration  instance.
     * @returns {LifecycleEventCalculationConfig} The wrapped calculation configuration .
     */
    get lifecycleEventCalculationConfig(): LifecycleEventCalculationConfig;
}
