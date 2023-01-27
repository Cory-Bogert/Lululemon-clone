from flask import Blueprint, redirect, request, session
from flask_login import login_required,current_user
from ..models import Item, db, User, Cart
from app.api.auth_routes import authenticate
from app.forms.cart_form import CartForm
from .auth_routes import validation_errors_to_error_messages


cart_routes = Blueprint('carts', __name__)

#get all cart data --- SHOULD NEVER USE
@cart_routes.route('')
def all_carts():
    return {'Carts':[car.to_dict_full() for car in Cart.query.all()]}


@cart_routes.route('/current')
@login_required
def current_cart():
    currId =current_user.get_id()
    return {'Carts':[cart.to_dict_full() for cart in Cart.query.all() if int(cart.userId) == int(currId)]}

@cart_routes.route('', methods=['POST'])
@login_required
def add_item():
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('------------------------------')
        item=Item.query.get(form.data['itemId'])
        print('----------', item)
        if not item:
            return{
                'message':'HTTP Error',
                'errors': 'Item could not be found',
                'statusCode': 404
            }, 404
        item_id = item.id
        print('0000000000000000', item_id)
        currId =current_user.get_id()
        print('00000000000000000000', currId)
        user_Cart=Cart.query.filter(Cart.itemId==item_id).filter(Cart.userId==currId).all()
        print(user_Cart, 'bbbbbbbbbbbbbbbb')
        # if user_Cart:
        #     return {
        #         'message':'Validation Error',
        #         'errors':'one user can only have one cart',
        #         'statusCode': 400
        #     }, 400
        new_cart = Cart(itemId=item_id)
        print('zzzzzzzzzzzzzzzzzzz', new_cart)
        form.populate_obj(new_cart)
        db.session.add(new_cart)
        db.session.commit()
        return new_cart.to_dict_full()

    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400


