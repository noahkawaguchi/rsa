from . import RSA_calculations as rsa
from .utils import generate_primes


def calculate(data: dict) -> dict:
    """Perform the requested calculation on the given input(s).
    If impossible, raise an appropriate exception.
    """
    match data['type']:
        case 'primes':
            choice = data.get('choice')
            if choice == 'ascii':
                p, q = generate_primes(full_unicode=False)
                return {'p': p, 'q': q}
            elif choice == 'unicode':
                p, q = generate_primes(full_unicode=True)
                return {'p': p, 'q': q}
            else:
                raise ValueError('Input for primes calculation must have key '
                                 '"choice" with value "ascii" or "unicode"')
        case 'keys':
            
            try:
                n, e = rsa.find_public_key(p=data['p'], q=data['q'])
                d = rsa.find_private_key(e=e, p=data['p'], q=data['q'])
                return {'n': n, 'e': e, 'd': d}
            except (TypeError, KeyError) as e:
                raise ValueError('Input for keys calculation must be an '
                                 'object/dict of two primes with keys p and q')
        case 'encode':
            ciphertext = rsa.encode(n=data['n'], e=data['e'],
                                    message=data['plaintext'])
            return {'ciphertext': ciphertext}
        case 'decode':
            try:
                plaintext = rsa.decode(n=data['n'], d=data['d'],
                                       cipher_text=data['ciphertext'])
                return {'plaintext': plaintext}
            except (TypeError, ValueError) as e:
                raise ValueError('n, d, and all elements of the ciphertext '
                                 'list must be positive integers')
        case _:
            raise ValueError(f'Unsupported calculation type: '
                             '{calculation_type}')
