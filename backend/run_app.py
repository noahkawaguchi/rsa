from flask import Flask, request, jsonify
from flask_cors import CORS
from calculations.calculate import calculate

app = Flask(__name__)
CORS(app)


@app.route('/numbers', methods=['POST'])
def numbers():
    data = request.get_json()
    calc_type = data.get('type')

    if calc_type is None:
        return jsonify({'type': calc_type, 'error': 'type is required'}), 400

    try:
        result = calculate(data)
    except (ValueError, TypeError, KeyError) as e:
        return jsonify({'type': calc_type, 'error': str(e)}), 400
    except Exception as e:
        return jsonify({'type': calc_type,
                        'error': f'Internal server error: {str(e)}'}), 500

    return jsonify({'type': calc_type, 'result': result})


if __name__ == '__main__':
    app.run(debug=True)
