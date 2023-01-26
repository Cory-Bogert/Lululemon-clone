import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route } from 'react-router-dom'
import { fetchAllItems, fetchOneItem } from '../../store/item';
import { useEffect, useState } from 'react';

function Landing() {
    const dispatch = useDispatch()
    const itemsObj = useSelector(state => state.items)
    const items = Object.values(itemsObj)
    console.log(items, '000000000000000')

    useEffect(() => {
        dispatch(fetchAllItems())
    }, [dispatch])

    if(!items) return null

    return (
        <>
        <div>
            {items.map(item =>{
                return (
                    <div>
                    <NavLink to={`/items/${item.id}`} className='itemlist-links'>
                    {/* <p>{item.id} ddddd</p> */}

                    <img src={item.previewImg} width='200px'/>
                    <h4>{item.name}</h4>
                    <h4>{item.price}</h4>
                    </NavLink>
                    </div>
                    // <p>{item.name}</p>
                    )
            })}
        </div>

        </>
    )
}

export default Landing;
