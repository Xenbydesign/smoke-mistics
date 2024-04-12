from config import SerializerMixin, db


class Reading(db.Model, SerializerMixin):
    __tablename__ = "readings"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    tarot_one_id = db.Column(db.Integer, db.ForeignKey("tarots.id"))
    tarot_two_id = db.Column(db.Integer, db.ForeignKey("tarots.id"))
    tarot_three_id = db.Column(db.Integer, db.ForeignKey("tarot.id"))
    interpretation = db.Column(db.string)
    comment = db.Column(db.string)
    is_public = db.Column(db.Boolean, default=False)

    tarot_card = db.relationship(
        "TarotCard",
        back_populates="readings",
    )
    user = db.relationship(
        "User",
        back_populates="readings",
    )
