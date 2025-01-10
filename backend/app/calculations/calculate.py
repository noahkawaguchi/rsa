from typing import Any, Mapping
from app.calculations import RSA_calculations as rsa
from app.calculations.utils import (generate_primes, constrained_int_required_field,
                                    constrained_int_list_required_field)


def validated_primes_calculation(data: dict[str, Any]) -> Mapping[str, int]:
    """Generate primes p and q or raise an exception if the request 
    data is invalid.
    """
    match data.get('choice'):
        case None:
            raise KeyError('choice is required for primes calculation')
        case 'ascii':
            p, q = generate_primes(full_unicode=False)
            return {'p': p, 'q': q}
        case 'unicode':
            p, q = generate_primes(full_unicode=True)
            return {'p': p, 'q': q}
        case _:
            raise ValueError('choice field for primes calculation '
                             'must be either "ascii" or "unicode"')


def validated_keys_calculation(data: dict[str, Any]) -> Mapping[str, int]:
    """Generate keys n, e, and d or raise an exception if the request 
    data is invalid.
    """
    p = constrained_int_required_field(data.get('p'), 'p', 'keys')
    q = constrained_int_required_field(data.get('q'), 'q', 'keys')
    n, e = rsa.find_public_key(p, q)
    d = rsa.find_private_key(e, p, q)
    return {'n': n, 'e': e, 'd': d}


def validated_encode_calculation(data: dict[str, Any]
                                 ) -> Mapping[str, list[int]]:
    """Generate encoded ciphertext or raise an exception if the request 
    data is invalid.
    """
    n = constrained_int_required_field(data.get('n'), 'n', 'encode')
    e = constrained_int_required_field(data.get('e'), 'e', 'encode')
    plaintext = data.get('plaintext')
    if plaintext is None:
        raise KeyError('plaintext is required for encode calculations')
    if not isinstance(plaintext, str):
        raise TypeError('plaintext must be a string')
    else:
        ciphertext = rsa.encode(n, e, plaintext)
        return {'ciphertext': ciphertext}


def validated_decode_calculation(data: dict[str, Any]) -> Mapping[str, str]:
    """Generate decoded plaintext or raise an exception if the request 
    data is invalid.
    """
    n = constrained_int_required_field(data.get('n'), 'n', 'decode')
    d = constrained_int_required_field(data.get('d'), 'd', 'decode')
    ciphertext = constrained_int_list_required_field(data.get('ciphertext'),
                                                     'ciphertext', 'decode')
    plaintext = rsa.decode(n, d, ciphertext)
    return {'plaintext': plaintext}


def calculate(data: dict[str, Any],
              calc_type: str) -> Mapping[str, str | int | list[int]]:
    """Perform the requested calculation on the given input(s).
    If impossible, raise an appropriate exception.
    """
    match calc_type:
        case 'primes':
            return validated_primes_calculation(data)
        case 'keys':
            return validated_keys_calculation(data)
        case 'encode':
            return validated_encode_calculation(data)
        case 'decode':
            return validated_decode_calculation(data)
        case _:
            raise ValueError(f'Unsupported calculation type: {calc_type}')
