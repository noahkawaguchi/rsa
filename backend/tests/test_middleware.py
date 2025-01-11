from typing import Generator
import pytest
from flask import Flask
from flask.testing import FlaskClient
from app import create_app


@pytest.fixture
def app(monkeypatch: pytest.MonkeyPatch) -> Flask:
    monkeypatch.setenv('ALLOWED_ORIGINS', 'http://allowed.com')
    from app import create_app
    return create_app()


@pytest.fixture
def client(app: Flask) -> Generator[FlaskClient]:
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.mark.parametrize(
    'origin, referrer, status_code',
    [
        ('http://allowed.com', None, 200),
        ('http://notallowed.com', None, 403),
        (None, 'http://allowed.com/page', 200),
        (None, 'http://notallowed.com/page', 403)
    ],
    ids=['allowed origin', 'not allowed origin',
         'allowed referrer', 'not allowed referrer'],
)
def test_origin_and_referrer(client: FlaskClient, origin: str, referrer: str,
                             status_code: int) -> None:
    headers = {}
    if origin:
        headers['Origin'] = origin
    if referrer:
        headers['Referer'] = referrer
    response = client.post('/calculate',
                           json={'type': 'primes', 'choice': 'unicode'},
                           headers=headers)
    assert response.status_code == status_code
