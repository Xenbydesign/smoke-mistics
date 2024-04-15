from . import TarotCard, fields, ma, validate


class TarotCardSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TarotCard
        load_instance = False
        include_fk = True

    id = fields.Int(dump_only=True)
    name = fields.Str(dump_only=True)
    image_url = fields.Str(dump_only=True)
    alt = fields.Str(dump_only=True)
