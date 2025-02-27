package search

// NewTextListCriterion is a convenience function to construct a wrapped new TextListCriterion.
func NewTextListCriterion(
	field string,
	list []string,
) *Criterion {
	return &Criterion{
		Criterion: &Criterion_TextListCriterion{
			TextListCriterion: &TextListCriterion{
				Field: field,
				List:  list,
			},
		},
	}
}
