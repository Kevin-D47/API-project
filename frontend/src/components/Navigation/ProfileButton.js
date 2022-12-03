// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal/index'
import SignUpFormModal from '../SignupFormPage/SignupFormModal'
import icon from './Images/icon.svg'
import hamburger from './Images/hamburgerIcon.svg'
import './ProfileButton.css'


function ProfileButton({ user, isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const history = useHistory();

  const location = useLocation();

  const dispatch = useDispatch();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
      .then(() => history.push("/"))
      .catch(async (err) => {
        console.log(err)
        const errors = err.json()
        console.log(errors)
      })
  };

  return (
    <div>
      {showLoginModal && (<LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />)}
      {showSignupModal && (<SignUpFormModal showSignupModal={showSignupModal} setShowSignupModal={setShowSignupModal} />)}
      <div className='right-profile-container'>
        <NavLink className='host-hover-border become-host-link' to="/spots/create">
          Become a Host
        </NavLink>
        <div className="profile-button-border"
          onClick={openMenu}>
          <img className="hamburger-icon" src={hamburger} />
          <img className="profile-icon" src={icon} />
        </div>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          {isLoaded && sessionUser && (
            <ul className="profile-list">
              <li className="profile-list-item user-name-li">{user.username}</li>
              <li className="profile-list-item user-email-li">{user.email}</li>
              <div
                className="bookings-textt"
                onClick={() => {
                  if (location.pathname === "/myProfile") {
                    return;
                  }
                  history.push("/myProfile");
                }}
              >My Profile</div>
              <li className="hover-link logout-li" onClick={logout}>
                <div className='profile-list-item'>Log Out</div>
              </li>
            </ul>
          )}
          {isLoaded && !sessionUser && (
            <ul className="profile-list">
              <li className="hover-link" onClick={() => setShowLoginModal(true)}>
                <div className='profile-list-item'>Login</div>
              </li>
              <li className="hover-link" onClick={() => setShowSignupModal(true)}>
                <div className='profile-list-item'>Sign Up</div>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
