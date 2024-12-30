from typing import List
from primes import generate_primes

def calculate(input_value, calculation_type) -> List[int]:
    match (calculation_type):
        case 'primes':
            if input_value == 'ascii':
                return list(generate_primes(full_unicode=False))
            elif input_value == 'unicode':
                return list(generate_primes(full_unicode=True))
            else:
                raise ValueError(
                    'Input value for primes option must be either "ascii" or "unicode"'
                    )
        case 'keys':
            pass
        case _:
            raise ValueError(f'Unsupported calculation type: {calculation_type}')
