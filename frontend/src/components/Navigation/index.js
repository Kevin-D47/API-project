// frontend/src/components/Navigation/index.js
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { searchAllSpotThunk } from '../../store/search';

import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar';

import staybnbLogo from './Images/staybnbLogo.png'
import staybnbText from './Images/staybnbText.png'

import './Navigation.css';


function Navigation({ isLoaded }) {

  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(searchAllSpotThunk())
  })

  return (
    <nav className='main-navbar'>
      <div className='home-button-container'>
        <NavLink exact to="/"> <img className='logo' src={staybnbLogo} /></NavLink>
        <NavLink exact to="/"> <img className='text' src={staybnbText} /> </NavLink>
      </div>
      {isLoaded && (
        <>
          <div>
            <SearchBar />
          </div>
          <div>
            <ProfileButton user={sessionUser} isLoaded={isLoaded} />
          </div>
        </>

      )}
    </nav>
  );
}

export default Navigation;
