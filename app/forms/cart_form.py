from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Cart




class CartForm(FlaskForm):
    itemId = IntegerField('itemId', validators=[DataRequired()])
    price = DecimalField('price', validators=[DataRequired()])
    quantity = DecimalField('quantity', validators=[DataRequired()])
