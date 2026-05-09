from http import HTTPStatus

import pendulum
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from pydantic import ValidationError

from app.schemas import NotificationCreateRequest, NotificationType, \
    ScanRequest
from app.services import add_notification_to_db, analyze_text_content

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

    if result.get('status') == 'DANGER':
        current_user_id = get_jwt_identity()
        notification_request = NotificationCreateRequest(
            title=scan_data.title,
            sender=scan_data.sender,
            content=result.get('message', ''),
            probability=result.get('confidence', 0.0),
            type=NotificationType.EMAIL,
            created_at=pendulum.now('Europe/Warsaw')
        )
        add_notification_to_db(notification_request, current_user_id)

    print("\n" + "=" * 50)
    print(f"[ANALIZA] Status: {result.get('status')} "
          f"| Prawdopodobieństwo: {result.get('confidence', 0.0)}%")
    print("=" * 50 + "\n")

    return jsonify(result), HTTPStatus.OK
