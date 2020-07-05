from flask_mongoengine import *
from flask_mongoengine.wtf import *
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class User(Document):
    email = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)

# class Content(EmbeddedDocument):
#     text = StringField()
#     lang = StringField(max_length=3)

# class Post(Document):
#     title = StringField(max_length=120, required=True, validators=[validators.InputRequired(message=u'Missing title.'),])
#     author = ReferenceField(User)
#     tags = ListField(StringField(max_length=30))
#     content = EmbeddedDocumentField(Content)
