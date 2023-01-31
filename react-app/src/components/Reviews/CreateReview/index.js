import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllReviews, fetchCreateReview } from "../../../store/review";
import { fetchOneItem } from "../../../store/item";


const CreateReview = ({ closeModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')

    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        const errors = []
        if(!description.length){errors.push('Please Provide a Review to post')}
        if(rating < 1 || rating > 5){errors.push('Rating must be between 1 and 5')}

        setValidationErrors(errors)
    }, [description, rating])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const review = {
            rating,
            description
        }
        await dispatch(fetchCreateReview(review, id))
        dispatch(fetchOneItem(id))
        dispatch(getAllReviews(id))
        history.push(`/items/${id}`)
        closeModal()
    }

    return (
        <div className="create-review-container">
            <h1 className="title">Create Review</h1>
            <div>
                {validationErrors.length > 0 && validationErrors.map((error) => <div className="errors-container" key={error}>{error}</div>)}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                placeholder="Leave a review"
                className="input"
                required
                id='description'
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />


            <input
                placeholder="Leave a rating"
                className="input"
                required
                id='rating'
                type="number"
                value={rating}
                onChange={e => setRating(e.target.value)}
            />

            <button className="submit-btn" type="submit" disabled={validationErrors.length>0}>Create Review</button>
            </form>
        </div>
    )
}

export default CreateReview
