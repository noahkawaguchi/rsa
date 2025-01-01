from app.calculations import RSA_calculations as rsa
from app.calculations.utils import generate_primes, validate_pos_ints
from app.exceptions import MissingFieldError


def calculate(data: dict, calc_type: str) -> dict:
    """Perform the requested calculation on the given input(s).
    If impossible, raise an appropriate exception.
    """
    match calc_type:
        case 'primes':
            match data.get('choice'):
                case None:
                    raise MissingFieldError('choice', 'primes')
                case 'ascii':
                    p, q = generate_primes(full_unicode=False)
                    return {'p': p, 'q': q}
                case 'unicode':
                    p, q = generate_primes(full_unicode=True)
                    return {'p': p, 'q': q}
                case _:
                    raise ValueError('choice field for primes calculation '
                                     'must be either "ascii" or "unicode"')

        case 'keys':
            p = data.get('p')
            q = data.get('q')
            if p is None:
                raise MissingFieldError('p', 'keys')
            if q is None:
                raise MissingFieldError('q', 'keys')
            validate_pos_ints(p=p, q=q)
            n, e = rsa.find_public_key(p, q)
            d = rsa.find_private_key(e, p, q)
            return {'n': n, 'e': e, 'd': d}

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
            raise ValueError(f'Unsupported calculation type: {calc_type}')
