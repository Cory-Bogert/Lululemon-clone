import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchOneItem } from '../../../store/item';
import { fetchUpdateReview, getAllReviews } from '../../../store/review';

const EditFormReview = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')

    const updateDescription = (e) => setDescription(e.target.value)
    const updateRating = (e) => setRating(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateRevew = {
             rating,
             description
        }

        await dispatch(fetchUpdateReview(updateRevew, id))
        await dispatch(fetchOneItem(id))
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






























    // const dispatch = useDispatch()
    // const id = useParams()


    // const reviewTest = async () => {
    //     // const allItems = await dispatch(fetchAllItems())
    //     // const oneItem = await dispatch(fetchOneItem(id))
    //     // const reviewByItemId = await dispatch(getAllReviews(id))
    // }

    // // useEffect(() => {
    // //     reviewTest()
    // // }, [dispatch, id])

    // const reviewsObj = useSelector(state => state.reviews)

    // const reviews = Object.values(reviewsObj).filter(e => e.itemId == id)
    // console.log(reviews, 'jjjjjjjjjjjjjjjjjjj')

    // const [description, setDescription] = useState(reviews.description)
    // const [rating, setRating] = useState(reviews.rating)

    // const updateDescription = (e) => setDescription(e.target.value)
    // const updateRating = (e) => setRating(e.target.value)

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const payload = {
    //         ...reviews,
    //         description,
    //         rating
    //     }
    //     // return dispatch(fetchUpdateReview(payload)).then(async (response) => {
    //     //     dispatch(fetchOneItem(id))
    //     // })
    // }


    //     return (
    //         <form onSubmit={handleSubmit}>
    //     <input
    //     className='input'
    //     placeholder="Description"
    //     id="description"
    //     type="text"
    //     required
    //     value={description}
    //     onChange={updateDescription} />

    //     <input
    //     className='input'
    //     placeholder="Leave a rating"
    //     id="rating"
    //     type="number"
    //     required
    //     value={rating}
    //     onChange={updateRating} />

    //     <button className='submit-btn' type='submit'>Edit Review</button>
    //     </form>
    //     )
    // }



    // const [description, setDescription] = useState(reviews.description)
    // const [rating, setRating] = useState(reviews.rating)

    // const updateDescription = (e) => setDescription(e.target.value)
    // const updateRating = (e) => setRating(e.target.value)

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const payload = {
    //         ...reviews,
    //         description,
    //         rating
    //     }

    //     return dispatch(fetchUpdateReview(payload)).then( response => {
    //         dispatch(getAllReviews(id))
    //     })
    // }

    // return (
        // <p> hi</p>
        // <>
        // <form onSubmit={handleSubmit}>
        // <input
        // className='input'
        // placeholder="Description"
        // id="description"
        // type="text"
        // required
        // value={description}
        // onChange={updateDescription} />

        // <input
        // className='input'
        // placeholder="Leave a rating"
        // id="rating"
        // type="number"
        // required
        // value={rating}
        // onChange={updateRating} />

        // <button className='submit-btn' type='submit'>Edit Review</button>
        // </form>
        // </>
    // )
// }
