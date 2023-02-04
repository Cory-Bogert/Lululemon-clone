import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchAllCarts, fetchCreateCart, fetchDeleteCart } from "../../store/cart";
import Dropdown from "./EditDropdown";
import './index.css'

function CartPage() {
    // const { id } = useParams()
    const dispatch = useDispatch()
    const currentCart = useSelector(state => state.carts)
    const cartItems = useSelector(state => state.carts.items)
    const currentUser = useSelector(state => state.session.user)


        useEffect(() => {
            console.log('is this working')

        }, [currentCart])

    useEffect(() => {
        dispatch(fetchAllCarts())
    }, [dispatch])

    // const carts = Object.values(currentCart)
    // console.log(cartItems, ' thiiiiiiiiiiiiiiiiiiiiiiii')
    const currentcartarr = Object.values(currentCart)
    // console.log(currentcartarr, ' 00000000000000')

    let subtotalArr = []
    let subtotal = 0
    if(currentcartarr){
        subtotalArr = Object.values(cartItems)
        console.log(subtotalArr)
        subtotalArr.forEach(item => {
            const cart = item.carts.find(cart => cart.userId === currentUser.id)
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
                                <h5>Subtotal ${subtotal}</h5>
                            </div>
            {currentUser && cartItems.length ? (cartItems.map(item => {
                const cart = item.carts.find(cart => cart.userId === currentUser.id)
                console.log(cart)
                return (
                    <div>

                        <div className="cart-info-container">
                            <div className="cart-img-container">
                                <img src={item.previewImg} width='100px'></img>
                            </div>
                            <div className="cart-info">
                                <h1 className="item-name">{item.name}</h1>
                                <h5 className="item-description">{item.description}</h5>
                                <div className="item-dropdown">
                                <h5 className='item-quantity'>{cart.quantity}</h5>
                                    <Dropdown placeHolder={cart.quantity}/>
                                </div>
                                <h5 className="item-price">${item.price} USD</h5>
                                <div className="btn-div">
                                <btn onClick={(e)=>handleDeleteCartItem(e,cart.id)} className='delete-cart-button'>Delete</btn>
                                </div>
                            </div>
                            {/* {currentUser && currentcartarr.length ? (currentcartarr.map(cart=>{
                                return (

                                    <btn onClick={(e)=>handleDeleteCartItem(e,cart?.id)} className='delete-cart-button'>Deleteeeeeee</btn>
                                    )
                            })): null} */}
                        </div>
                    </div>
                )
            })) : <p>Sorry you need to be logged in to view your cart.</p>}
        </div>
        </>
    )
}

export default CartPage
