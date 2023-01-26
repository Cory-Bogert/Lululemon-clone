from app.models import db, Item, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_items():
    item1 = Item(
        name='At-ease shorts', category='Shorts', color='blue', price=78.99, size=2, stocked=True, previewImg='https://images.lululemon.com/is/image/lululemon/LM7AI9S_051860_1?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72', description='This is an amazing description for these awesome expensive shorts')
    item2 = Item(
        name='At-ease shorts2', category='Shorts', color='yellow', price=78.99, size=4, stocked=True, previewImg='https://images.lululemon.com/is/image/lululemon/LM7AI9S_051860_1?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72', description='This is an amazing description for these awesome expensive shorts')
    item3 = Item(
        name='At-ease shorts3', category='Shorts', color='red', price=78.99, size=6, stocked=True, previewImg='https://images.lululemon.com/is/image/lululemon/LM7AI9S_051860_1?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72', description='This is an amazing description for these awesome expensive shorts')

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM items")

    db.session.commit()
