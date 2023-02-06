import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { fetchAllItems } from '../../store/item';
import { useEffect } from 'react';
import { getAllReviews } from '../../store/review';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
                    <Link to='/soon'>Women(wip)</Link>
                </span>
                <span className='link-span'>
                    <Link to='/soon'>Men(wip)</Link>
                </span>
                <span className='link-span'>
                    <Link to='/soon'>Accessories(wip)</Link>
                </span>
                <span className='link-span'>
                    <Link to='/soon'>Shoes(wip)</Link>
                </span>
                <span className='link-span'>
                    <Link to='/soon'>Studio(wip)</Link>
                </span>
                <span className='link-span'>
                <Link to='/soon'>Like New(wip)</Link>
                </span>

                {/* <span className='search-bar-container'>
                    <p>Search Bar</p>
                </span> */}
        </div>

        <div className='main-content-container'>
            <img className='main-img' src='https://images.lululemon.com/is/image/lululemon/NA_Feb23_Wk1_DG_ValentinesDay_HP_3_1_D_ValentinesDay?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72' alt='welcome picture'></img>


        </div>
        <div className='items-container'>
            <Carousel infiniteLoop stopOnHover autoPlay showIndicators={false}>
            {items.map(item =>(
                <div className='item-box'>
                    <div className='single-item-deets'>

                    <img src={item.previewImg} alt='preview of item' width='200px'/>
                    <NavLink to={`/items/${item.id}`} className='itemlist-links'>
                    {/* <p>{item.id} ddddd</p> */}

                    <h4>{item.name}</h4>
                    <h4>{item.price}</h4>
                    </NavLink>
                    </div>
                </div>
))}
                </Carousel>
        </div>
        <footer>
            <div className='footer'>
            <div className='each-dev'>
                <div className="dev-img-holder">
                    <img className='img' src='https://media.licdn.com/dms/image/D4E03AQFxAGW_cPRZwQ/profile-displayphoto-shrink_200_200/0/1674225013679?e=1679529600&v=beta&t=W5qXSonUJhsxWL3pVSm_2nDOBGiUqqpm-1umhspVvz0'></img>

                </div>
                <div className='dev-name'>Cory Bogert</div>
                <div className='dev-links'>

                <a href='https://github.com/Cory-Bogert' ><i className="fa fa-github"></i></a>
                <a href='https://www.linkedin.com/in/cory-bogert-754a7a230/'><i className="fa fa-linkedin"></i></a>
                </div>

            </div>
                <p>© 2023 LuluMelon, Inc</p>
            </div>
        </footer>
    </div>
    )
}

export default Landing;
