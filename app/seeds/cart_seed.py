from app.models import db, Cart, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_carts():
    cart1 = Cart(
        userId=1, itemId=1, price=5, quantity=1)
    cart2 = Cart(
        userId=2, itemId=1, price=5, quantity=1)
    cart3 = Cart(
        userId=3, itemId=1, price=5, quantity=1)

    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM carts")

    db.session.commit()
