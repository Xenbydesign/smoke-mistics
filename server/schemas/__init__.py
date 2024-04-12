#! internal imports
from models.reading import Reading
from models.tarotcard import TarotCard
from app_config import ma

#! external libraries imports
from marshmallow import validates, ValidationError, fields, validate
