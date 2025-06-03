import { LifecycleEventCalculationConfig, LifecycleEventCalculationConfigSchema } from "./lifecycleEventCalculationConfig_pb";
import { LifecycleEventCalculationConfigType } from "./lifecycleEventCalculationConfigType_pb";
import { create } from "@bufbuild/protobuf";

/**
 * Wrapper class for LifecycleEventCalculationConfig.
 */
export class LifecycleEventCalculationConfigWrapper {
  private _lifecycleEventCalculationConfig: LifecycleEventCalculationConfig;

  /**
   * Constructs a new LifecycleEventCalculationConfigWrapper instance.
   * @param {LifecycleEventCalculationConfig} lifecycleEventCalculationConfig - The calculation configuration  instance to wrap.
   */
  constructor(
    lifecycleEventCalculationConfig?: LifecycleEventCalculationConfig,
  ) {
    this._lifecycleEventCalculationConfig =
      lifecycleEventCalculationConfig ?? create(LifecycleEventCalculationConfigSchema);
  }

  /**
   * Gets the type of the wrapped calculation configuration .
   * @returns {LifecycleEventCalculationConfigType} The type of the wrapped calculation configuration .
   */
  get lifecycleEventCalculationConfigType(): LifecycleEventCalculationConfigType {
    switch (true) {
      case this._lifecycleEventCalculationConfig.LifecycleEventCalculationConfig.case === "amountLifecycleEventCalculationConfig":
        return LifecycleEventCalculationConfigType.AMOUNT_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE;
      case this._lifecycleEventCalculationConfig.LifecycleEventCalculationConfig.case === "rateLifecycleEventCalculationConfig":
        return LifecycleEventCalculationConfigType.RATE_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE;
      default:
        return LifecycleEventCalculationConfigType.UNDEFINED_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE;
    }
  }

  /**
   * Gets the wrapped calculation configuration  instance.
   * @returns {LifecycleEventCalculationConfig} The wrapped calculation configuration .
   */
  get lifecycleEventCalculationConfig(): LifecycleEventCalculationConfig {
    return this._lifecycleEventCalculationConfig;
  }
}
