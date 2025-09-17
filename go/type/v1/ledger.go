package type_v1

func (n Ledger) IsValid() bool {
	_, ok := Ledger_name[int32(n)]
	return ok
}

func (n Ledger) IsValidAndDefined() bool {
	return n.IsValid() && n != Ledger_LEDGER_UNSPECIFIED
}
