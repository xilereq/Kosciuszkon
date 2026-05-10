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
        if user_family.is_admin:
            notifications = db.query(Notification).filter(
                Notification.family_id == user_family.family_id
            ).order_by(Notification.created_at.desc()).all()
        else:
            notifications = db.query(Notification).filter(
                Notification.user_id == user_id
            ).order_by(Notification.created_at.desc()).all()
        return notifications
    except Exception as ex:
        db.rollback()
        if not hasattr(ex, 'code'):
            print(f"Błąd krytyczny: {ex}")
            return None
        raise ex
    finally:
        db.close()


def remove_notification_from_db(notification_id, user_id):
    db = session()
    try:
        notification = db.query(Notification).filter_by(
            id=notification_id).first()

        if not notification:
            abort(404, "Powiadomienie nie istnieje")

        user_family = db.query(UserFamily).filter_by(
            user_id=user_id).first()
        if (not user_family or user_family.family_id
                != notification.family_id):
            abort(403,
                  "Nie masz uprawnień do usunięcia tego powiadomienia")

        db.delete(notification)
        db.commit()
        return True
    except Exception as ex:
        db.rollback()
        if not hasattr(ex, 'code'):
            print(f"Błąd usuwania: {ex}")
            return False
        raise ex
    finally:
        db.close()


def get_latest_notification_by_user_id(user_id):
    db = session()
    try:
        latest = db.query(Notification).filter(
            Notification.user_id == user_id
        ).order_by(Notification.created_at.desc()).first()
        return latest
    except Exception as ex:
        print(
            f"Błąd przy pobieraniu najnowszego powiadomienia "
            f"dla użytkownika {user_id}: {ex}")
        return None
    finally:
        db.close()
