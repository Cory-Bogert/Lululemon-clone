from app.models import db, Wishlist, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_wishlist():
    wishlist1 = Wishlist(
        userId=1, itemId=1)
    wishlist2 = Wishlist(
        userId=2, itemId=2)
    wishlist3 = Wishlist(
        userId=3, itemId=3)

    db.session.add(wishlist1)
    db.session.add(wishlist2)
    db.session.add(wishlist3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_wishlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM wishlists")

    db.session.commit()
