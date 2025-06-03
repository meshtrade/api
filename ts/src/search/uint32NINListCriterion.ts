import { Criterion, CriterionSchema } from "./criterion_pb";
import { create } from "@bufbuild/protobuf";
import { Uint32NINListCriterionSchema } from "./uint32NINListCriterion_pb";

/**
 * Convenience function to construct a wrapped new Uint32NINListCriterion.
 *
 * @param {string} field - field of list uint32 criterion
 * @param {number[]} list - value of NOT in list uint32 criterion
 * @returns {Criterion} Uint32NINListCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$nin":[1, 2]}}
 * const uint32NINListCriterion = newUint32NINListCriterion("id", [1, 2]);
 */
export function newUint32NINListCriterion(
  field: string,
  list: number[],
): Criterion {
  return create(
    CriterionSchema,
    {
      criterion: {
        case: "uint32NINListCriterion",
        value: create(Uint32NINListCriterionSchema, { field, list }),
      },
    },
  );
}
