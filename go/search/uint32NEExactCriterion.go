package search

// NewUint32NEExactCriterion is a convenience function to construct a wrapped new Uint32NEExactCriterion.
func NewUint32NEExactCriterion(
	field string,
	u uint32,
) *Criterion {
	return &Criterion{
		Criterion: &Criterion_Uint32NEExactCriterion{
			Uint32NEExactCriterion: &Uint32NEExactCriterion{
				Field:  field,
				Uint32: u,
			},
		},
	}
}
