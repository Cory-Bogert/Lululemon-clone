//action types
const READ_CARTS = 'carts/READ_CARTS'
// const READ_CART = 'carts/READ_CART'
const CREATE_CART = 'carts/CREATE_CART'
const UPDATE_CART = 'carts/UPDATE_CART'
const DELETE_CART = 'carts/DELETE_CART'

//action creators
const getAllCarts = ({Carts}) => ({
    type: READ_CARTS,
    Carts
})

// const getCart = (cart) => ({
//     type: READ_CART,
//     cart
// })

const createCart = (cart) => ({
    type: CREATE_CART,
    cart
})

const editCart = (cart) => ({
    type: UPDATE_CART,
    cart
})

const deleteCart = (ids) => ({
    type: DELETE_CART,
    ids
})

//thunks
export const fetchAllCarts = () => async dispatch => {
    const response = await fetch(`/api/carts`);
    if(response.ok){
        const cartsList = await response.json()
        dispatch(getAllCarts(cartsList))
    }
}

// export const fetchCart = () => async dispatch => {
//     const response = await fetch(`/api/carts/current`)
//     if(response.ok){
//         const cartList = await response.json()
//         dispatch(getCart(cartList))
//     }

// }

// export const fetchItemReviews = (itemId) => async dispatch => {
//     const response = await fetch(`/api/items/${itemId}/reviews`)
//     if(response.ok){
//         const reviewList = await response.json()
//         dispatch(getItemReviews(reviewList))
//     }
// }

export const fetchCreateCart = (cart) => async dispatch => {
    const response = await fetch(`/api/carts/add`, {
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
        const data = await response.json()
        dispatch(deleteCart(data))
        return response
    }
    if(response.status>=400) throw response
}

//reducer
const initialState = {items:[]}

const cartsReducer = (state = initialState, action) => {
    let newState = {items:[]};
    switch(action.type){
        case READ_CARTS:
            // newState={...state}
            action.Carts.forEach((cart) => {
                newState[cart.id] = cart;
                newState.items.push(cart.Item)
            })
            return newState

        // case READ_CART:
        //     newState={...state}
        //     newState[action.cart.id] = action.cart
        //     return newState

        case CREATE_CART:
            newState = {...state, items:[...state.items]}
            newState[action.cart.id] = action.cart
            newState.items.push(action.cart.Item)
            return newState

        case UPDATE_CART:
            newState = {...state, items:[...state.items]}
            newState[action.cart.id] = action.cart
            newState.items.push(action.cart.Item)
            return newState

        case DELETE_CART:
            newState = {...state, items:state.items.filter(item=> item.id !== action.ids.itemId)}
            delete newState[action.ids.cartId]
            return newState

        default:
            return state
    }
}

export default cartsReducer
