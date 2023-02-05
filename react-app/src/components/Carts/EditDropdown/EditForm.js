import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUpdateCart, fetchAllCarts } from "../../../store/cart";
import './editForm.css'

const EditFormCart = ({cartId}) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const currentCart = useSelector(state => state.carts)
    const curr = Object.values(currentCart).find(cart => cart.id == cartId)


    useEffect(() => {
        dispatch(fetchAllCarts())
    }, [dispatch])


    const [quantity, setQuantity] = useState(curr.quantity)
    const [validationErrors, setValidationErrors] = useState([])
    const updateQuantity = (e) => setQuantity(e.target.value)

    useEffect(() => {
        const errors = []
        if(quantity < 1){errors.push('Qauntity must be at least 1')}
        setValidationErrors(errors)
    }, [quantity])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateCart = {
            ...curr,
            // userId,
            // price,
            quantity,
        }

        await dispatch(fetchUpdateCart(updateCart))
    }

    return (
        <>
                <div>
                    {validationErrors.length > 0 && validationErrors.map((error) => <div className="errors-container" key={error}>{error}</div>)}
                </div>
                <form onSubmit={handleSubmit} >
                    <input
                    className="input"
                    placeholder="Quantity"
                    id="quantity"
                    type="number"
                    required
                    value={quantity}
                    onChange={updateQuantity} />

                <button className='edit-cart-submit-btn' type='submit' disabled={validationErrors.length>0}>Edit</button>
                </form>



        </>
    )

}

export default EditFormCart
