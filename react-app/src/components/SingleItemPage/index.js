import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route, useParams } from 'react-router-dom'
import { fetchAllItems, fetchOneItem } from '../../store/item';
import { useEffect, useState } from 'react';
import './index.css'

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

            {
                <div className='wrapper-container'>
                    <div className='single-img-container'>
                        <img className='img' src={item.previewImg} />
                    </div>
                    <div className='single-item-details'>



                        <span>{item.name}</span>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                    </div>

                </div>


            }


        </>
    )
}

export default SingleItemPage;
