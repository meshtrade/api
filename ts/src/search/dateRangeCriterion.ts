import { Criterion } from "./criterion_pb";
import { DateRangeCriterion, RangeValue } from "./dateRangeCriterion_pb";

export function newDateRangeCriterion(
  field: string,
  start?: RangeValue,
  end?: RangeValue,
): Criterion {
  return new Criterion().setDaterangecriterion(
    new DateRangeCriterion().setField(field).setStart(start).setEnd(end),
  );
}
