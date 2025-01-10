from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from app.calculations.calculate import calculate


def create_app():
    app = Flask(__name__)
    CORS(app)

    limiter = Limiter(get_remote_address, app=app)

    @app.errorhandler(429)
    def custom_rate_limit_handler(e):  # type: ignore
        return jsonify({
            'type': None,
            'error': 'Too many requests. Please try again later.',
        }), 429

    @app.route('/calculate', methods=['POST'])
    @limiter.limit('4 per second; 400 per day') # 4 calculation types total
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
