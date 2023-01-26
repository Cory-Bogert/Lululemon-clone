import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route, useParams } from 'react-router-dom'
import { fetchAllItems, fetchOneItem } from '../../store/item';
import { useEffect, useState } from 'react';

function SingleItemPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    // console.log(items, '000000000000000')

    useEffect(() => {
        dispatch(fetchOneItem(id))
    }, [dispatch])

    // const oneItem = useSelector(state => state.item)
    const item = useSelector(state => {return state.items[id]})
    console.log(item, 'this is 2nd useSelector')
    // console.log(state, 'stattteee')
    // console.log('---------', oneItem)
    // if(!oneItem) return null

    return (
        <>
        <div>
            {

                    <div>
                        <p>Hello</p>
                        <img src={item.previewImg} width='200px'/>
                        <p>{item.description}</p>
                        {/* <img src={oneItem.previewImg} width='200px'/> */}
                    {/* <NavLink to={`/items/${item.id}`} className='itemlist-links'>

                    <img src={item.previewImg} width='200px'/>
                    <h4>{item.name}</h4>
                    <h4>{item.price}</h4>
                    </NavLink> */}
                    </div>
                    // <p>{item.name}</p>

            }
        </div>

        </>
    )
}

export default SingleItemPage;
