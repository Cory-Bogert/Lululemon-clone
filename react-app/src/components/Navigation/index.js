import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import DemoUser from '../Demo';
import LogoutButton from '../auth/LogoutButton';
import CartButtonModal from '../Carts/CartButtonModal';
import './index.css'
import SignupFormModal from '../SignupFormModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfileButton from './ProfileButton';


function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user)
    // const sessionLinks = (<ProfileButton className='profile-btn' user={sessionUser}/>)

    return (
        <header>
        <nav className='navbar-container'>
            {/* <div className='logo-container'>


            </div> */}

            <div className='welcome-container'>{sessionUser ? (`Welcome, ${sessionUser.username}!`): ('Welcome to LuluMelon')}</div>
            <div className='logo-name'>
              <a className='logo-name' href='/' class="fa-solid fa-watermelon-slice">LuluMelon
              <FontAwesomeIcon icon="fa-light fa-watermelon-slice" size='2x'/>
                {/* LuluMelon{"fa-solid fa-watermelon-slice"} */}
                {/* <img className='logo-img' src={<i class="fa-solid fa-watermelon-slice"></i>}></img> */}
              </a></div>
            <div className='navbar-right'>
            <div className='btn-container'>
              {sessionUser ? <LogoutButton/> : <LoginFormModal/>}
              {sessionUser ? null : <SignupFormModal/>}
              {sessionUser ? null : <DemoUser/>}
              <CartButtonModal />
            </div>

            <div className='user-container'>
              <div className='profile-dropdown'>
                {isLoaded
                //  && sessionLinks
                 }
              </div>
            </div>
          </div>


        </nav>
      </header>

    )
    }
  export default Navigation
