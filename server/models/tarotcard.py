from . import SerializerMixin, db


class TarotCard(db.Model, SerializerMixin):
    __tablename__ = "tarot_cards"
    id = db.Column(db.Integer, primary_key=True)
    card = db.Column(db.String)
    image = db.Column(db.String)

    readings = db.relationship(
        "Reading",
        primaryjoin="or_(Reading.tarot1==TarotCard.id, Reading.tarot2==TarotCard.id, Reading.tarot3==TarotCard.id)",
    )

    def __repr__(self):
        return f"""
        <TarotCard #{self.id}:
        card:{self.card}
        />"""
