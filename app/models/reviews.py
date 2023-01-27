from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
# from .items import Item

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    itemId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')))
    rating = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(1000), nullable=False)

    user = db.relationship("User", back_populates='reviews')
    item = db.relationship('Item', back_populates='reviews')
    comments = db.relationship('Comment', back_populates='review', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'itemId': self.itemId,
            'rating': self.rating,
            'description': self.description,
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'itemId': self.itemId,
            'rating': self.rating,
            'description': self.description,
            'user': self.user.to_dict()
        }
