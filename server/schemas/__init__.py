#! internal imports
from models.reading import Reading
from models.user import User
from app_config import ma

#! external libraries imports
from marshmallow import validates, ValidationError, validate, fields
