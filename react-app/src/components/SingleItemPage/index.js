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
// import { fetchUpdateReview } from '../../store/review';

function SingleItemPage() {
    const { id } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchAllItems())
        dispatch(fetchOneItem(id))
        dispatch(getAllReviews(id))
    }, [dispatch, id])


    const item = useSelector(state => {return state.items[id]})
    // const itemReviews = useSelector(state => Object.values(state.items))

    const reviewsObj = useSelector(state => state.reviews)
    const reviews = Object.values(reviewsObj).filter(e => e.itemId == id)
    // console.log(reviews)
    const sessionUser = useSelector(state => state.session.user)

    let totalRatingArray = []
    let totalRating = 0
    if(reviews){
        totalRatingArray = Object.values(reviews)
        totalRatingArray.forEach(ratings => {
            totalRating += parseInt(ratings.rating)
        })}
        else return null
    let avgRating = totalRating/totalRatingArray.length

    console.log(sessionUser, ' this is session user')





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
            {reviews.length ? (reviews.map(({id, itemId, description, rating, userId})  =>(
            <div key={id} className='reviewbox'>
            <div className='reviewlist'>
                <h1>{userId}UserName</h1>
                {/* <h3 className='reviewlist-details'>{rating}★</h3> */}
                {rating === 1 && <h3><i class="fa-solid fa-star"></i></h3>}
                {rating === 2 && <h3><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                {rating === 3 && <h3><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                {rating === 4 && <h3><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                {rating === 5 && <h3><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h3>}
                <p className='reviewlist-details'>{description}</p>


                 {sessionUser.id === userId ?(
                  <div className='edit-review'>
                    <EditFormReview review={{id, itemId, description, rating, userId}} />
                    <button onClick={()=>handleDeleteReview(id)} className='buttons'><i className="fa-solid fa-trash-can" />Delete</button>
                    {/* <EditReviewModal review={{id, itemId, description, rating, userId}} /> */}
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
