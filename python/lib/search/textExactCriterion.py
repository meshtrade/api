
from .criterion_pb2 import Criterion
from .textExactCriterion_pb2 import TextExactCriterion

def new_text_exact_criterion(text: str, field: str) -> Criterion:
    """
    Create a new Criterion instance for an exact text match based on specified text and field parameters.

    This function initializes a `Criterion` object with a `TextExactCriterion`, 
    setting up an exact match criterion for text fields. The `Criterion` can then 
    be used for filtering or matching operations that require an exact text match 
    within a specified field.

    Args:
        text (str): The exact text value to match.
        field (str): The field name where the text match is applied.

    Returns:
        Criterion: A Criterion instance with the exact text match criterion specified.

    Example:
        criterion = new_text_exact_criterion("example text", "field_name")
    """
    return Criterion(
        textExactCriterion=TextExactCriterion(
            text=text,
            field=field,
        ),
    )