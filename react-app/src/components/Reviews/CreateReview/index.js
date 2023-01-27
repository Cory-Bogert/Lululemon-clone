import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllReviews, fetchCreateReview } from "../../../store/review";
import { fetchOneItem } from "../../../store/item";

const CreateReview = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    console.log('this is the id coming back', id)

    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')

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
    }

    return (
        <div className="create-review-container">
            <h1 className="title">Create Review</h1>
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

            <button className="submit-btn" type="submit">Create Review</button>
            </form>
        </div>
    )
}

export default CreateReview
