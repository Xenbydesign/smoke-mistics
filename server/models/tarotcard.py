from . import SerializerMixin, db


class TarotCard(db.Model, SerializerMixin):
    __tablename__ = "tarot_cards"
    id = db.Column(db.Integer, primary_key=True)
    card_name = db.Column(db.String)
    image = db.Column(db.String)

    readings = db.relationship(
        "Reading",
        primaryjoin="or_(Reading.tarot_one_id==TarotCard.id, Reading.tarot_two_id==TarotCard.id, Reading.tarot_three_id==TarotCard.id)",
    )

    def __repr__(self):
        return f"<TarotCard {self.card_name}>"
