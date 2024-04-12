from . import SerializerMixin, db, validates
from sqlalchemy.sql.expression import func
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

    tarot_one_card = db.relationship(
        "TarotCard", back_populates="readings", foreign_keys="tarot_cards.tarot_one_id"
    )
    tarot_two_card = db.relationship(
        "TarotCard", back_populates="readings", foreign_keys="tarot_cards.tarot_two_id"
    )
    tarot_three_card = db.relationship(
        "TarotCard",
        back_populates="readings",
        foreign_keys="tarot_cards.tarot_three_id",
    )
    user = db.relationship(
        "User",
        back_populates="readings",
    )
