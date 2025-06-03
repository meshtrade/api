import { Criterion, CriterionSchema, ORCriterionSchema } from "./criterion_pb";
import { create } from "@bufbuild/protobuf";

/**
 * Convenience function to construct a wrapped new ORCriterion.
 *
 * @param {Criterion[]} criteria - list of criteria.
 * @returns {Criterion} ORCriterion wrapped in Criterion
 */
export function newORCriterion(criteria: Criterion[]): Criterion {
  if (!criteria.length) {
    throw new Error("at least 1 criterion required to construct OR, got none");
  }

  return create(
    CriterionSchema,
    {
      criterion: {
        case: "orCriterion",
        value: create(ORCriterionSchema, { criteria }),
      },
    },
  );
}
