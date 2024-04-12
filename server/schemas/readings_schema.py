from . import ma, fields, validate, Reading


class ReadingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reading
        load_instance = True
        ordered = True

    tarotcards = fields.Nested(
        "TarotCardSchema",
        only=("id", "name", "image",),
        exclude=("reading",),
        many=True,
    )
    interpretation = fields.String(
        required=True, validate=validate.Length(min=30, max=500)
    )
    comment = fields.String(required=True, validate=validate.Length(min=2, max=50))
    is_public = pass
    
    url = ma.Hyperlinks(
        {
            "self": ma.URLFor("readingbyid", values=dict(id="<id>")),
            "collection": ma.URLFor("readings"),
            "tarotcard": ma.URLFor("tarotcard"),
        }
    )



reading_schema = ReadingSchema()
readings_schema = ReadingSchema(many=True)
