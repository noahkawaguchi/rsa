from typing import Any, Generator
import pytest
from pytest_mock import MockerFixture
from flask.testing import FlaskClient
from app import create_app


@pytest.fixture
def client() -> Generator[FlaskClient]:
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.mark.parametrize(
    'payload, status_code, exception, error, result',
    [({'no_type': 'will not work'}, 400, None, 'type is required', None),
     ({'type': 'invalid data'}, 400, ValueError, 'data is invalid', None),
     ({'type': 'internal error'}, 500, ZeroDivisionError,
      'Internal server error', None),
     ({'type': 'this will work'}, 200, None, None, {'returned': 'values'})],
    ids=['missing type field', 'invalid data',
         'internal error', 'valid request'],
)
def test_calculate_endpoint(mocker: MockerFixture, client: FlaskClient,
                            payload: dict[str, Any], status_code: int,
                            exception: type[Exception], error: str,
                            result: dict[str, str]) -> None:

    # Mock the calculate function called from app/__init__.py
    mock_calculate = mocker.patch('app.calculate')
    if exception and error:
        mock_calculate.side_effect = exception(error)
    if result:
        mock_calculate.return_value = result

    # Make a mock POST request
    response = client.post('/calculate', json=payload)
    data = response.get_json()
    assert response.status_code == status_code
    if error:
        assert error in data['error']
    else:
        assert data['result'] == result


def test_too_many_requests(mocker: MockerFixture, client: FlaskClient) -> None:
    mock_calculate = mocker.patch('app.calculate')
    mock_calculate.return_value = {'returned': 'values'}
    # 4 requests allowed per second
    for _ in range(4):
        response = client.post(
            '/calculate', json={'type': 'valid request content'})
        assert response.status_code == 200
    response = client.post(
        '/calculate', json={'type': 'valid request content'})
    assert response.status_code == 429
    assert 'Too many requests' in response.get_json()['error']
