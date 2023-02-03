from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
# from .item_image import Item_image
from .reviews import Review
# from .cart import Cart
# from .wishlist import Wishlist
# from .purchased_item import Purchased_Item

class Item(db.Model):
    __tablename__ = 'items'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(50), nullable=False)
    price = db.Column(db.DECIMAL(10, 2), nullable=False)
    size = db.Column(db.Integer, nullable=False)
    stocked = db.Column(db.Boolean, nullable=False)
    previewImg = db.Column(db.String(1000))
    description = db.Column(db.String(1000))

    item_images = db.relationship('ItemImage', back_populates='item', cascade='all, delete')
    reviews = db.relationship('Review', back_populates='item', cascade='all, delete')
    carts = db.relationship('Cart', back_populates='item')
    wishlists = db.relationship('Wishlist', back_populates='item')
    purchased_items = db.relationship('PurchasedItem', back_populates='item')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'color': self.color,
            'price': str(self.price),
            'size': self.size,
            'stocked': self.stocked,
            'previewImg': self.previewImg,
            'description': self.description,
            'carts': [cart.to_dict() for cart in self.carts]
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'color': self.color,
            'price': str(self.price),
            'size': self.size,
            'stocked': self.stocked,
            'previewImg': self.previewImg,
            'description': self.description,
            # 'Item_image': Item_image.query.get(self).to_dict(),
            'Review':[review.to_dict() for review in Review.query.all() if (review.itemId) == (self.id)]

        }
