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

    # === SEKCJA WYPISYWANIA W TERMINALU ===
    print("\n" + "=" * 50)
    print(f"[SKANOWANIE] Wykryto nową treść (Źródło: {scan_data.source_type})")

    if scan_data.source_type == "email":
        print(f"Nadawca: {scan_data.sender or 'Brak danych'}")
        print(f"Tytuł:   {scan_data.title or 'Brak danych'}")

    print(f"Treść:   {scan_data.text}")
    print("=" * 50 + "\n")
    # ======================================

    result = analyze_text_content(scan_data.text)
    return jsonify(result), HTTPStatus.OK