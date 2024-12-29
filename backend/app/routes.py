from flask import Blueprint, request, jsonify

bp = Blueprint('api', __name__)

@bp.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    input_value = data.get('input')

    if input_value is None:
        return jsonify({'error': 'input is required'}), 400
    
    result = input_value * 2
    return jsonify({'result': result})
