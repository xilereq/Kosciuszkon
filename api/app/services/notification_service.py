from flask import abort

from app.db import session
from app.models import Notification, UserFamily
from app.schemas import NotificationCreateRequest


def add_notification_to_db(req_data: NotificationCreateRequest,
                           user_id):
    db = session()
    try:
        user_family_record = db.query(UserFamily).filter_by(
            user_id=user_id).first()

        if not user_family_record:
            abort(404, "Użytkownik nie należy do rodziny")

        new_notification = Notification(
            user_id=user_id,
            family_id=user_family_record.family_id,
            title=req_data.title,
            sender=req_data.sender,
            probability=req_data.probability,
            content=req_data.content,
            type=req_data.type,
            created_at=req_data.created_at
        )

        db.add(new_notification)
        db.commit()
        db.refresh(new_notification)
        return new_notification
    except Exception as ex:
        db.rollback()
        if not hasattr(ex, 'code'):
            print(f"Błąd krytyczny: {ex}")
            return None
        raise ex
    finally:
        db.close()


def get_family_notifications_from_db(user_id):
    db = session()
    try:
        user_family = db.query(UserFamily).filter_by(
            user_id=user_id).first()

        if not user_family:
            abort(404, "Nie należysz do rodziny")

        if not user_family.is_admin:
            abort(403, "Brak uprawnień administratora rodziny")

        notifications = db.query(Notification).filter(
            Notification.family_id == user_family.family_id
        )
        return notifications
    except Exception as ex:
        db.rollback()
        if not hasattr(ex, 'code'):
            print(f"Błąd krytyczny: {ex}")
            return None
        raise ex
    finally:
        db.close()
