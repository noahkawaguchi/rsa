from typing import List
from . import RSA_calculations as rsa
from .utils import generate_primes

def calculate(input_value: any, calculation_type: str) -> List[int]:
    """Perform the requested calculation on the given inputs.
    If impossible, raise an error.
    """
    match (calculation_type):
        case 'primes':
            if input_value == 'ascii':
                return list(generate_primes(full_unicode=False))
            elif input_value == 'unicode':
                return list(generate_primes(full_unicode=True))
            else:
                raise ValueError('Input value for primes option must '
                                 'be either "ascii" or "unicode"')
        case 'keys':
            try:
                n, e = rsa.find_public_key(p=input_value[0], q=input_value[1])
                d = rsa.find_private_key(e=e, p=input_value[0], q=input_value[1])
                return [n, e, d]
            except TypeError as e:
                raise TypeError('Input value for keys option must be '
                                'an array of two primes p and q')
        case _:
            raise ValueError(f'Unsupported calculation type: '
                             '{calculation_type}')
