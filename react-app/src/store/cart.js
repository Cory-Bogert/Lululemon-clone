//action types
const READ_CART = 'reviews/READ_CART'
const CREATE_CART = 'reviews/CREATE_CART'
const UPDATE_CART = 'reviews/UPDATE_CART'
const DELETE_CART = 'reviews/DELETE_CART'

//action creators
const getCart = ({Cart}) => ({
    type: READ_CART,
    Cart
})

// const getOneReview = (review) => ({
//     type: READ_SINGLE_REVIEW,
//     review
// })

const createCart = (cart) => ({
    type: CREATE_CART,
    cart
})

const editCart = (cart) => ({
    type: UPDATE_CART,
    cart
})

const deleteCart = (id) => ({
    type: DELETE_CART,
    id
})

//thunks
export const fetchCart = (userId) => async dispatch => {
    const response = await fetch(`/api/carts/${userId}`)
    if(response.ok){
        const cartList = await response.json()
        dispatch(getCart(cartList))
    }
    // if(response.status>=400) throw response
}

// export const fetchItemReviews = (itemId) => async dispatch => {
//     const response = await fetch(`/api/items/${itemId}/reviews`)
//     if(response.ok){
//         const reviewList = await response.json()
//         dispatch(getItemReviews(reviewList))
//     }
// }

export const fetchCreateCart = (cart, itemId) => async dispatch => {
    const response = await fetch(`/api/items/${itemId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
    if(response.ok){
        const newCart = await response.json()
        dispatch(createCart(newCart))
        return newCart
    }
    if(response.status>=400) throw response
}

export const fetchUpdateCart = (cart) => async dispatch => {
    const response = await fetch(`/api/carts/${cart.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
    if(response.ok){
        const editedCart = await response.json()
        dispatch(editCart(editedCart))
        return editedCart
    }
    if(response.status>=400) throw response
}

export const fetchDeleteCart = (id) => async dispatch => {
    const response = await fetch(`/api/carts/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(deleteCart(id))
        return response
    }
    if(response.status>=400) throw response
}

//reducer
const initialState = {}

const cartsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_CART:
            newState={...state}
            action.Carts.forEach((cart) => {
                newState[cart.id] = cart
            })
            return newState

        case CREATE_CART:
            newState = {...state}
            newState[action.cart.id] = action.cart
            return newState

        case UPDATE_CART:
            newState = {...state}
            newState[action.cart.id] = action.cart
            return newState

        case DELETE_CART:
            newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state
    }
}

export default cartsReducer
