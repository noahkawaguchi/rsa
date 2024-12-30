from flask import Flask, request, jsonify
from flask_cors import CORS
from calculations import calculate

app = Flask(__name__)
CORS(app)

@app.route('/numbers', methods=['POST'])
def numbers():
    data = request.get_json()
    input_value = data.get('input')
    calculation_type = data.get('type')

    if input_value is None:
        return jsonify({'error': 'input is required'}), 400
    
    if calculation_type is None:
        return jsonify({'error': 'type is required'}), 400
    
    try:
        input_int = int(input_value)
    except ValueError:
        raise ValueError(f'Could not convert "{input_value}" to an integer')
    
    try:
        result = calculate(input_int, calculation_type)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500
    
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
