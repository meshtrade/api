import { Criterion, CriterionSchema } from "./criterion_pb";
import { create } from "@bufbuild/protobuf";
import { Uint32ListCriterionSchema } from "./uint32ListCriterion_pb";

/**
 * Convenience function to construct a wrapped new Uint32ListCriterion.
 *
 * @param {string} field - field of list uint32 criterion
 * @param {number[]} list - value of list uint32 criterion
 * @returns {Criterion} Uint32ListCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$in":[1, 2]}}
 * const uint32ListCriterion = newUint32ListCriterion("id", [1, 2]);
 */
export function newUint32ListCriterion(
  field: string,
  list: number[],
): Criterion {
  return create(
    CriterionSchema,
    {
      criterion: {
        case: "uint32ListCriterion",
        value: create(Uint32ListCriterionSchema, { field, list }),
      },
    },
  );
}
