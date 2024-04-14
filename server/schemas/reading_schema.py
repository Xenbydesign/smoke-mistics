from . import Reading, fields, ma, validate


class ReadingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reading
        load_instance = True
        ordered = True

    # tarotcards = fields.Nested(
    #     "TarotCardSchema",
    #     only=("id", "name", "image",),
    #     exclude=("reading",),
    #     many=True,
    # ) might need to make this user not card??
    interpretation = fields.String(
        required=True, validate=validate.Length(min=30, max=500)
    )
    comment = fields.String(required=False, validate=validate.Length(min=2, max=50))

    is_public = is_public = fields.Boolean(
        required=True,
        truthy={True},
        falsy={False},
        error_messages={
            "invalid": "is_public must be a boolean value (True or False)."
        },
    )


reading_schema = ReadingSchema()
readings_schema = ReadingSchema(many=True)
