from flask_jwt_extended import create_access_token, create_refresh_token
from werkzeug.security import check_password_hash, \
    generate_password_hash

from app.db import session
from app.models import User
from app.schemas import LoginResponse
from app.schemas import UserResponse


def register_user(username, email, password, role='user'):
    hashed_pw = generate_password_hash(password)

    new_user = User(
        username=username,
        email=email,
        password_hash=hashed_pw,
        role=role
    )

    db = session()
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return UserResponse.model_validate(new_user).model_dump()
    except Exception as e:
        print(e)
        db.rollback()
        return None
    finally:
        db.close()


def login_user(username, password):
    db = session()
    try:
        user = db.query(User).filter_by(username=username).first()

        if user and check_password_hash(user.password_hash, password):
            identity = str(user.id)
            access_token = create_access_token(
                identity=identity,
                additional_claims={'role': user.role}
            )

            refresh_token = create_refresh_token(identity=identity)
            user.latest_refresh_token = refresh_token
            db.commit()

            data = {
                'access_token': access_token,
                'refresh_token': refresh_token,
                "username": user.username,
                "role": user.role
            }
            return LoginResponse(**data).model_dump()
    finally:
        db.close()
    return None


def logout_user(identity):
    db = session()
    try:
        user = db.get(User, int(identity))

        if user:
            user.refresh_token = None
            db.commit()
            return True
    finally:
        db.close()
    return False


def refresh_user_token(identity, incoming_refresh_token):
    db = session()
    try:
        user = db.get(User, int(identity))
        if user and user.latest_refresh_token == incoming_refresh_token:
            new_access = create_access_token(identity=str(user.id))
            return {"access_token": new_access}
    finally:
        db.close()
    return None
