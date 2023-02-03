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
    const reviewsObj = useSelector(state => state.reviews)
    const reviews = Object.values(reviewsObj).filter(e => e.itemId == id)

    const sessionUser = useSelector(state => state.session.user)

    // let allReviewsByCurrent = ''
    // allReviewsByCurrent = (reviews.filter(review => review.userId === sessionUser.id))
    // console.log(allReviewsByCurrent, ' this is slalllllllllllllllllllllllll')
    // let userReviews = ''
    // userReviews = allReviewsByCurrent.find(review => review.userId == id)
    // console.log(userReviews, 'userrrrrrrrrrrrrrrrrrrrrrrrrr')

    // const editButtons = ({id, itemId, title, description, rating, userId}) => {
    //     if(!allReviewsByCurrent.length) return
    //     else if(sessionUser.id == userReviews.userId){
    //         return (
    //             <button onClick={()=>handleDeleteReview(id)} className='delete-button'>Delete</button>,
    //             <EditReviewModal review={{id, itemId, title, description, rating, userId}} />
    //         )
    //     } else {
    //         return null
    //     }
    // }

    // console.log(sessionUser.id, 'this is the session user id')
    // console.log(userReviews.userId, ' this is the all reviews current.userId')
    // console.log(Object.values(allReviewsByCurrent), ' ---------------------------------------')

    // const deleteButtons = ({id, itemId, title, description, rating, userId}) => {
    //     if(!allReviewsByCurrent.length) return
    //     else if(sessionUser.id == userReviews.userId){
    //         return (
    //             <button onClick={()=>handleDeleteReview(id)} className='delete-button'>Delete</button>
    //             // <EditReviewModal review={{id, itemId, title, description, rating, userId}} />
    //         )
    //     } else {
    //         return null
    //     }
    // }

    let totalRatingArray = []
    let totalRating = 0
    if(reviews){
        totalRatingArray = Object.values(reviews)
        totalRatingArray.forEach(ratings => {
            totalRating += parseInt(ratings.rating)
        })}
        else return null
    let avgRating = totalRating/totalRatingArray.length

    const addItemBtn = (itemId, userId, price, quantity) => {
        const payload = {
            itemId,
            userId,
            price,
            quantity: 5
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
                        {sessionUser?.id ? <btn onClick={()=>addItemBtn(item.id, sessionUser.id, item.price)} className='delete-button'>Add</btn> : null}



                        <span>{item.name}</span>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        {/* <p> <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
  /></p> */}
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
                    {/* <button onClick={()=>handleDeleteReview(id)} className='create-review-btn'>WRITE A REVIEW</button> */}
                    <CreateReviewModal itemId={id} />

                    {/* <CreateReview itemId={id} /> */}
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

                <div className='edit-review'>
                {/* {deleteButtons({id})}
                {editButtons({id, itemId, title, description, rating, userId})} */}

                </div>

                {sessionUser?.id === userId ?(
                  <div className='edit-review'>
                    {/* <EditFormReview review={{id, itemId, description, rating, userId}} /> */}
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
