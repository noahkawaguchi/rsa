from typing import Any
import pytest
from pytest_mock import MockerFixture
from app.calculations.calculate import (
    validated_primes_calculation, validated_keys_calculation,
    validated_encode_calculation, validated_decode_calculation,
    calculate,
)


@pytest.mark.parametrize(
    'data, mock_response, expected_arg, expected_exception',
    [
        ({'not_choice': 'ascii'}, None, None, KeyError),
        ({'choice': 'ascii'}, (17, 1049), False, None),
        ({'choice': 'unicode'}, (1069, 2971), True, None),
        ({'choice': 'shift_jis'}, None, None, ValueError),
    ],
    ids=['absent "choice" raises KeyError', '"ascii" retrieves primes',
         '"unicode" retrieves primes', '"shift_jis" raises ValueError'],
)
def test_validated_primes_calculation(
    mocker: MockerFixture,
    data: dict[str, Any],
    mock_response: tuple[int, int],
    expected_arg: bool,
    expected_exception: type[Exception],
) -> None:
    if expected_exception:
        with pytest.raises(expected_exception):
            validated_primes_calculation(data)
    else:
        mock_generate_primes = mocker.patch(
            'app.calculations.calculate.generate_primes'
        )
        mock_generate_primes.return_value = mock_response
        result = validated_primes_calculation(data)
        assert result == {'p': mock_response[0], 'q': mock_response[1]}
        mock_generate_primes.assert_called_with(full_unicode=expected_arg)


def test_validated_keys_calculation():
    # There is not much logic here that is not already tested elsewhere.
    assert (validated_keys_calculation({'p': 2203, 'q': 1163})
            == {'n': 2562089, 'e': 5, 'd': 511745})


@pytest.mark.parametrize(
    'data, expected_result, expected_exception',
    [
        ({'n': 202457, 'e': 5, 'planetext': 'I misspelled plain.'},
         None, KeyError),
        ({'n': 202457, 'e': 5, 'plaintext': ('not', 'a', 'string')},
         None, TypeError),
        ({'n': 202457, 'e': 5, 'plaintext': 'This is valid.'},
         {'ciphertext': [167632, 78066, 128802, 76296, 149027, 128802,
                         76296, 149027, 139025, 126602, 166450, 128802,
                         41399, 64207]}, None),
    ],
    ids=['"planetext" raises KeyError',
         'tuple raises TypeError',
         'valid message gets ciphertext'],
)
def test_validated_encode_calculation(
    data: dict[str, Any],
    expected_result: dict[str, list[int]],
    expected_exception: type[Exception]
) -> None:
    if (expected_exception):
        with pytest.raises(expected_exception):
            validated_encode_calculation(data)
    else:
        assert validated_encode_calculation(data) == expected_result


def test_validated_decode_calculation() -> None:
    # There is not much logic here that is not already tested elsewhere.
    ciphertext = [248310, 583720, 1819830, 1552523, 2634864, 1961485, 583720,
                  857888, 72095, 2725931, 1552523, 2563953, 158726, 583720,
                  72095, 2052867, 1571790, 691242, 2563953, 158726, 583720,
                  1731285]
    data: dict[str, int | list[int]] = {'n': 2776273, 'd': 1980643,
                                        'ciphertext': ciphertext}
    expected_result = {'plaintext': 'I love strong typing 🔢'}
    assert (validated_decode_calculation(data) == expected_result)


@pytest.mark.parametrize(
    'calc_type, expected_exception',
    [('primes', None), ('keys', None), ('encode', None), ('decode', None),
     ('invalid_calc', ValueError)],
    ids=['primes', 'keys', 'encode', 'decode',
         'invalid calc_type causes ValueError'],
)
def test_calculate(mocker: MockerFixture, calc_type: str,
                   expected_exception: type[Exception]) -> None:
    dummy_data = {'dummy': 'dummy'}
    if expected_exception:
        with pytest.raises(expected_exception):
            calculate(dummy_data, calc_type)
    else:
        mock_validated_calculation = mocker.patch(
            f'app.calculations.calculate.validated_{calc_type}_calculation'
        )
        calculate(dummy_data, calc_type)
        mock_validated_calculation.assert_called_with(dummy_data)
