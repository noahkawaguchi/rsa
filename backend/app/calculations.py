from typing import List

def calculate(input_int: int, calculation_type: str) -> List[int]:
    match (calculation_type):
        case 'double':
            result = input_int * 2
            return [result, result, result]
        case 'primes':
            if input_int == 0:
                return [3, 5]
            elif input_int == 1:
                return [7, 11]
            else:
                raise ValueError('Input value for primes option must be 0 (ASCII) or 1 (Unicode)')
        case _:
            raise ValueError(f'Unsupported calculation type: {calculation_type}')
