package search

// NewDateRangeCriterionCriterion is a convenience function to construct a wrapped new DateRangeCriterionCriterion.
func NewDateRangeCriterionCriterion(
	field string,
	start *RangeValue,
	end *RangeValue,
) *Criterion {
	return &Criterion{
		Criterion: &Criterion_DateRangeCriterion{
			DateRangeCriterion: &DateRangeCriterion{
				Field: field,
				Start: start,
				End:   end,
			},
		},
	}
}
