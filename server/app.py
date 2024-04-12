#!/usr/bin/env python3

# Standard library imports
from sqlalchemy.sql.expression import func
# Remote library imports
from flask import request, g, render_template, make_response, session
from flask_restful import Resource

import random
=======
from werkzeug.exceptions import NotFound
from functools import wraps


# Local imports
from app_config import app, db, api

# Add your model imports
from models.reading import Reading
from models.user import User
from models.tarotcard import TarotCard

# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server</h1>"

class CreateReading(Resource):
    def post(self):
        user_id = request.json.get('user_id')
        tarot_cards = TarotCard.query.order_by(db.func.random()).limit(3).all()
        # all_tarots = TarotCard.query.all() 
        # tarots_selected = random.choice(all_tarots, 3)
        if len(tarot_cards) < 3:
            return {"error": "Not enough cards available."}, 400
        new_reading = Reading(
            user_id=user_id,
            tarot_one_id=tarot_cards[0].id,
            tarot_two_id=tarot_cards[1].id,
            tarot_three_id=tarot_cards[2].id
        )
        db.session.add(new_reading)
        db.session.commit()

        return new_reading.to_dict(), 200
api.add_resource(CreateReading, '/new-reading')

@app.errorhandler(NotFound)
def not_found(error):
    return {"error": error.description}, 404


@app.before_request
# def login_required(func):
#     @wraps(func)
#     def decorated_function(*args, **kwargs):
#         if "user_id" not in session:
#             return {"message": "Access Denied, please log in!"}, 422
#         return func(*args, **kwargs)

#     return decorated_function


class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            user = User()
            for attr, value in data.items():
                if hasattr(user, attr):
                    setattr(user, attr, value)
            user.password = data.get("_password_hash")
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id
            return user.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 422


class CheckSession(Resource):
    def get(self):
        try:
            if user_id := session.get("user_id"):
                user = db.session.get(User, user_id)
                return user.to_dict(), 200
            return {}, 401
        except Exception as e:
            return {"message": str(e)}, 422


class Login(Resource):
    def post(self):
        try:
            data = request.json
            user = User.query.filter_by(username=data.get("username")).first()
            if user and user.authenticate(data.get("_password_hash")):
                session["user_id"] = user.id
                return user.to_dict(), 200
            else:
                return {"error": "Invalid Credentials"}, 401
        except Exception as e:
            return {"error": str(e)}, 422


class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {}, 204


api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
