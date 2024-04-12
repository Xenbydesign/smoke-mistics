from . import SerializerMixin, db, validates
from .user import User
from .tarotcard import TarotCard


class Reading(db.Model, SerializerMixin):
    __tablename__ = "readings"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    tarot_one_id = db.Column(db.Integer, db.ForeignKey("tarot_cards.id"))
    tarot_two_id = db.Column(db.Integer, db.ForeignKey("tarot_cards.id"))
    tarot_three_id = db.Column(db.Integer, db.ForeignKey("tarot_cards.id"))
    interpretation = db.Column(db.String)
    comment = db.Column(db.String)
    is_public = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    tarot_one_card = db.relationship("TarotCard", foreign_keys="[Reading.tarot_one_id]")
    tarot_two_card = db.relationship("TarotCard", foreign_keys="[Reading.tarot_two_id]")
    tarot_three_card = db.relationship(
        "TarotCard",
        foreign_keys="[Reading.tarot_three_id]",
    )

    @property
    def tarot_cards(self):
        return [self.tarot_one_card, self.tarot_two_card, self.tarot_three_card]

    user = db.relationship(
        "User",
        back_populates="readings",
    )
