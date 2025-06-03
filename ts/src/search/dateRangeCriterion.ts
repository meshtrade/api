import { Criterion, CriterionSchema } from "./criterion_pb";
import { RangeValue, DateRangeCriterionSchema } from "./dateRangeCriterion_pb";
import { create } from "@bufbuild/protobuf";

export function newDateRangeCriterion(
  field: string,
  start?: RangeValue,
  end?: RangeValue,
): Criterion {
  return create(
    CriterionSchema,
    {
      criterion: {
        case: "dateRangeCriterion",
        value: create(DateRangeCriterionSchema, { field, start, end }),
      },
    },
  );
}
