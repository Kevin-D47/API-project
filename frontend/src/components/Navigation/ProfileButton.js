// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal/index'
import SignUpFormModal from '../SignupFormPage/SignupFormModal'
import icon from './Images/icon.svg'
import hamburger from './Images/hamburgerIcon.svg'
import './ProfileButton.css'

function ProfileButton({ user, isLoaded }) {

  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

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

  const sessionUser = useSelector(state => state.session.user);

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
    <>
      {showLoginModal && (<LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />)}
      {showSignupModal && (<SignUpFormModal showSignupModal={showSignupModal} setShowSignupModal={setShowSignupModal} />)}
      <div className='right-profile-container'>
        <div className='host-hover-border'>
          <NavLink to="/spots/create">Become a Host</NavLink>
        </div>
      </div>
      <div className="profile-button-border"
        onClick={openMenu}>
        <img className="hamburger-icon" src={hamburger} />
        <img className="profile-icon" src={icon} />
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          {isLoaded && sessionUser && (
            <ul className="profile-list">
              <li className="profile-list-item user-name-li">{user.username}</li>
              <li className="profile-list-item user-name-li">{user.email}</li>
              <NavLink className='profile-list-item hover-link' onClick={logout} to=''>Log Out</NavLink>
            </ul>
          )}
          {isLoaded && !sessionUser && (
            <ul className="profile-list">
              <li className="hover-link">
                <NavLink className='profile-list-item' onClick={() => setShowLoginModal(true)} to=''>Login</NavLink>
              </li>
              <li className="hover-link">
                <NavLink className='profile-list-item' onClick={() => setShowSignupModal(true)} to=''>Sign Up</NavLink>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
