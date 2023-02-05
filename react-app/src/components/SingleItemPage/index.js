import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route, useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import { render } from 'react-dom';
import { fetchAllItems, fetchOneItem } from '../../store/item';
import { fetchCreateReview, fetchDeleteReview, getAllReviews } from '../../store/review';
import { useEffect, useState } from 'react';
import './index.css'
import CreateReview from '../Reviews/CreateReview';
import CreateReviewModal from '../Reviews/CreateReview/createReviewModal';
import EditFormReview from '../Reviews/EditReview';
import EditReviewModal from '../Reviews/EditReview/EditReviewModal';
import { fetchAllCarts, fetchCreateCart } from '../../store/cart';
import CartButtonModal from '../Carts/CartButtonModal';
// import { fetchUpdateReview } from '../../store/review';

function SingleItemPage() {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllItems())
        dispatch(fetchOneItem(id))
        dispatch(getAllReviews(id))
        dispatch(fetchAllCarts())
        // dispatch(fetchCart(1))
    }, [dispatch, id])

    const item = useSelector(state => {return state.items[id]})
    console.log(item, ' this is the item')
    const reviewsObj = useSelector(state => state.reviews)
    const reviews = Object.values(reviewsObj).filter(e => e.itemId == id)
    console.log(Object.values(reviews),' this is all the reviews')

    const sessionUser = useSelector(state => state.session.user)
    const currentCart = useSelector(state => state.carts)
    const cartItems = useSelector(state => state.carts.items)
    const currentcartarr = Object.values(currentCart)
    console.log(currentcartarr, ' current cart arrrrrr')

    const allCartItemsIds = (Object.values(currentcartarr)).filter(qqq => qqq.itemId == item?.id)
    console.log(allCartItemsIds, 'qqqqqqqqqqqqqqqqqqqqqqqqq')


    let totalRatingArray = []
    let totalRating = 0
    if(reviews){
        totalRatingArray = Object.values(reviews)
        totalRatingArray.forEach(ratings => {
            totalRating += parseInt(ratings.rating)
        })}
        else return null
    let avgRating = totalRating/totalRatingArray.length

    const userReviewsExist = (reviews).filter(review => review.userId == sessionUser?.id)
    // console.log(userReviewsExist, ' this is the new result')

    const addItemBtn = (itemId, userId, price, quantity) => {
        const payload = {
            itemId,
            userId,
            price,
            quantity: 1
        }
        if(allCartItemsIds.length){
            // console.log('THIS IS WORKING')
        }
        dispatch(fetchCreateCart(payload))
    }



    const handleDeleteReview = (id) => {
        dispatch(fetchDeleteReview(id))
    }

    if(!item || !reviews ) return null

    return (
        <div>
                <div className='wrapper-container'>
                    <div className='single-img-container'>
                        <img className='img' src={item.previewImg} />
                    </div>

                    <div className='single-item-details'>
                        <span className='link-span'>
                        <Link  to='/'>
                            {item.category}
                        </Link>
                        </span>
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>
                        <p>${item.price} USD</p>
                    </div>
                    <div className='btn-container'>

                        {sessionUser?.id && !allCartItemsIds.length ? <btn onClick={()=>addItemBtn(item.id, sessionUser.id, item.price)} className='add-cart-button'>Add to Cart</btn> : null}
                    </div>


                </div>


        <div className='reviews'>
            <div className='review-header'>
                <div className='header-title'>
                    <p>Reviews</p>
                </div>
                <div className='header-rating'>
                    <div className='header-avgrating'>
                    {avgRating <= 1 && <h3>{avgRating.toFixed(1)}<i class="fa-solid fa-star"></i></h3>}
                    {avgRating > 1 && avgRating <= 2 && <h3>{avgRating.toFixed(1)}<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                    {avgRating > 2 && avgRating <= 3 && <h3>{avgRating.toFixed(1)}<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                    {avgRating > 3 && avgRating <= 4 && <h3>{avgRating.toFixed(1)}<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                    {avgRating > 4 && avgRating <= 5 && <h3>{avgRating.toFixed(1)}<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                    </div>
                    <div className='header-avgrating-text'>
                    <p>Based on {totalRatingArray.length} Reviews</p>
                    </div>
                </div>
                <div className='create-review-btn-top'>

                {!userReviewsExist.length ? <CreateReviewModal itemId={id}/> :  <p>You have already left a review for this item</p>}

                </div>
            </div>
            {reviews.length ? (reviews.map(({id, itemId, title, description, rating, userId})  =>(

            <div key={id} className='reviewbox'>
            <div className='reviewlist'>
                <h1>{userId}UserName</h1>
                <h2>{title}</h2>
                {/* <h3 className='reviewlist-details'>{rating}★</h3> */}
                {rating === 1 && <h3><i class="fa-solid fa-star"></i></h3>}
                {rating === 2 && <h3><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                {rating === 3 && <h3><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                {rating === 4 && <h3><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                {rating === 5 && <h3><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                <p className='reviewlist-details'>{description}</p>


                {sessionUser?.id === userId ?(
                  <div className='edit-review'>
                    <button onClick={()=>handleDeleteReview(id)} className='delete-button'>Delete</button>
                    <EditReviewModal review={{id, itemId, title, description, rating, userId}} />
                </div> ): null}





            </div>
            </div>
            ))) : (<div className='review-form-container'>
                    <div>
                        {item.name} has no reviews yet. Leave a review!
                    </div>
                </div>)}
            {/* <div className='create-review'>
                <CreateReview itemId={id}/>
            </div> */}

        </div>


        </div>
    )
}

export default SingleItemPage;
