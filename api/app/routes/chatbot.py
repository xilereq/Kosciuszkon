from flask import Blueprint, request, jsonify
from app.services.chatbot_service import generate_chat_response

chat_bp = Blueprint('chat', __name__, url_prefix='/api/chat')

@chat_bp.route('/message', methods=['POST'])
def handle_chat_message():
    data = request.get_json()

    if not data or 'messages' not in data:
        return jsonify({"error": "Brak pola 'messages' zawierającego historię konwersacji."}), 400

    messages = data['messages']

    if not isinstance(messages, list):
        return jsonify({"error": "Pole 'messages' musi być listą obiektów."}), 400

    recent_messages = messages[-10:]

    try:
        bot_reply = generate_chat_response(recent_messages)

        return jsonify({
            "status": "success",
            "reply": bot_reply
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500