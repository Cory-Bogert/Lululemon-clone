from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .items import Item

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    itemId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    price = db.Column(db.DECIMAL(10, 2), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates='carts')
    item = db.relationship('Item', back_populates='carts')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'itemId': self.itemId,
            'price': str(self.price),
            'quantity': self.quantity,
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'itemId': self.itemId,
            'price': str(self.price),
            'quantity': self.quantity,
            'Item': Item.query.get(self.itemId).to_dict(),
            'user': self.user.to_dict()

        }
