from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .items import Item

class PurchasedItem(db.Model):
    __tablename__ = 'purchased_items'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    itemId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)


    user = db.relationship("User", back_populates='purchased_items')
    item = db.relationship('Item', back_populates='purchased_items')
