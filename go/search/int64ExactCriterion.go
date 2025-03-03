package search

// NewInt64ExactCriterion is a convenience function to construct a wrapped new Int64ExactCriterion.
func NewInt64ExactCriterion(
	field string,
	value int64,
) *Criterion {
	return &Criterion{
		Criterion: &Criterion_Int64ExactCriterion{
			Int64ExactCriterion: &Int64ExactCriterion{
				Field: field,
				Int64: value,
			},
		},
	}
}
