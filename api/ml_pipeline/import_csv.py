import csv
import os
import sys

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db import Base
from app.models import TrainingMessage

max_int = sys.maxsize
while True:
    try:
        csv.field_size_limit(max_int)
        break
    except OverflowError:
        max_int = int(max_int / 10)

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError(
        "Brak zmiennej DATABASE_URL w pliku .env! Upewnij się, "
        "że plik istnieje.")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False,
                            bind=engine)


def import_emails_from_csv(file_path):
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        with open(file_path, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)

            messages_to_add = []
            for row in reader:
                body_text = row.get('body', '').strip()

                if not body_text:
                    continue

                raw_label = str(row.get('label', '')).lower().strip()

                if raw_label in ['1', 'spam', 'true']:
                    final_label = 'spam'
                else:
                    final_label = 'safe'

                new_msg = TrainingMessage(
                    text=body_text,
                    label=final_label,
                    msg_type='email'
                )
                messages_to_add.append(new_msg)

            db.add_all(messages_to_add)
            db.commit()

            print(
                f"Sukces! Odfiltrowano i zaimportowano "
                f"{len(messages_to_add)} wiadomości do bazy "
                f"zdefiniowanej w .env.")

    except FileNotFoundError:
        print(f"Błąd: Nie znaleziono pliku {file_path}")
    except Exception as e:
        db.rollback()
        print(f"Wystąpił błąd podczas importu: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    import_emails_from_csv('data/email_spam.csv')
