from flask import abort
from sqlalchemy import and_

from app.db import session
from app.models import Family, User, UserFamily
from app.schemas import FamilyCreateRequest, FamilyJoinRequest


def add_new_family(owner_id, request_data: FamilyCreateRequest):
    db = session()
    try:
        new_family = Family(family_name=request_data.family_name)
        db.add(new_family)
        db.flush()
        user_family = UserFamily(
            family_id=new_family.id,
            user_id=owner_id,
            is_admin=True,
            name=request_data.name
        )
        db.add(user_family)
        db.commit()
        db.refresh(new_family)
        return new_family
    except Exception as ex:
        print(ex)
        db.rollback()
        return None
    finally:
        db.close()


def join_family_by_name(user_id, request_data: FamilyJoinRequest):
    db = session()
    try:
        family = db.query(Family).filter(
            Family.family_name == request_data.family_name
        ).first()

        if not family:
            abort(404, description="Nie znaleziono rodziny!")

        existing = db.query(UserFamily).filter_by(
            user_id=user_id,
            family_id=family.id
        ).first()

        if existing:
            abort(409, description="Już należysz do tej rodziny!")

        new_member = UserFamily(
            user_id=user_id,
            family_id=family.id,
            is_admin=request_data.is_admin,
            notifications_enabled=request_data.is_admin,
            name=request_data.name
        )

        db.add(new_member)
        db.commit()
        return {
            "family_name": family.family_name,
            "is_admin": new_member.is_admin
        }

    except Exception as ex:
        db.rollback()
        if not hasattr(ex, 'code'):
            print(f"Błąd krytyczny: {ex}")
            return None
        raise ex
    finally:
        db.close()


def get_family_members(user_id):
    db = session()
    try:
        user_family = db.query(UserFamily, Family).join(
            Family, UserFamily.family_id == Family.id
        ).filter(UserFamily.user_id == user_id).first()

        if not user_family:
            return None

        uf_obj, family_obj = user_family
        family_id = family_obj.id
        family_name = family_obj.family_name

        query_results = db.query(UserFamily).filter(
            and_(
                UserFamily.family_id == family_id,
                UserFamily.user_id != user_id
            )
        ).all()

        return {
            "family_name": family_name,
            "members": [{
                "name": uf.name,
                "is_admin": uf.is_admin,
            } for uf in query_results]
        }

    except Exception as ex:
        print(f"Błąd: {ex}")
        return None
    finally:
        db.close()


def is_family_admin(user_id):
    db = session()
    try:
        admin_record = db.query(UserFamily).filter(
            UserFamily.user_id == user_id,
            UserFamily.is_admin == True # noqa
        ).first()
        print(admin_record)
        return admin_record is not None
    except Exception as ex:
        print(f"Błąd is_family_admin: {ex}")
        return False
    finally:
        db.close()
