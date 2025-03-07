package ledger

func (n Network) IsValid() bool {
	_, ok := Network_name[int32(n)]
	return ok
}

func (n Network) IsValidAndDefined() bool {
	return n.IsValid() && n != Network_UNDEFINED_NETWORK
}
