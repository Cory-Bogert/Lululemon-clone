# LuluMelon
## a lululemon clone
## by Cory Bogert,

## Link to live site:
https://lulumelon.onrender.com/

## Description:
LuluMelon is a clone of the popular clothing brand website of lululemon. On this clone you can create and log in as a user, add and edit items to your cart and currently you can leave a review for any items. In future updates I would like to add the ability to comment to reviews, add a wishlist that interacts with the user cart, and most importantly for any e-commerce site: add a search and filter feature.

## Technologies used:
The backend uses SqlAlchemy and Flask in Python. The frontend uses React and Redux in Javascript.
## Usage description of features.

## Home Page:
A user can signup/login from this page and access the items available on the webiste.


## Single Item page:
This page shows information on a single item and all of the reviews. The user can also add the selected item to their cart while also having the ability to edit/delete their own review.


## Cart Modal:
After adding items to their cart a user can interact with the items by updating the quantity or deleting the item from their cart.

## Get started using my repo locally
Once downloading the repo in the top level run:
pipenv install
pipenv shell
flask db upgrade
flask seed all
flask run

In the frontend folder run:
npm install
npm start


## Contact:
Cory Bogert
https://www.linkedin.com/in/cory-bogert-754a7a230/
https://github.com/Cory-Bogert
