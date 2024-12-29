from typing import List

def calculate(input_int: int, calculation_type: str) -> List[int]:

    if calculation_type == 'double':
        result = input_int * 2
        return [result, result, result]
    else:
        raise ValueError(f'Unsupported calculation type: {calculation_type}')
