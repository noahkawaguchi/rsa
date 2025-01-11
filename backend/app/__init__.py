from os import getenv
from urllib.parse import urlparse
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from app.calculations.calculate import calculate


def normalize_origin(origin: str) -> str:
    parsed = urlparse(origin)
    return f'{parsed.scheme}://{parsed.netloc}'


def create_app() -> Flask:
    app = Flask(__name__)

    # Retrieve and set allowed frontend URL(s) (doesn't protect against
    # curl and such)
    allowed_origins = getenv('ALLOWED_ORIGINS')
    if not allowed_origins:
        raise RuntimeError('ALLOWED_ORIGINS is not set')
    allowed_origins_list = [
        normalize_origin(o) for o in allowed_origins.split(',')]
    CORS(app, origins=allowed_origins_list)

    # Set up rate limiting (stored in memory for now)
    limiter = Limiter(get_remote_address, app=app)

    # Set a custom error message for 429 too many requests
    @app.errorhandler(429)
    def custom_rate_limit_handler(e):  # type: ignore
        return jsonify({
            'type': None,
            'error': 'Too many requests. Please try again later.',
        }), 429

    # Set up middleware to validate origin and referrer headers (not
    # completely foolproof)
    @app.before_request
    def validate_origin_and_referrer():  # type: ignore
        origin = request.headers.get('Origin')
        # It's really spelled "referer" in the header
        referrer = request.headers.get('Referer')
        if origin and origin not in allowed_origins_list:
            abort(403, description='Forbidden')
        if referrer:
            referrer_origin = normalize_origin(referrer)
            if referrer_origin not in allowed_origins_list:
                abort(403, description='Forbidden')

    @app.route('/calculate', methods=['POST'])
    @limiter.limit('4 per second; 400 per day')
    def _calculate():  # type: ignore
        data = request.get_json()
        calc_type = data.get('type')

        if calc_type is None:
            return jsonify({'type': calc_type,  # None becomes null in json
                            'error': 'type is required'}), 400

        try:
            result = calculate(data, calc_type)
        except (ValueError, TypeError, KeyError) as e:
            return jsonify({'type': calc_type, 'error': str(e)}), 400
        except Exception as e:
            return jsonify({'type': calc_type,
                            'error': f'Internal server error: {str(e)}'}), 500

        return jsonify({'type': calc_type, 'result': result})

    return app
