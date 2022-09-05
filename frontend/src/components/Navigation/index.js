// frontend/src/components/Navigation/index.js
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className='main-navbar'>
      <div>
        <NavLink exact to="/"> <img className='img' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"} /></NavLink>
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
