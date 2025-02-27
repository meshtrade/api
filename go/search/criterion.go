package search

func Or(criteria ...*Criterion) *Criterion {
	if len(criteria) == 0 {
		panic("no criteria passed to or")
	}

	return &Criterion{
		Criterion: &Criterion_OrCriterion{
			OrCriterion: &ORCriterion{
				Criteria: criteria,
			},
		},
	}
}
