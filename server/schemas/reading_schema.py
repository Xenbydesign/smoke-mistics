from . import Reading, fields, ma, validate, validates, ValidationError, User


class ReadingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reading
        load_instance = True
        ordered = True

    user_id = fields.Integer(required=True)
    # tarotcards = fields.Nested(
    #     "TarotCardSchema",
    #     only=(
    #         "id",
    #         "Name",
    #         "Image_URL",
    #         "alt",
    #     ),
    #     many=True,
    # )
    tarot1_id = fields.Int(load_only=True)
    tarot2_id = fields.Int(load_only=True)
    tarot3_id = fields.Int(load_only=True)

    interpretation = fields.String(
        required=True, validate=validate.Length(min=30, max=500)
    )
    comment = fields.String(required=False, validate=validate.Length(min=2, max=50))
    is_public = fields.Boolean(
        required=True,
        truthy={True},
        falsy={False},
        error_messages={
            "invalid": "is_public must be a boolean value (True or False)."
        },
    )

    @validates("user_id")
    def validate_user_id(self, value):
        if not User.query.get(value):
            raise ValidationError("User ID does not exist.")


reading_schema = ReadingSchema()
readings_schema = ReadingSchema(many=True)
