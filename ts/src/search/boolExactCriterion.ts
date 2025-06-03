import { Criterion, CriterionSchema } from "./criterion_pb";
import { create } from "@bufbuild/protobuf";
import { BoolExactCriterionSchema } from "./boolExactCriterion_pb";

/**
 * Convenience function to construct a wrapped new BoolExactCriterion.
 *
 * @param {string} field - field of exact bool criterion
 * @param {boolean} value - value of exact bool criterion
 * @returns {Criterion} BoolExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"set": false}
 * const boolExactCriterion = newBoolExactCriterion("set", false);
 */
export function newBoolExactCriterion(
  field: string,
  value: boolean,
): Criterion {
  return create(
    CriterionSchema,
    {
      criterion: {
        case: "boolExactCriterion",
        value: create(BoolExactCriterionSchema, { field, bool: value }),
      },
    },
  );
}
