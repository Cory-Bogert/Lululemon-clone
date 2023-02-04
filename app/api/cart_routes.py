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
    carts = Cart.query.filter(Cart.userId == current_user.id).all()
    return {'Carts': [cart.to_dict_full() for cart in carts]}
    # return {'Carts':[cart.to_dict_full() for cart in Cart.query.all()]}


@cart_routes.route('/current')
@login_required
def current_cart():
    currId =current_user.get_id()
    return {'Carts':[cart.to_dict_full() for cart in Cart.query.all() if int(cart.userId) == int(currId)]}

@cart_routes.route('/add', methods=['POST'])
@login_required
def add_item():
    currId = current_user.id
    # item = Item.query.get(id)
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # curr_cart = Cart.query.filter(Cart.userId == currId, Cart.itemId == item.id)
        new_cart = Cart()
        form.populate_obj(new_cart)
        db.session.add(new_cart)
        db.session.commit()
        return new_cart.to_dict_full(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@cart_routes.route('/<int:cartId>', methods=['PUT'])
@login_required
def update_item(cartId):
    cart = Cart.query.get(cartId)
    itemId = cart.itemId
    # print(cart, 'this is the cart--------', itemId, 'this is the item id----------')
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        cart.quantity = form.data['quantity']
        db.session.commit()
        return cart.to_dict_full(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@cart_routes.route('/<int:cartId>', methods=['DELETE'])
@login_required
def delete_cart(cartId):
    cart = Cart.query.get(cartId)
    itemId = cart.itemId
    print(itemId,'this is item-0000000000000000')
    # itemId = item.itemId
    db.session.delete(cart)
    db.session.commit()
    currId =current_user.get_id()
    return {'cartId' : cartId, 'itemId' : itemId}











        # print('====================')
        # curr_cart = Cart.query.filter(Cart.userId==currId, Cart.itemId==item.id).first()
        # print(curr_cart, '-***************-')
        # if curr_cart and not form:
        #     print('77777777777777777')
        #     curr_cart.quantity += 1
        #     db.session.commit()
        #     return curr_cart.to_dict()
        # elif curr_cart:
        #     print('8888888888888')
        #     curr_cart.quantity = form.data['quantity']
        #     print('4444444444444444444')
        #     db.session.commit()
        #     return curr_cart.to_dict_full()
        # else:
        #     print('99999999999999999999999999')
        #     new_cart = Cart(
        #         item_id=item.id,
        #         quantity=form.data['quantity'],
        #         user_id=currId
        #     )
        #     db.session.add(new_cart)
        #     db.session.commit()
        #     return new_cart.to_dict()
