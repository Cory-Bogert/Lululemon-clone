import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route, useParams } from 'react-router-dom'
import { fetchAllItems, fetchOneItem } from '../../store/item';
import { fetchCreateReview, fetchDeleteReview, getAllReviews } from '../../store/review';
import { useEffect, useState } from 'react';
import './index.css'
import CreateReview from '../Reviews/CreateReview';
import CreateReviewModal from '../Reviews/CreateReview/createReviewModal';
import EditFormReview from '../Reviews/EditReview';
import { fetchUpdateReview } from '../../store/review';

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

    let totalRatingArray = []
    let totalRating = 0
    if(reviews){
        totalRatingArray = Object.values(reviews)
        totalRatingArray.forEach(ratings => {
            totalRating += parseInt(ratings.rating)
        })}
        else return null
    let avgRating = totalRating/totalRatingArray.length
    // console.log(avgRating.toFixed(2))







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
                    </div>


                </div>


        <div className='reviews'>
            <div className='review-header'>
                <div className='header-title'>
                    <h2>Reviews</h2>
                </div>
                <div className='header-rating'>
                    <h4>★{avgRating.toFixed(1)}</h4>
                </div>
            </div>
            {reviews.length ? (reviews.map(({id, itemId, description, rating, userId})  =>(
            <div key={id} className='reviewbox'>
            <div className='reviewlist'>
                <h1>review id{id}</h1>
                <h5>user id={userId}</h5>
                <h3 className='reviewlist-details'>★{rating}</h3>
                <p className='reviewlist-details'>{description}</p>
                <p>item id{itemId}</p>
                <button onClick={()=>handleDeleteReview(id)} className='buttons'><i className="fa-solid fa-trash-can" />Delete</button>
                {/* <button onClick={()=>EditFormReview(itemId)} className='buttons'><i className="fa-solid fa-trash-can" />Delete</button> */}


                 { <div className='edit-review'>
                    <EditFormReview review={{id, itemId, description, rating, userId}} />
                </div> }





            </div>
            </div>
            ))) : (<div className='review-form-container'>
                    <div>
                        {item.name} has no reviews yet. Leave a review!
                    </div>
                </div>)}
            <div className='create-review'>
                <CreateReview itemId={id}/>
            </div>

        </div>


        </div>
    )
}

export default SingleItemPage;
