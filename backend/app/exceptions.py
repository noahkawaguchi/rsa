class MissingFieldError(Exception):
    """Raised when a field required for the calculation type is missing."""

    def __init__(self, missing_field: str, calc_type: str):
        self.message = (f'{missing_field} is required 
                        for {calc_type} calculations')
        super().__init__(self.message)
