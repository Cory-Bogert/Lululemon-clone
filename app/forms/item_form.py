from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Item




class ItemForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    color = StringField('color', validators=[DataRequired()])
    price = DecimalField('price', validators=[DataRequired()])
    size = StringField('size', validators=[DataRequired()])
    stocked = BooleanField('fundingGoal', validators=[DataRequired()])
    previewImg = StringField('previewImg')
