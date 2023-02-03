import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchAllCarts, fetchCreateCart, fetchDeleteCart } from "../../store/cart";
import LoginFormModal from "../LoginFormModal";
import './index.css'

function CartPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    console.log(currentUser, ' this is current user')
    useEffect(() => {
        dispatch(fetchAllCarts())
    }, [dispatch])

    const currentCart = useSelector(state => state.carts)

    // const carts = Object.values(currentCart)
    const cartItems = useSelector(state => state.carts.items)
    console.log(cartItems[0], '3333333333333333333')
    // console.log(currentUser.id, 'curr user id')
    const currentcartarr = Object.values(currentCart)

    const handleDeleteCartItem = (id) => {
        dispatch(fetchDeleteCart(id))
    }

    if(!currentUser){
        return (
            <>
                <p>You need to be logged in to add items to your cart</p>
                {/* <NavLink to='/'>Sign in here</NavLink> */}
            </>
        )
    }

    if(!cartItems.length){
        return (
            <>
            <p>You dont have any items in your cart yet.</p>
            <NavLink to='/'>Shop here</NavLink>
            </>
        )
    }




    if(!currentCart) return null
    return(
        <>
        <div className="cart-items">
            {currentUser && cartItems.length ? (cartItems.map(item => {
                return (
                    <div>
                        <h1>{item.id}</h1>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        {/* <p>{quantity}</p> */}
                        <img src={item.previewImg} width='100px'></img>
                        <btn onClick={()=>handleDeleteCartItem(item?.id)} className='delete-button'>THIS IS A DELETE BUTTON</btn>

                    </div>
                )
            })) : <p>Sorry you need to be logged in to view your cart.</p>}
        </div>
        {currentUser ? (currentcartarr.map(cart => {
            return (
                <div>
                    <p>{cart.quantity}</p>

                </div>
            )
        })): null}
        </>
    )
}

export default CartPage
