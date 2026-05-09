from flask import abort, Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from pydantic import ValidationError

from app.schemas import (AddFamilyMemberResponse, FamilyCreateRequest,
                         FamilyCreateResponse, FamilyJoinRequest)
from app.services.family_service import add_new_family, \
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
        family_name=req_data.family_name,
        owner_id=current_user_id
    )
    if result is None:
        abort(409, description="Rodzina o tej nazwie już istnieje.")
    return jsonify(FamilyCreateResponse.
                   model_validate(result).model_dump()), 201


@family_bp.route('/join', methods=['POST'])
@jwt_required()
def join_existing_family():
    try:
        req_data = FamilyJoinRequest.model_validate(request.get_json())
    except ValidationError as e:
        abort(400, description=e.errors())
    current_user_id = get_jwt_identity()
    result = join_family_by_name(
        family_name=req_data.family_name,
        user_id=current_user_id,
        is_admin=req_data.is_admin
    )

    if result is None:
        abort(500, description="Błąd podczas dołączania do rodziny.")

    return jsonify(AddFamilyMemberResponse.model_validate(
        result).model_dump()), 200
