package type_v1

// IsValid checks whether the Ledger value is a valid enum value defined in the protobuf schema.
// This method verifies that the ledger value exists in the generated Ledger_name map,
// which contains all valid ledger enum values from the protobuf definition.
//
// Returns:
//   - true if the ledger is a valid enum value (including LEDGER_UNSPECIFIED)
//   - false if the ledger value is not defined in the protobuf schema
//
// Note:
//   - This method returns true for LEDGER_UNSPECIFIED (the zero value)
//   - Use IsValidAndDefined() if you need to exclude LEDGER_UNSPECIFIED
//
// Example:
//
//	ledger := Ledger_LEDGER_STELLAR
//	if ledger.IsValid() {
//	    // Ledger is a valid enum value
//	}
//
//	invalidLedger := Ledger(999)
//	if !invalidLedger.IsValid() {
//	    // Handle invalid ledger value
//	}
func (n Ledger) IsValid() bool {
	_, ok := Ledger_name[int32(n)]
	return ok
}

// IsValidAndDefined checks whether the Ledger value is both valid and not LEDGER_UNSPECIFIED.
// This is useful when you need to ensure a ledger has been explicitly set to a specific network,
// rather than being left at the default zero value.
//
// Returns:
//   - true if the ledger is valid AND not LEDGER_UNSPECIFIED
//   - false if the ledger is invalid OR is LEDGER_UNSPECIFIED
//
// Note:
//   - This is equivalent to: n.IsValid() && n != Ledger_LEDGER_UNSPECIFIED
//   - Use this when LEDGER_UNSPECIFIED should be treated as invalid/undefined
//
// Example:
//
//	ledger := Ledger_LEDGER_STELLAR
//	if ledger.IsValidAndDefined() {
//	    // Ledger is set to a specific network (not unspecified)
//	}
//
//	unspecified := Ledger_LEDGER_UNSPECIFIED
//	if !unspecified.IsValidAndDefined() {
//	    // Ledger is unspecified, require user to select a network
//	}
func (n Ledger) IsValidAndDefined() bool {
	return n.IsValid() && n != Ledger_LEDGER_UNSPECIFIED
}

// ToPrettyString converts the Ledger enum value to a human-readable network name.
// This method provides user-friendly names for each blockchain network/ledger type.
//
// Returns:
//   - A human-readable network name string
//   - "Unknown" for invalid or unrecognized ledger values
//
// Supported Networks:
//   - LEDGER_STELLAR → "Stellar"
//   - LEDGER_ETHEREUM → "Ethereum"
//   - LEDGER_BITCOIN → "Bitcoin"
//   - LEDGER_LITECOIN → "Litecoin"
//   - LEDGER_XRP → "XRP"
//   - LEDGER_SA_STOCK_BROKERS → "SA Stock Brokers"
//   - LEDGER_NULL → "Null"
//   - LEDGER_UNSPECIFIED → "Unspecified"
//
// Note:
//   - This method does not validate the ledger value
//   - Invalid ledger values return "Unknown"
//   - Use this for display purposes, logging, and user interfaces
//
// Example:
//
//	ledger := Ledger_LEDGER_STELLAR
//	fmt.Println(ledger.ToPrettyString())  // Output: "Stellar"
//
//	unspecified := Ledger_LEDGER_UNSPECIFIED
//	fmt.Println(unspecified.ToPrettyString())  // Output: "Unspecified"
//
//	invalid := Ledger(999)
//	fmt.Println(invalid.ToPrettyString())  // Output: "Unknown"
func (n Ledger) ToPrettyString() string {
	switch n {
	case Ledger_LEDGER_STELLAR:
		return "Stellar"
	case Ledger_LEDGER_ETHEREUM:
		return "Ethereum"
	case Ledger_LEDGER_BITCOIN:
		return "Bitcoin"
	case Ledger_LEDGER_LITECOIN:
		return "Litecoin"
	case Ledger_LEDGER_XRP:
		return "XRP"
	case Ledger_LEDGER_SA_STOCK_BROKERS:
		return "SA Stock Brokers"
	case Ledger_LEDGER_NULL:
		return "Null"
	case Ledger_LEDGER_UNSPECIFIED:
		return "Unspecified"
	default:
		return "Unknown"
	}
}
