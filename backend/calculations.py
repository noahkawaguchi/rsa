from typing import List
from primes import generate_primes

def calculate(input_int: int, calculation_type: str) -> List[int]:
    match (calculation_type):
        case 'primes':
            if input_int == 0:
                return list(generate_primes(full_unicode=False))
            elif input_int == 1:
                return list(generate_primes(full_unicode=True))
            else:
                raise ValueError('Input value for primes option must be 0 (ASCII) or 1 (Unicode)')
        case _:
            raise ValueError(f'Unsupported calculation type: {calculation_type}')
