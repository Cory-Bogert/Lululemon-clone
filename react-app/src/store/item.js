//action types
const READ_ITEMS = 'items/READ_ITEMS'
const READ_SINGLE_ITEM = 'items/READ_SINGLE_ITEM'


const getAll = ({Items}) => ({
    type: READ_ITEMS,
    Items
})

const getOne = (item) => ({
    type: READ_SINGLE_ITEM,
    item
})

//thunks
export const fetchAllItems = () => async dispatch => {
    const response = await fetch(`/api/items`);
    if(response.ok){
        const itemList = await response.json()
        dispatch(getAll(itemList))
    }
    if(response.status>=400) throw response
}

export const fetchOneItem = (itemId) => async dispatch => {
    const response = await fetch(`/api/items/${itemId}`)
    if(response.ok){
        const singleItem = await response.json()
        dispatch(getOne(singleItem))
    }
    if(response.status>=400) throw response
}

//reducer
const initalState = {}
const itemsReducer = (state = initalState, action) => {
    let newState;
    switch(action.type){
        case READ_ITEMS:
            newState={...state}
            action.Items.forEach(item => {
                newState[item.id] = item
            })
            return newState

        case READ_SINGLE_ITEM:
            newState = {...state}
            newState[action.item.id] = action.item
            return newState

        default:
            return state
    }
}

export default itemsReducer
