package search

// NewTextNINListCriterion is a convenience function to construct a wrapped new TextNINListCriterion
func NewTextNINListCriterion(
	field string,
	list []string,
) *Criterion {
	return &Criterion{
		Criterion: &Criterion_TextNINListCriterion{
			TextNINListCriterion: &TextNINListCriterion{
				Field: field,
				List:  list,
			},
		},
	}
}
