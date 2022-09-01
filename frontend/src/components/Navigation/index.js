// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage/SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <SignupFormModal />
  //     </>
  //   );
  // }

  // return (
  //   <nav className='main-navbar'>
  //     <dvi>
  //       <NavLink exact to="/"> <img className='img' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"} /></NavLink>
  //     </dvi>
  //     <div>
  //       {isLoaded && sessionLinks}
  //     </div>
  //   </nav>

  // );

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
