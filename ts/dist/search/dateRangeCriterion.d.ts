import { Criterion } from "./criterion_pb";
import { RangeValue } from "./dateRangeCriterion_pb";
export declare function newDateRangeCriterion(
  field: string,
  start?: RangeValue,
  end?: RangeValue,
): Criterion;
