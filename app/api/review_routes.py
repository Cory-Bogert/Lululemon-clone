from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db, Cart, User, Item, Review
from app.forms.review_form import ReviewForm
from .auth_routes import validation_errors_to_error_messages


review_routes = Blueprint('reviews', __name__)

#get all review data
@review_routes.route('/reviews')
def all_reviews():
    return {'Reviews':[review.to_dict() for review in Review.query.all()]}

#get all current user reviews
@review_routes.route('/reviews/current')
@login_required
def current_review():
    currId = current_user.get_id()
    return {'Reviews':[review.to_dict() for review in Review.query.all() if review.userId == int(currId)]}

#get review based on id
@review_routes.route('/items/<int:id>/reviews')
def single_review(id):
    oneReview = Review.query.get(id)
    if oneReview:
        return oneReview.to_dict_full()
    return {
        'message':'HTTP Error',
        'errors':['Review could not be found'],
        'statusCode': 404
    }, 404

#create review
@review_routes.route('/items/<int:id>/reviews', methods=['POST'])
@login_required
def add_review(id):
    item = Item.query.get(id)
    print('---------------', item)
    if not item:
        return { 'errors': ['item does not exist']}
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('------------')
        review=Review(
            userId=current_user.id,
            itemId=item.id,
        )
        form.populate_obj(review)
        db.session.add(review)
        db.session.commit()
        return item.to_dict_full()

@review_routes.route('/reviews/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    current_review = Review.query.get(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    currId = current_user.get_id()
    print('---------', currId)
    print('000000000000', current_review)
    if form.validate_on_submit():
        form.populate_obj(current_review)
        db.session.add(current_review)
        db.session.commit()
        return current_review.to_dict()

@review_routes.route('/reviews/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    current_review = Review.query.get(id)
    currId = current_user.get_id()
    db.session.delete(current_review)
    db.session.commit()
    return{
        'message':'Successfully deleted',
        'statusCode':200
    },200
