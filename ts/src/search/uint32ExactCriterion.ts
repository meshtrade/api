import { Criterion, CriterionSchema } from "./criterion_pb";
import { create } from "@bufbuild/protobuf";
import { Uint32ExactCriterionSchema } from "./uint32ExactCriterion_pb";

/**
 * Convenience function to construct a wrapped new Uint32ExactCriterion.
 *
 * @param {string} field - field of exact uint32 criterion
 * @param {number} value - value of exact uint32 criterion
 * @returns {Criterion} Uint32ExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": 33}
 * const uint32ExactCriterion = newUint32ExactCriterion("id", 33);
 */
export function newUint32ExactCriterion(
  field: string,
  value: number,
): Criterion {
  return create(
    CriterionSchema,
    {
      criterion: {
        case: "uint32ExactCriterion",
        value: create(Uint32ExactCriterionSchema, { field, uint32: value }),
      },
    },
  );
}
