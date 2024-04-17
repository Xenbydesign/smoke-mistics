from datetime import date  # date for the birthday validation
from . import User, fields, ma, validate

# Import from schema init  and from marshmallow  and other dependencies.


class UserSchema(ma.SQLAlchemyAutoSchema):
    # Meta class contains metadata for the schema, influencing how it behaves with respect to model loading and serialization.
    class Meta:
        model = User  # Tells Marshmallow to auto-generate fields based on the User SQLAlchemy model.
        load_instance = True  # Configures the schema to return model instances rather than plain dictionaries when loading data.
        load_only = (
            "_password_hash",
        )  # Fields specified here will be ignored during serialization and only used when loading data.
        dump_only = (
            "id",
            "created_at",
        )  # Fields specified here will only be included when serializing (dumping) data, not when loading.

    # for 'username' validations:
    username = fields.String(
        validate=[
            validate.Length(
                min=1, max=20
            ),  # username length is between 1 and 20 characters.
            validate.Regexp(
                r"^[\w]+$",
                error="Username must be alphanumeric with underscores allowed",  # Regular expression to allow only alphanumeric characters and underscores.
            ),
        ]
    )

    #  for 'email' its required and uses built-in validation from marshmellow makes sure it is a valid email format.
    email = fields.Email(required=True)

    #  for 'birthday' with a validation makes sure the date is not in the future.
    birthday = fields.Date(
        required=True,
        validate=validate.Range(
            max=date.today(),
            error="Birthday cannot be in the future.",  # Uses the current date as the max allowable value.
        ),
    )

    #  for 'profile_image' ensuring the image is validated
    profile_image = fields.String(
        required=False,
        validate=validate.Regexp(
            r".*\.(jpeg|png|jpg)",
            error="File URI must be in JPEG, JPG, or PNG format",  # Regular expression to validate the photo.
        ),
    )

    # Optional field which can be None and has a maximum length of 50 characters.
    about_me = fields.String(allow_none=True, validate=validate.Length(max=50))


#! Create schema for a single user
user_schema = UserSchema()
#! Create schema for a collection of users
# only and exclude to customize
users_schema = UserSchema(
    many=True,
)
