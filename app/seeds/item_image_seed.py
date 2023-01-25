from app.models import db, ItemImage, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_items_images():
    item_image1 = ItemImage(
        itemId=1, imageUrl='https://images.lululemon.com/is/image/lululemon/LM7AI9S_047104_1?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72')
    item_image2 = ItemImage(
        itemId=2, imageUrl='https://images.lululemon.com/is/image/lululemon/LM7AI9S_047104_1?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72')
    item_image3 = ItemImage(
        itemId=3, imageUrl='https://images.lululemon.com/is/image/lululemon/LM7AI9S_047104_1?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72')

    db.session.add(item_image1)
    db.session.add(item_image2)
    db.session.add(item_image3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_item_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM item_images")

    db.session.commit()
