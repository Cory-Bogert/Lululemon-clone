import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchOneItem } from '../../../store/item';
import { useModal } from '../../../context/Modal';
import { fetchUpdateReview, getAllReviews } from '../../../store/review';
import './index.css'


const EditFormReview = ({review}) => {
    const dispatch = useDispatch()
    // const { closeModal } = useModal()
    const currentUser = useSelector(state => state.session.user)
    // console.log(currentUser, 'current user------------------------------')

    const allReviews = useSelector(state => Object.values(state.reviews))
    // console.log(allReviews, ' this is all the reviews ')
    let currReview = allReviews.find(review => review.userId == currentUser.id)
    // console.log(currReview, 'THIS IS THE CURRENT USERS REVIEWS')

    const [title, setTitle] = useState(currReview.title)
    const [rating, setRating] = useState(currReview.rating)
    const [description, setDescription] = useState(currReview.description)
    const [validationErrors, setValidationErrors] = useState([])

    const updateTitle = (e) => setTitle(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updateRating = (e) => setRating(e.target.value)

    useEffect(() => {
        const errors = []
        if(title.length > 40){errors.push('Please provide a title with less than 40 characters')}
        if(!title.length){errors.push('Please provide a title')}
        if(!description.length){errors.push('Please provide a Review to update')}
        if(description.length > 255){errors.push('Please provide a description with less than 255 characters')}
        if(rating < 1 || rating > 5){errors.push('Rating must be between 1 and 5')}

        setValidationErrors(errors)
    }, [description, rating, title])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateReview = {
            id:review.id,
            title,
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
        <label htmlFor='title'>Title</label>
            <input
            className='input'
            placeholder="Title"
            name="title"
            id="title"
            type="text"
            required
            value={title}
            onChange={updateTitle} />

            <label htmlFor='description'>Description</label>
            <input
            className='input'
            name='description'
            placeholder="Description"
            id="description"
            type="text"
            required
            value={description}
            onChange={updateDescription} />
            
            <label htmlFor='rating'>Rating</label>
            <input
            className='input'
            placeholder="Leave a rating"
            name='rating'
            id="rating"
            type="number"
            required
            value={rating}
            onChange={updateRating} />

            <button className='edit-submit-btn' type='submit' disabled={validationErrors.length>0}>Edit Review</button>
            </form>
        </div>
    )
    }
    export default EditFormReview
