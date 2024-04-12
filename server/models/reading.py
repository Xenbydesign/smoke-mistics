from . import SerializerMixin, db, validates
from sqlalchemy.sql.expression import func
from .user import User
from .tarotcard import TarotCard


class Reading(db.Model, SerializerMixin):
    __tablename__ = "readings"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    tarot1 = db.Column(db.Integer, db.ForeignKey("tarot_cards.id"))
    tarot2 = db.Column(db.Integer, db.ForeignKey("tarot_cards.id"))
    tarot3 = db.Column(db.Integer, db.ForeignKey("tarot_cards.id"))
    interpretation = db.Column(db.String)
    comment = db.Column(db.String)
    is_public = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    tarot_1 = db.relationship("TarotCard", foreign_keys="[Reading.tarot1]")
    tarot_2 = db.relationship("TarotCard", foreign_keys="[Reading.tarot2]")
    tarot_3 = db.relationship(
        "TarotCard",
        foreign_keys="[Reading.tarot3]",
    )

    @property
    def tarot_cards(self):
        return [self.tarot_1, self.tarot_2, self.tarot_3]

    user = db.relationship(
        "User",
        back_populates="readings",
    )

    def __repr__(self):
        return f"""
            <Reading #{self.id}:
                user_id:{self.user_id}
                cards:{self.tarot_cards}
                interpretation:{self.interpretation}
                comment:{self.comment}
                is_public:{self.is_public}
                created_at{self.created_at}
            />
        """
