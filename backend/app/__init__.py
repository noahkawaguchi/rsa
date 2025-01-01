from flask import Flask, request, jsonify
from flask_cors import CORS
from app.calculations.calculate import calculate
from app.exceptions import MissingFieldError


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/calculate', methods=['POST'])
    def _calculate():
        data = request.get_json()
        calc_type = data.get('type')

        if calc_type is None:
            return jsonify({'type': calc_type, 'error': 'type is required'}), 400

        try:
            result = calculate(data, calc_type)
        except (MissingFieldError, ValueError, TypeError) as e:
            return jsonify({'type': calc_type, 'error': str(e)}), 400
        except Exception as e:
            return jsonify({'type': calc_type,
                            'error': f'Internal server error: {str(e)}'}), 500

        return jsonify({'type': calc_type, 'result': result})

    return app
