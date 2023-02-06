import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchAllCarts, fetchCreateCart, fetchDeleteCart } from "../../store/cart";
import Dropdown from "./EditDropdown";
import EditFormCart from "./EditDropdown/EditForm";
import './index.css'

function CartPage() {
    // const { id } = useParams()
    const dispatch = useDispatch()
    const currentCart = useSelector(state => state.carts)
    const cartItems = useSelector(state => state.carts.items)
    const currentUser = useSelector(state => state.session.user)


        useEffect(() => {


        }, [currentCart])

    useEffect(() => {
        dispatch(fetchAllCarts())
    }, [dispatch])

    const currentcartarr = Object.values(currentCart)


    let subtotalArr = []
    let subtotal = 0
    if(currentcartarr){
        subtotalArr = Object.values(cartItems)
        console.log(subtotalArr)
        subtotalArr.forEach(item => {
            const cart = item.carts.find(cart => cart?.userId === currentUser?.id)
            subtotal += parseFloat(item.price) * parseInt(cart.quantity)
        })
    }

    const handleDeleteCartItem = async(e,id) => {
        e.preventDefault()
        await dispatch(fetchDeleteCart(id))
    }




    if(!currentUser){
        return (
            <>
                <p>You need to be logged in to add items to your cart</p>
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
                                <h5>Subtotal ${subtotal.toFixed(2)}</h5>
                            </div>
            {currentUser && cartItems.length ? (cartItems.map(item => {
                const cart = item.carts.find(cart => cart.userId === currentUser.id)
                return (
                    <div className='single-cart-item'>

                        <div className="cart-info-container">
                            <div className="cart-img-container">
                                <NavLink to={`/items/${item.id}`}>

                                <img src={item.previewImg} width='100px'></img>
                                </NavLink>
                            </div>
                            <div className="cart-info">
                                <h1 className="item-name">{item.name}</h1>
                                <h5 className="item-description">{item.description}</h5>
                                <div className="item-dropdown">
                                    <h5 className='item-quantity'>Quantity</h5>
                        {currentUser?.id === cart.userId ? <EditFormCart cartId={cart.id}/> : null}


                                </div>
                                <h5 className="item-price">${item.price} USD</h5>
                                <div className="btn-div">
                                <btn onClick={(e)=>handleDeleteCartItem(e,cart.id)} className='delete-cart-button'>Delete</btn>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })) : <p>Sorry you need to be logged in to view your cart.</p>}
        </div>
        </>
    )
}

export default CartPage
