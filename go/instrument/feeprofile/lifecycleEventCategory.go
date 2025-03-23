package feeprofile

func (l LifecycleEventCategory) IsValid() bool {
	_, found := LifecycleEventCategory_name[int32(l)]
	return found
}

func (l LifecycleEventCategory) IsValidAndSet() bool {
	return l.IsValid() && l != LifecycleEventCategory_UNDEFINED_LIFECYCLE_EVENT_CATEGORY
}
