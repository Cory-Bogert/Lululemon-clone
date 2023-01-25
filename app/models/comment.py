from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .items import Item
from .reviews import Review

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    reviewId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id')), nullable=False)
    description = db.Column(db.String(1000), nullable=False)

    user = db.relationship("User", back_populates='comments')
    review = db.relationship('Review', back_populates='comments')
