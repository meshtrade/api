package search

// NewBoolExactCriterion is a convenience function to construct a wrapped new BoolExactCriterion.
func NewBoolExactCriterion(
	field string,
	value bool,
) *Criterion {
	return &Criterion{
		Criterion: &Criterion_BoolExactCriterion{
			BoolExactCriterion: &BoolExactCriterion{
				Field: field,
				Bool:  value,
			},
		},
	}
}
