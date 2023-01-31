import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchOneItem } from '../../../store/item';
import { useModal } from '../../../context/Modal';
import { fetchUpdateReview, getAllReviews } from '../../../store/review';


const EditFormReview = ({review}) => {
    const dispatch = useDispatch()
    // const { closeModal } = useModal()

    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    const updateDescription = (e) => setDescription(e.target.value)
    const updateRating = (e) => setRating(e.target.value)

    useEffect(() => {
        const errors = []
        if(!description.length){errors.push('Please Provide a Review to update')}
        if(rating < 1 || rating > 5){errors.push('Rating must be between 1 and 5')}

        setValidationErrors(errors)
    }, [description, rating])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateReview = {
            id:review.id,
            rating,
            description
        }

        await dispatch(fetchUpdateReview(updateReview))
        // closeModal()
        // await dispatch(fetchOneItem(id))
    }

    return (
        <div className='edit-review-container'>

    <div>
        {validationErrors.length > 0 && validationErrors.map((error) => <div className="errors-container" key={error}>{error}</div>)}
    </div>
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

            <button className='submit-btn' type='submit' disabled={validationErrors.length>0}>Edit Review</button>
            </form>
        </div>
    )
    }
    export default EditFormReview
