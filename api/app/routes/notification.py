from flask import abort, Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from pydantic import ValidationError

from app.schemas import NotificationCreateRequest, \
    NotificationResponse, NotificationsList
from app.services import add_notification_to_db, \
    get_notifications_from_db, remove_notification_from_db

notification_bp = Blueprint('notification', __name__,
                            url_prefix='/api/notification')


@notification_bp.route('/add', methods=['POST'])
@jwt_required()
def add_new_notification():
    try:
        req_data = NotificationCreateRequest.model_validate(
            request.get_json())
    except ValidationError as e:
        abort(400, description=e.errors())

    current_user_id = get_jwt_identity()

    new_alert = add_notification_to_db(req_data, current_user_id)

    if not new_alert:
        abort(403, description="Nie udało się "
                               "przypisać powiadomienia do rodziny.")

    return jsonify(NotificationResponse.model_validate(new_alert).
                   model_dump()), 201


@notification_bp.route('/all', methods=['GET'])
@jwt_required()
def get_my_notifications():
    current_user_id = get_jwt_identity()

    notifications_data = get_notifications_from_db(
        current_user_id)

    if notifications_data is None:
        return jsonify({"notifications": []}), 200

    response_data = NotificationsList(
        notifications=[NotificationResponse.model_validate(n) for n in
                       notifications_data]
    )

    return jsonify(response_data.model_dump()), 200


@notification_bp.route('remove/<int:notification_id>',
                       methods=['DELETE'])
@jwt_required()
def delete_notification(notification_id):
    current_user_id = get_jwt_identity()

    success = remove_notification_from_db(notification_id,
                                          current_user_id)

    if success:
        return jsonify({"message": "Powiadomienie usunięte"}), 200

    abort(500, "Błąd podczas usuwania")
