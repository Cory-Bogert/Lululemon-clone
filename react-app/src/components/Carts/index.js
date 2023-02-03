import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchAllCarts, fetchCreateCart, fetchDeleteCart } from "../../store/cart";
import LoginFormModal from "../LoginFormModal";
import './index.css'

function CartPage() {
    // const { id } = useParams()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(fetchAllCarts())
    }, [dispatch])

    const currentCart = useSelector(state => state.carts)


    // const carts = Object.values(currentCart)
    const cartItems = useSelector(state => state.carts.items)
    console.log(cartItems, ' thiiiiiiiiiiiiiiiiiiiiiiii')
    const currentcartarr = Object.values(currentCart)
    console.log(currentcartarr, ' 00000000000000')


    let subtotalArr = []
    let subtotal = 0
    if(currentcartarr){
        subtotalArr = Object.values(cartItems)
        console.log(subtotalArr)
        subtotalArr.forEach(item => {
            subtotal += parseFloat(item.price)
        })
    }






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
                        <div className="cart-title">
                            {<h1>Nice Pick! <i class="fa-solid fa-bag-shopping"></i> {subtotalArr.length} Items</h1>}
                        </div>
                            <div className="cart-subtotal">
                                <h5>${subtotal}</h5>
                            </div>
            {currentUser && cartItems.length ? (cartItems.map(item => {
                return (
                    <div>

                        <div className="cart-info-container">
                            <div className="cart-img-container">
                                <img src={item.previewImg} width='100px'></img>
                            </div>
                            <div className="cart-info">
                                <h1>{item.name}</h1>
                                <h5>{item.description}</h5>
                                <h5>{item.price}</h5>
                            </div>
                        <btn onClick={()=>handleDeleteCartItem(item?.id)} className='delete-cart-button'>Delete</btn>
                        </div>
                    </div>
                )
            })) : <p>Sorry you need to be logged in to view your cart.</p>}
        </div>
        </>
    )
}

export default CartPage
