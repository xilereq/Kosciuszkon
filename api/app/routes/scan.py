from http import HTTPStatus
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from pydantic import ValidationError
from app.schemas import ScanRequest
from app.services import analyze_text_content

scan_api_bp = Blueprint('scan', __name__, url_prefix='/api/scan')

@scan_api_bp.route('/analyze', methods=['POST'])
@jwt_required()
def analyze():
    raw_data = request.get_json(force=True, silent=True) or {}
    try:
        scan_data = ScanRequest(**raw_data)
    except ValidationError as e:
        return jsonify({'error': e.errors()}), HTTPStatus.BAD_REQUEST

    result = analyze_text_content(scan_data.text)

    print("\n" + "=" * 50)
    print(f"[ANALIZA] Status: {result.get('status')} | Prawdopodobieństwo: {result.get('confidence', 0.0)}%")
    print("=" * 50 + "\n")

    return jsonify(result), HTTPStatus.OK