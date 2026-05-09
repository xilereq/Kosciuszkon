from http import HTTPStatus

from flask import jsonify


def register_error_handlers(app):
    @app.errorhandler(HTTPStatus.BAD_REQUEST)
    def bad_request(e):
        print(f"Error 400: {e}")
        return jsonify({
            'error': 'bad_request',
            'message': getattr(e, 'description', str(e)),
            'status': HTTPStatus.BAD_REQUEST.value
        }), HTTPStatus.BAD_REQUEST

    @app.errorhandler(HTTPStatus.FORBIDDEN)
    def forbidden(e):
        print(f"Error 403: {e}")
        return jsonify({
            "error": "forbidden",
            "message": getattr(e, 'description', str(e)),
            "status": HTTPStatus.FORBIDDEN.value
        }), HTTPStatus.FORBIDDEN

    @app.errorhandler(HTTPStatus.NOT_FOUND)
    def not_found(e):
        print(f"Error 404: {e}")
        return jsonify({
            "error": "not_found",
            "message": getattr(e, 'description', str(e)),
            "status": HTTPStatus.NOT_FOUND.value
        }), HTTPStatus.NOT_FOUND

    @app.errorhandler(HTTPStatus.METHOD_NOT_ALLOWED)
    def method_not_allowed(e):
        print(f"Error 405: {e}")
        return jsonify({
            "error": "method_not_allowed",
            "message": getattr(e, 'description', str(e)),
            "status": HTTPStatus.METHOD_NOT_ALLOWED.value
        }), HTTPStatus.METHOD_NOT_ALLOWED

    @app.errorhandler(HTTPStatus.CONFLICT)
    def conflict(e):
        print(f"Error 409: {e}")
        return jsonify({
            "error": "conflict",
            "message": getattr(e, 'description', str(e)),
            "status": HTTPStatus.CONFLICT.value
        }), HTTPStatus.CONFLICT

    @app.errorhandler(Exception)
    def internal_error(e):
        print(f"Exception: {e}")
        return jsonify({
            "error": "internal_server_error",
            "message": getattr(e, 'description', str(e)),
            "status": HTTPStatus.INTERNAL_SERVER_ERROR.value
        }), HTTPStatus.INTERNAL_SERVER_ERROR
