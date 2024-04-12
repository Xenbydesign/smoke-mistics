from config import SerializerMixin, db


class TarotCard(db.Model, SerializerMixin):
    __tablename__ = "tarot_cards"
    id = db.Column(db.Integer, primary_key=True)
    card_name = db.Column(db.String)
    image = db.Column(db.string)

    readings = db.relationship(
        "Reading",
        back_populates="tarot_card",
    )

    def __repr__(self):
        return f"<TarotCard {self.card_name}>"
