from flask import abort, Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from pydantic import ValidationError

from app.schemas import AddFamilyMemberResponse, FamilyCreateRequest, \
    FamilyCreateResponse, FamilyDashboardResponse, FamilyJoinRequest
from app.services import add_new_family, get_family_members, \
    get_latest_notification_by_user_id, is_family_admin, \
    join_family_by_name

family_bp = Blueprint('family', __name__, url_prefix='/api/family')


@family_bp.route('/create', methods=['POST'])
@jwt_required()
def create_new_family():
    try:
        req_data = FamilyCreateRequest.model_validate(
            request.get_json())
    except ValidationError as e:
        abort(400, description=e.errors())
    current_user_id = get_jwt_identity()
    result = add_new_family(
        owner_id=current_user_id,
        request_data=req_data
    )
    if result is None:
        abort(409,
              description="Nie udało się utworzyć rodziny. "
                          "Nazwa może być zajęta.")
    return jsonify(
        FamilyCreateResponse.model_validate(result).model_dump()), 201


@family_bp.route('/join', methods=['POST'])
@jwt_required()
def join_existing_family():
    try:
        req_data = FamilyJoinRequest.model_validate(request.get_json())
    except ValidationError as e:
        abort(400, description=e.errors())
    current_user_id = get_jwt_identity()
    result = join_family_by_name(current_user_id, req_data)

    if result is None:
        abort(500, description="Błąd podczas dołączania do rodziny.")

    return jsonify(AddFamilyMemberResponse.model_validate(
        result).model_dump()), 200


@family_bp.route('/members', methods=['GET'])
@jwt_required()
def list_family_members():
    current_user_id = get_jwt_identity()

    result = get_family_members(current_user_id)

    if result is None:
        abort(404,
              description="Użytkownik nie należy do żadnej rodziny.")

    return jsonify(FamilyDashboardResponse.model_validate(
        result).model_dump()), 200


@family_bp.route('/am_i_boss', methods=['GET'])
@jwt_required()
def am_i_boss():
    current_user_id = get_jwt_identity()
    is_boss = is_family_admin(current_user_id)
    return jsonify({
        'is_boss': is_boss,
    }), 200


@family_bp.route('/member/<int:member_id>/events', methods=['GET'])
@jwt_required()
def get_member_events(member_id):
    event = get_latest_notification_by_user_id(member_id)

    if not event:
        return jsonify([]), 200

    formatted_events = [{
        "id": event.id,
        "type": event.type.value if hasattr(event.type, 'value')
        else event.type,
        "date": event.created_at.strftime('%Y-%m-%d'),
        "time": event.created_at.strftime('%H:%M'),
        "source": f"Nadawca: {event.sender}",
        "threatType": "Zagrożenie" if event.probability > 0.8
        else "Podejrzenie",
        "title": event.title,
        "desc": event.content or "Brak dodatkowego opisu."
    }]

    return jsonify(formatted_events), 200
