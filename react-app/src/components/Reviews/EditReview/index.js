import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchOneItem } from '../../../store/item';
import { fetchUpdateReview, getAllReviews } from '../../../store/review';

const EditFormReview = ({review}) => {
    const dispatch = useDispatch()

    // const tempReview = useSelector(state=> Object.values(state.reviews))
    // console.log(tempReview, 'this is the id from editform review')

    // const currReview = tempReview.find(review => review.id === id)
    // console.log(currReview, 'dal;kdjslslslslsllss')


    // const currReview = useSelector(state => state.reviews[reviewId])
    // console.log(currReview, 'this is currrrent')
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')

    const updateDescription = (e) => setDescription(e.target.value)
    const updateRating = (e) => setRating(e.target.value)




    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateReview = {
            id:review.id,
            rating,
            description
        }

        await dispatch(fetchUpdateReview(updateReview))
        // await dispatch(fetchOneItem(id))
    }

    return (
        <form onSubmit={handleSubmit}>
             <input
            className='input'
            placeholder="Description"
            id="description"
            type="text"
            required
            value={description}
            onChange={updateDescription} />

            <input
            className='input'
            placeholder="Leave a rating"
            id="rating"
            type="number"
            required
            value={rating}
            onChange={updateRating} />

            <button className='submit-btn' type='submit'>Edit Review</button>
            </form>
    )
    }
    export default EditFormReview



