from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Cart




class CartForm(FlaskForm):
    itemId = IntegerField('itemId', validators=[DataRequired()])
    userId = IntegerField('userId', validators=[DataRequired()])
    price = DecimalField('price', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
