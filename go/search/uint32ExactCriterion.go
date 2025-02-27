package search

// NewUint32ExactCriterion is a convenience function to construct a wrapped new Uint32ExactCriterion.
func NewUint32ExactCriterion(
	field string,
	value uint32,
) *Criterion {
	return &Criterion{
		Criterion: &Criterion_Uint32ExactCriterion{
			Uint32ExactCriterion: &Uint32ExactCriterion{
				Field:  field,
				Uint32: value,
			},
		},
	}
}
