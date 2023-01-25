from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Comment




class CommentForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
