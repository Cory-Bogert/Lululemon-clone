from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .items import Item

class ItemImage(db.Model):
    __tablename__ = 'item_images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    itemId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    imageUrl = db.Column(db.String(1000), nullable=False)

    item = db.relationship('Item', back_populates='item_images')
