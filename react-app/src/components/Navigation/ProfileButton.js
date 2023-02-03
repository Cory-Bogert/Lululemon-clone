import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import DemoUser from '../Demo';
import LogoutButton from '../auth/LogoutButton';
import CartButtonModal from '../Carts/CartButtonModal';
import './index.css'
import SignupFormModal from '../SignupFormModal';


function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user)
    // const sessionLinks = ()

    return (
        <header>
        <nav className='navbar-container'>
            {/* <div className='logo-container'>


            </div> */}

            <div className='welcome-container'>{sessionUser ? (`Welcome, ${sessionUser.username}!`): ('Welcome to LuluMelon')}</div>
            <div className='logo-name'>
              <NavLink className='logo-name' exact to='/'>
                LuluMelon
                {/* <img className='logo-img' src={<i class="fa-solid fa-watermelon-slice"></i>}></img> */}
              </NavLink></div>
            <div className='navbar-right'>
            <div className='btn-container'>
              <LoginFormModal />
              <SignupFormModal />
              <DemoUser />
              <LogoutButton />
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
