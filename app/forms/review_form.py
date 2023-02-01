from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Review




class ReviewForm(FlaskForm):
    title = StringField('title')
    rating = IntegerField('rating', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
