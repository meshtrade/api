package client

func (d ClientType) IsValid() bool {
	_, found := ClientType_name[int32(d)]
	return found
}

func (d ClientType) IsValidAndDefined() bool {
	return d.IsValid() && d != ClientType_UNDEFINED_COMPANY_CLIENT_TYPE
}
