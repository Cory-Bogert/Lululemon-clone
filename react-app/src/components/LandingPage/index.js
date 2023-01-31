import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchAllItems } from '../../store/item';
import { useEffect } from 'react';
import { getAllReviews } from '../../store/review';
import './index.css'

function Landing() {
    const dispatch = useDispatch()
    const itemsObj = useSelector(state => state.items)
    const items = Object.values(itemsObj)
    // console.log(items, '000000000000000')

    useEffect(() => {
        dispatch(fetchAllItems())
        dispatch(getAllReviews())
    }, [dispatch])

    if(!items) return null

    return (
        <>
        <div className='items-container'>
            {items.map(item =>{
                return (
                    <div>
                    <NavLink to={`/items/${item.id}`} className='itemlist-links'>
                    {/* <p>{item.id} ddddd</p> */}

                    <img src={item.previewImg} alt='preview of item' width='200px'/>
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
