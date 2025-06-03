import { Criterion, CriterionSchema } from "./criterion_pb";
import { create } from "@bufbuild/protobuf";
import { Uint32NEExactCriterionSchema } from "./uint32NEExactCriterion_pb";

/**
 * Convenience function to construct a wrapped new Uint32NEExactCriterion.
 *
 * @param {string} field - field of exact uint32 criterion
 * @param {number} value - value of exactly not uint32 criterion
 * @returns {Criterion} Uint32NEExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$ne":33}}
 * const uint32NEExactCriterion = newUint32NEExactCriterion("id", 33);
 */
export function newUint32NEExactCriterion(
  field: string,
  value: number,
): Criterion {
  return create(
    CriterionSchema,
    {
      criterion: {
        case: "uint32NEExactCriterion",
        value: create(Uint32NEExactCriterionSchema, { field, uint32: value }),
      },
    },
  );
}
