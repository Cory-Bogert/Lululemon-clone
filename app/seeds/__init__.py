from flask.cli import AppGroup
from .users import seed_users, undo_users
from .cart_seed import seed_carts, undo_carts
from .comment_seed import seed_comment, undo_comment
from .item_image_seed import seed_items_images, undo_item_images
from .item_seed import seed_items, undo_items
from .purchased_item_seed import seed_purchased_item, undo_purchased_item
from .review_seed import seed_review, undo_review
from .wishlist_seed import seed_wishlist, undo_wishlist

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_wishlist()
        undo_purchased_item()
        undo_comment()
        undo_review()
        undo_carts()
        undo_item_images()
        undo_items()
        undo_users()
    seed_users()
    seed_items()
    seed_items_images()
    seed_carts()
    seed_review()
    seed_comment()
    seed_purchased_item()
    seed_wishlist()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_carts()
    undo_wishlist()
    undo_comment()
    undo_item_images()
    undo_items()
    undo_purchased_item()
    undo_review()
    # Add other undo functions here
