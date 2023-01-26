from app.models import db, PurchasedItem, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_purchased_item():
    purchased_item1 = PurchasedItem(
        userId=1, itemId=1)
    purchased_item2 = PurchasedItem(
        userId=2, itemId=2)
    purchased_item3 = PurchasedItem(
        userId=3, itemId=3)

    db.session.add(purchased_item1)
    db.session.add(purchased_item2)
    db.session.add(purchased_item3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_purchased_item():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.purchased_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM purchased_items")

    db.session.commit()
