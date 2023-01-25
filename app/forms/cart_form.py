from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Cart




class CartForm(FlaskForm):
    price = DecimalField('price', validators=[DataRequired()])
    quantity = DecimalField('quantity', validators=[DataRequired()])
