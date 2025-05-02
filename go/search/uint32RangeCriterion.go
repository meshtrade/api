package search

// NewUint32RangeCriterion is a convenience function to construct a wrapped new Uint32RangeCriterion.
func NewUint32RangeCriterion(
	field string,
	start *Uint32RangeValue,
	end *Uint32RangeValue,
) *Criterion {
	return &Criterion{
		Criterion: &Criterion_Uint32RangeCriterion{
			Uint32RangeCriterion: &Uint32RangeCriterion{
				Field: field,
				Start: start,
				End:   end,
			},
		},
	}
}
