package search

// NewTextExactCriterion is a convenience function to construct a wrapped new TextExactCriterion.
func NewTextExactCriterion(
	field string,
	text string,
) *Criterion {
	return &Criterion{
		Criterion: &Criterion_TextExactCriterion{
			TextExactCriterion: &TextExactCriterion{
				Field: field,
				Text:  text,
			},
		},
	}
}
