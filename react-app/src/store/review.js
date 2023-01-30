//action types
const READ_REVIEWS = 'reviews/READ_REVIEWS'
// const READ_SINGLE_REVIEW = 'reviews/READ_SINGLE_REVIEW'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

//action creators
const getItemReviews = ({Reviews}) => ({
    type: READ_REVIEWS,
    Reviews
})

// const getOneReview = (review) => ({
//     type: READ_SINGLE_REVIEW,
//     review
// })

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const editReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})

const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    id
})

//thunks
export const getAllReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews`)
    if(response.ok){
        const reviewList = await response.json()
        dispatch(getItemReviews(reviewList))
    }
    // if(response.status>=400) throw response
}

export const fetchCreateReview = (review, itemId) => async dispatch => {
    const response = await fetch(`/api/items/${itemId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    if(response.ok){
        const newReview = await response.json()
        dispatch(createReview(newReview))
        return newReview
    }
    if(response.status>=400) throw response
}

export const fetchUpdateReview = (review, itemId) => async dispatch => {
    const response = await fetch(`/api/reviews/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    if(response.ok){
        const editedReview = await response.json()
        dispatch(editReview(editedReview))
        return editedReview
    }
    if(response.status>=400) throw response
}

export const fetchDeleteReview = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(deleteReview(id))
        return response
    }
    if(response.status>=400) throw response
}

//reducer
const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_REVIEWS:
            newState={...state}
            action.Reviews.forEach((review) => {
                newState[review.id] = review
            })
            return newState

        case CREATE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState

        case UPDATE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState

        case DELETE_REVIEW:
            newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state
    }
}

export default reviewsReducer
