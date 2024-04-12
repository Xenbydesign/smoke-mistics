#!/usr/bin/env python3

# Standard library imports
from sqlalchemy.sql.expression import func
# Remote library imports
from flask import request
from flask_restful import Resource
import random
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

if __name__ == "__main__":
    app.run(port=5555, debug=True)
