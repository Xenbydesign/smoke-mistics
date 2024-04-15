from . import SerializerMixin, db
from .reading import Reading

class TarotCard(db.Model, SerializerMixin):
    __tablename__ = "tarot_cards"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image_url = db.Column(db.String)
    alt = db.Column(db.String)


    readings = db.relationship(
        "Reading",
        primaryjoin="or_(Reading.tarot1_id==TarotCard.id, Reading.tarot2_id==TarotCard.id, Reading.tarot3_id==TarotCard.id)",
    )

    def __repr__(self):
        return f"""
        <TarotCard #{self.id}:
        card:{self.name}
        />"""
