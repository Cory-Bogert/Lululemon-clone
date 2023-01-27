import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom'
import { getAllReviews, fetchDeleteReview } from "../../store/review";
import { fetchOneItem } from "../../store/item";

const AllReviews = () => {
    // const sessionUser = useSelector(state.session.user)
    // console.log(sessionUser, '000000000')
    const dispatch = useDispatch()
    const { itemId } = useParams()
    // const history = useHistory()


    useEffect(() => {
        dispatch(getAllReviews(itemId))
    }, [dispatch, itemId])

    let currItem = useSelector(state => state.items)
    currItem = currItem[itemId]
    const allReviews = useSelector(state => Object.values(state.reviews))
    const reviews = allReviews.filter(review => review.itemId === itemId)
    return (
        <>
            {reviews.map((review) => {
                return (
                    <div>
                        <p>
                    {review.description}
                            </p>
                    </div>
                )
            })}

        </>
    )

}

export default AllReviews
