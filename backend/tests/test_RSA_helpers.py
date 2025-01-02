from app.calculations.RSA_helpers import FME, euclidean_alg, EEA


def test_FME():
    assert FME(529, 8, 157) == 529 ** 8 % 157
    assert FME(3688, 195, 82) == pow(3688, 195, 82)


def test_euclidean_alg():
    assert euclidean_alg(25, 135) == 5
    assert euclidean_alg(19, 1829) == 1


def test_EEA():
    assert EEA(252, 198) == (18, (4, -5))
