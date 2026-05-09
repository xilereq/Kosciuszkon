from http import HTTPStatus

from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from pydantic import ValidationError

from app.schemas import LoginRequest, RegisterRequest
from app.services import login_user, logout_user, refresh_user_token, \
    register_user

auth_api_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_api_bp.route('/register', methods=['POST'])
def register():
    raw_data = request.get_json(force=True, silent=True) or {}
    try:
        reg_data = RegisterRequest(**raw_data)
    except ValidationError as e:
        return jsonify({'error': e.errors()}), HTTPStatus.BAD_REQUEST
    user = register_user(**reg_data.model_dump())
    if not user:
        return (jsonify({'error': 'User registration failed'}),
                HTTPStatus.CONFLICT)

    return jsonify(user), HTTPStatus.CREATED


@auth_api_bp.route('/login', methods=['POST'])
def login():
    raw_data = request.get_json(force=True, silent=True) or {}
    try:
        log_data = LoginRequest(**raw_data)
    except ValidationError as e:
        return jsonify({'error': e.errors()}), HTTPStatus.BAD_REQUEST

    result = login_user(**log_data.model_dump())
    if not result:
        return (jsonify({'error': 'Invalid credentials'}),
                HTTPStatus.UNAUTHORIZED)

    return jsonify(result), HTTPStatus.OK


@auth_api_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return (jsonify({'error': 'Missing Authorization Header'}),
                HTTPStatus.BAD_REQUEST)

    incoming_token = auth_header.split(" ")[1]

    result = refresh_user_token(identity, incoming_token)
    if not result:
        return (jsonify({'error': 'Invalid or revoked refresh token'}),
                HTTPStatus.UNAUTHORIZED)

    return jsonify(result), HTTPStatus.OK


@auth_api_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    identity = get_jwt_identity()
    success = logout_user(identity)
    if not success:
        return (jsonify({'error': 'Logout failed'}),
                HTTPStatus.INTERNAL_SERVER_ERROR)

    return (jsonify({'message': 'Logged out successfully'}),
            HTTPStatus.OK)
