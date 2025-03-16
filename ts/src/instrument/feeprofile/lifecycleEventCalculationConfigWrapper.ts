import { LifecycleEventCalculationConfig } from "./lifecycleEventCalculationConfig_pb";
import { LifecycleEventCalculationConfigType } from "./lifecycleEventCalculationConfigType_pb";

/**
 * Wrapper class for LifecycleEventCalculationConfig.
 */
export class LifecycleEventCalculationConfigWrapper {
  private _lifecycleEventCalculationConfig: LifecycleEventCalculationConfig;

  /**
   * Constructs a new LifecycleEventCalculationConfigWrapper instance.
   * @param {LifecycleEventCalculationConfig} lifecycleEventCalculationConfig - The schedule configuration  instance to wrap.
   */
  constructor(
    lifecycleEventCalculationConfig?: LifecycleEventCalculationConfig,
  ) {
    this._lifecycleEventCalculationConfig =
      lifecycleEventCalculationConfig ?? new LifecycleEventCalculationConfig();
  }

  /**
   * Gets the type of the wrapped schedule configuration .
   * @returns {LifecycleEventCalculationConfigType} The type of the wrapped schedule configuration .
   */
  get lifecycleEventCalculationConfigType(): LifecycleEventCalculationConfigType {
    switch (true) {
      case this._lifecycleEventCalculationConfig.hasAmountlifecycleeventcalculationconfig():
        return LifecycleEventCalculationConfigType.AMOUNT_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE;
      case this._lifecycleEventCalculationConfig.hasRatelifecycleeventcalculationconfig():
        return LifecycleEventCalculationConfigType.RATE_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE;
      default:
        return LifecycleEventCalculationConfigType.UNDEFINED_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE;
    }
  }

  /**
   * Gets the wrapped schedule configuration  instance.
   * @returns {LifecycleEventCalculationConfig} The wrapped schedule configuration .
   */
  get lifecycleEventCalculationConfig(): LifecycleEventCalculationConfig {
    return this._lifecycleEventCalculationConfig;
  }
}
