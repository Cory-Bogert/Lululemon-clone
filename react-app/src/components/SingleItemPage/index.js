import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route, useParams } from 'react-router-dom'
import { fetchAllItems, fetchOneItem } from '../../store/item';
import { fetchCreateReview, fetchDeleteReview, getAllReviews } from '../../store/review';
import { useEffect, useState } from 'react';
import './index.css'
import CreateReview from '../Reviews/CreateReview';
// import EditFormReview from '../Reviews/EditReview';
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
    // console.log(item, 'this is 2nd useSelector')

    const itemReviews = useSelector(state => Object.values(state.items))
    // console.log( itemReviews, '---------------')

    const reviewsObj = useSelector(state => state.reviews)
    // console.log(reviewsObj, 'dddddddddddddddddddd')

    const reviews = Object.values(reviewsObj).filter(e => e.itemId == id)
    // console.log(reviews, ' allllll the reviews')




    const handleDeleteReview = (id) => {
        dispatch(fetchDeleteReview(id))
    }

    const EditFormReview = () => {
        // const { id } = useParams()
        
        // console.log(reviewId[0].id, 'dddddddddddddddddddddddddddddddddddddddddd')
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
                {/* <button onClick={()=>EditFormReview(itemId)} className='buttons'><i className="fa-solid fa-trash-can" />Delete</button> */}


                 { <div className='edit-review'>
                    <EditFormReview />
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
