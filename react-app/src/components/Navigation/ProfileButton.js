import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import DemoUser from '../Demo';
import LogoutButton from '../auth/LogoutButton';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user)
    // const sessionLinks = ()

    return (
        <header>
        <nav className='navbar-container'>
          <div className='logo-container'>

            <div className='logo-name'><NavLink className='logo-name' exact to='/'>LuluMelon</NavLink></div>
            </div>

            <div className='welcome-container'>{sessionUser ? (`Welcome, ${sessionUser.username}!`): ('Welcome to LuluMelon')}</div>
            <div className='navbar-right'>
            <div className='create-spot'>
              <LoginFormModal />
              <DemoUser />
              <LogoutButton />
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
