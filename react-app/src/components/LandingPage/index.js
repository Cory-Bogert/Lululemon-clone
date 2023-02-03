import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { fetchAllItems } from '../../store/item';
import { useEffect } from 'react';
import { getAllReviews } from '../../store/review';
import './index.css'

function Landing() {
    const dispatch = useDispatch()
    const itemsObj = useSelector(state => state.items)
    const items = Object.values(itemsObj)

    useEffect(() => {
        dispatch(fetchAllItems())
        // dispatch(getAllReviews())
    }, [dispatch])

    if(!items) return null
    return (
    <div className='main-container'>
        <div className='categories-navbar'>

                <span className='link-span'>
                    <Link to='/items/1'>Women(wip)</Link>
                </span>
                <span className='link-span'>
                    <Link to='/items/1'>Men(wip)</Link>
                </span>
                <span className='link-span'>
                    <Link to='/items/1'>Accessories(wip)</Link>
                </span>
                <span className='link-span'>
                    <Link to='/items/1'>Shoes(wip)</Link>
                </span>
                <span className='link-span'>
                    <Link to='/items/1'>Studio(wip)</Link>
                </span>
                <span className='link-span'>
                <Link to='/items/1'>Like New(wip)</Link>
                </span>

                {/* <span className='search-bar-container'>
                    <p>Search Bar</p>
                </span> */}
        </div>

        <div className='main-content-container'>
            <img className='main-img' src='https://images.lululemon.com/is/image/lululemon/NA_Feb23_Wk1_DG_ValentinesDay_HP_3_1_D_ValentinesDay?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72' alt='welcome picture'></img>


        </div>
        <div className='items-container'>
            {items.map(item =>(
                <div className='item-box'>


                    <div className='single-item-deets'>
                    <NavLink to={`/items/${item.id}`} className='itemlist-links'>
                    {/* <p>{item.id} ddddd</p> */}

                    <img src={item.previewImg} alt='preview of item' width='200px'/>
                    <h4>{item.name}</h4>
                    <h4>{item.price}</h4>
                    </NavLink>
                    </div>
                </div>

            ))}
        </div>
    </div>
    )
}

export default Landing;
