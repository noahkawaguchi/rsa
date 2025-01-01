from typing import Tuple
from .utils import validate_pos_ints


def FME(b: int, n: int, m: int) -> int:
    """Quickly compute b^n mod m for b, n, and m in the domain of 
    positive integers.
    """
    validate_pos_ints(b=b, n=n, m=m)

    # Simultaneously get each binary bit for the exponent and accumulate
    # the values corresponding to those that are 1, performing mod m at
    # each step to keep the numbers manageable and the calculations
    # efficient.
    r = 1
    while n > 0:
        k = n % 2
        if k == 1:
            r = (r * b) % m
        b = (b * b) % m
        n = n // 2
    return r


def euclidean_alg(a: int, b: int) -> int:
    """Calculate the greatest common divisor of a and b."""
    validate_pos_ints(a=a, b=b)

    # Make sure we do not try to perform the calculation with b greater
    # than a.
    if b > a:
        a, b = b, a

    # As per Euclid's algorithm, GCD(a, b) = GCD(a mod b, b).
    while b > 0:
        k = a % b
        a = b
        b = k

    # When one of our mod operations results in a 0, the other number
    # (a) is the GCD.
    x = a
    return x


def EEA(a: int, b: int) -> Tuple[int, Tuple[int, int]]:
    """Compute the GCD and Bézout coefficients."""
    validate_pos_ints(a=a, b=b)

    # Save the original values of a and b, then switch them if necessary
    # to ensure that we do not calculate with b greater than a.
    a0, b0 = a, b
    if b0 > a0:
        a, b = b, a

    # Initialize the coefficients so that s1(a0) + t1(b0) = a and
    # s2(a0) + t2(b0) = b for our initial values of a and b.
    s1, t1 = 1, 0
    s2, t2 = 0, 1

    while b > 0:
        # Calculate the integer quotient q and the remainder k when
        # dividing a by b.
        k = a % b
        q = a // b

        # As per Euclid's algorithm, GCD(a, b) = GCD(a mod b, b).
        a = b
        b = k

        # Update the Bézout coefficients to maintain the loop invariants
        # a = s1(a0) + t1(b0) and b = s2(a0) + t2(b0) for our new values
        # of a and b.
        # Use temporary "hat" variables because we need to use the
        # previous values of s1, t1 when calculating the new values of
        # s2, t2 AND vice versa.
        s1hat, t1hat = s2, t2
        s2hat, t2hat = s1 - q * s2, t1 - q * t2

        # Assign the values of the temp variables to our non-temp
        # variables.
        s1, t1, s2, t2 = s1hat, t1hat, s2hat, t2hat

    # If we calculated with a and b flipped, flip the Bézout
    # coefficients so they will be returned in the correct order with
    # respect to the originally provided arguments.
    if b0 > a0:
        s1, t1 = t1, s1

    return a, (s1, t1)
