from typing import Tuple, List
from .RSA_helpers import FME, euclidean_alg, EEA
from .utils import convert_num, convert_text


def find_public_key(p: int, q: int) -> Tuple[int, int]:
    """Generate public key (n, e) from primes p and q."""
    n = p * q
    pm1qm1 = (p - 1) * (q - 1)

    # Iterate through all potential e values until we find one that is
    # relatively prime to (p-1)(q-1) and not equal to p or q.
    for i in range(2, pm1qm1):
        if i != p and i != q and euclidean_alg(pm1qm1, i) == 1:
            e = i
            break
    return n, e


def find_private_key(e: int, p: int, q: int) -> int:
    """Generate private key d from public key e and primes p and q."""
    pm1qm1 = (p - 1) * (q - 1)

    # It follows from Bézout's Theorem that if sa + tb = 1, then s is an
    # inverse of a (mod b).
    gcd, (s, t) = EEA(e, pm1qm1)
    d = s

    # Ensure d is positive because we will be using it as an exponent in
    # FME. (We can add or subtract the modulus any number of times and
    # still maintain congruency).
    while d <= 0:
        d += pm1qm1
    return d


def encode(n: int, e: int, message: str) -> List[int]:
    """Encode a message into numeric cipher text."""
    # Due to Fermat's Little Theorem and the Chinese Remainder Theorem,
    # we get the cipher from the message using C = M^e mod n.
    return [FME(M, e, n) for M in convert_text(message)]


def decode(n: int, d: int, cipher_text: List[int]) -> str:
    """Decode each number in the cipher_text and combine the result 
    into the message.
    """
    # Due to Fermat's Little Theorem and the Chinese Remainder Theorem,
    # we get the message from the cipher using M = C^d mod n.
    return convert_num([FME(C, d, n) for C in cipher_text])
