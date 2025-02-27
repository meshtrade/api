package search

func NewTextSubstring(field string, text string) *Criterion {
	return &Criterion{
		Criterion: &Criterion_TextSubstringCriterion{
			TextSubstringCriterion: &TextSubstringCriterion{
				Field: field,
				Value: text,
			},
		},
	}
}
