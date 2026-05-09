from flask import abort

from app.db import session
from app.models import Family, UserFamily


def add_new_family(family_name, owner_id):
    db = session()
    try:
        new_family = Family(family_name=family_name)
        db.add(new_family)
        db.flush()
        user_family = UserFamily(
            family_id=new_family.id,
            user_id=owner_id,
            is_admin=True
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


def join_family_by_name(family_name, user_id, is_admin):
    db = session()
    try:
        family = db.query(Family).filter(
            Family.family_name == family_name).first()

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
            is_admin=is_admin,
            notifications_enabled=is_admin
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
