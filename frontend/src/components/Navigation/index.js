// frontend/src/components/Navigation/index.js
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import staybnbLogo from './Images/staybnbLogo.png'
import staybnbText from './Images/staybnbText.png'
import './Navigation.css';


function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className='main-navbar'>
      <div className='home-button-container'>
        <NavLink exact to="/"> <img className='logo' src={staybnbLogo} /></NavLink>
        <NavLink exact to="/"> <img className='text' src={staybnbText} /> </NavLink>
      </div>
      {isLoaded && (
        <div className='right-profile-container'>
          <ProfileButton user={sessionUser} isLoaded={isLoaded} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
