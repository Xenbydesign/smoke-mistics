# from sqlalchemy.ext.associationproxy import association_proxy
from . import SerializerMixin, db, validates
from app_config import flask_bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    profile_image = db.Column(db.String)
    about_me = db.Column(db.String)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    serialize_rules = ("-_password_hash",)

    readings = db.relationship(
        "Reading",
        back_populates="user",
    )

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Passwords cannot be inspected after being setup!")

    @password_hash.setter
    def password_hash(self, new_password):
        hashed_password = flask_bcrypt.generate_password_hash(new_password).decode(
            "utf-8"
        )
        self._password_hash = hashed_password

    def authenticate(self, password_to_check):
        return flask_bcrypt.check_password_hash(self._password_hash, password_to_check)

    def __repr__(self):
        return f"<User {self.username}>"
