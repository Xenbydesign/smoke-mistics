#!/usr/bin/env python3
# Standard library imports
import os
import random

# Remote library imports

from flask import request, g, render_template, make_response, session
from flask_restful import Resource
from sqlalchemy.sql.expression import func
from werkzeug.exceptions import NotFound
from functools import wraps
from datetime import datetime

# Local imports
from app_config import app, db, api

# Add your model imports
from models.reading import Reading
from models.user import User
from models.tarotcard import TarotCard
from schemas.user_schema import user_schema, users_schema
from schemas.reading_schema import reading_schema, readings_schema

# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


@app.errorhandler(NotFound)
def not_found(error):
    return {"message": str(error)}, 404


@app.before_request
def before_request():
    path_dict = {"userbyid": User, "readingbyid": Reading}
    if request.endpoint in path_dict:
        id = request.view_args.get("id")
        record = db.session.get(path_dict.get(request.endpoint), id)
        key_name = "user" if request.endpoint == "userbyid" else "reading"
        setattr(g, key_name, record)


# def login_required(func):
#     @wraps(func)
#     def decorated_function(*args, **kwargs):
#         if "user_id" not in session:
#             return {"message": "Access Denied, please log in!"}, 422
#         return func(*args, **kwargs)

#     return decorated_function

from openai import OpenAI

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
    project="proj_E3uFutJ2CU1YgYhf7Lepezzm",
    # organization="smoke-mistics",
)


class Readings(Resource):
    def post(self):
        try:
            all_tarots = TarotCard.query.all()
            tarots_selected = random.sample(all_tarots, 3)

            prompt = (
                "What does it mean if someone draws these tarot cards in this order: "
                + ", ".join(card.name for card in tarots_selected)
                + "?"
            )
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
            )
            interpretation = response.to_dict()["choices"][0]["message"]["content"]

            new_reading = Reading(
                user_id=session.get("user_id"),
                tarot1_id=tarots_selected[0].id,
                tarot2_id=tarots_selected[1].id,
                tarot3_id=tarots_selected[2].id,
                interpretation=interpretation,
            )
            db.session.add(new_reading)
            db.session.commit()
            return reading_schema.dump(new_reading), 201

        except Exception as e:
            db.session.rollback()
            return ({"error": str(e)}), 422

    def get(self):
        try:
            readings = readings_schema.dump(
                Reading.query.where(Reading.is_public == True)
            )
            return readings, 200
        except Exception as e:
            return str(e), 400


class ReadingById(Resource):
    def get(self, id):
        if g.reading:
            return reading_schema.dump(g.reading), 200
        return {"message": f"Could not find reading with id #{id}"}, 404

    def patch(self, id):
        if g.reading:
            reading = reading_schema.load(
                request.json, instance=g.reading, partial=True
            )
            db.session.commit()
            return reading_schema.dump(reading), 202
        return {"message": "could not update."}, 400


class UserById(Resource):
    def get(self, id):
        if g.user:
            return user_schema.dump(g.user), 200
        return {"message": "Could not find Profile"}, 404

    def patch(self, id):
        if g.user:
            try:
                data = request.json
                update_user = user_schema.load(data, instance=g.user, partial=True)
                db.session.commit()
                return user_schema.dump(update_user), 202
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 422
        return {"message": "Could not locate profile."}, 404

    def delete(self, id):
        if g.user:
            db.session.delete(g.user)
            db.session.commit()
            return "", 204
        return {"message": "Could not find Profile"}, 404


class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            # data["birthday"] = datetime.strptime(data["birthday"], "%Y-%m-%d").date()
            user = user_schema.load(data)
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id
            return user_schema.dump(user), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422


class CheckSession(Resource):
    def get(self):
        try:
            if user_id := session.get("user_id"):
                user = db.session.get(User, user_id)
                return user_schema.dump(user), 200
            return {"message": "Please Login!"}, 401
        except Exception as e:
            return {"message": str(e)}, 422


class Login(Resource):
    def post(self):
        try:
            data = request.json
            user = User.query.filter_by(username=data.get("username")).first()
            if user and user.authenticate(data.get("_password_hash")):
                session["user_id"] = user.id
                return user_schema.dump(user), 200
            else:
                return {"message": "Invalid Credentials"}, 401
        except Exception as e:
            return {"message": str(e)}, 422


class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {}, 204


api.add_resource(Readings, "/readings")
api.add_resource(ReadingById, "/readings/<int:id>")
api.add_resource(
    UserById, "/users/<int:id>"
)  # need to ask matteo about how to not use id so that others cant populate another users page with id.  making sure this works for now.
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(CheckSession, "/check-session", endpoint="check-session")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
