import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route, useParams } from 'react-router-dom'
import { fetchAllItems, fetchOneItem } from '../../store/item';
import { fetchDeleteReview, getAllReviews } from '../../store/review';
import { useEffect, useState } from 'react';
import './index.css'
import CreateReview from '../Reviews/CreateReview';

function SingleItemPage() {
    const { id } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchAllItems())
        dispatch(fetchOneItem(id))
        dispatch(getAllReviews(id))
    }, [dispatch, id])


    const item = useSelector(state => {return state.items[id]})
    console.log(item, 'this is 2nd useSelector')

    const itemReviews = useSelector(state => Object.values(state.items))
    console.log( itemReviews, '---------------')

    const reviewsObj = useSelector(state => state.reviews)

    const reviews = Object.values(reviewsObj).filter(e => e.itemId == id)
    console.log(reviews, ' allllll the reviews')

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
            {reviews.length ? (reviews.map(({id, itemId, description, rating, userId})  =>(
            <div key={id} className='reviewbox'>
            <div className='reviewlist'>
                <h1>review id{id}</h1>
                <h5>user id={userId}</h5>
                <h3 className='reviewlist-details'>★{rating}</h3>
                <p className='reviewlist-details'>{description}</p>
                <p>item id{itemId}</p>
                <button onClick={()=>handleDeleteReview(id)} className='buttons'><i className="fa-solid fa-trash-can" />Delete</button>




            </div>
            </div>
            ))) : (<div className='review-form-container'>
                    <div>
                        {item.name} has no reviews yet. Leave a review!
                    </div>
                </div>)}
            <div className='create-review'>
                <CreateReview />
            </div>

        </div>


        </div>
    )
}

export default SingleItemPage;
