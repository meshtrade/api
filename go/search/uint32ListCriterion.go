package search

// NewUint32ListCriterion is a convenience function to construct a wrapped new Uint32ListCriterion.
func NewUint32ListCriterion(
	field string,
	list []uint32,
) *Criterion {
	return &Criterion{
		Criterion: &Criterion_Uint32ListCriterion{
			Uint32ListCriterion: &Uint32ListCriterion{
				Field: field,
				List:  list,
			},
		},
	}
}
