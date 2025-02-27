package search

// NewTextNEExactCriterion is a convenience function to construct a wrapped new TextNEExactCriterion.
func NewTextNEExactCriterion(
	field string,
	text string,
) *Criterion {
	return &Criterion{
		Criterion: &Criterion_TextNEExactCriterion{
			TextNEExactCriterion: &TextNEExactCriterion{
				Field: field,
				Text:  text,
			},
		},
	}
}
