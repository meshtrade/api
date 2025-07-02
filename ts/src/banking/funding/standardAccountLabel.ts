import { StandardPeachAccountLabel } from "./standardAccountLabels_pb";

/**
 * Returns a human-readable string representation for a StandardPeachAccountLabel.
 * @param label The enum member to convert to a string.
 * @returns A string representation of the label.
 */
export function getStandardPeachAccountLabelString(
  label: StandardPeachAccountLabel,
): string {
  switch (label) {
    case StandardPeachAccountLabel.PEACH_FEE_ACCOUNT_STANDARD_LABEL:
      return "Peach Fee";
    case StandardPeachAccountLabel.PEACH_SETTLEMENT_ACCOUNT_STANDARD_LABEL:
      return "Peach Settlement";
    case StandardPeachAccountLabel.PEACH_FLOAT_ACCOUNT_STANDARD_LABEL:
      return "Peach Float";
    default:
      // This default case helps ensure that all enum values are handled.
      // If a new label is added to the enum without being added here,
      // this will cause a compile-time error.
      return `Unknown Label`;
  }
}
