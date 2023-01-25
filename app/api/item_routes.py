from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db, Cart, User, Item
from app.forms import ItemForm
from .auth_routes import validation_errors_to_error_messages


item_routes = Blueprint('items', __name__)

#get all item data
@item_routes.route('')
def all_items():
    return {'Items':[item.to_dict_full() for item in Item.query.all()]}
