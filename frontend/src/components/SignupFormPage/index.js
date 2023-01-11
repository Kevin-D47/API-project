// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';


function SignupFormPage({ setShowSignupModal }) {

  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .then(() => setShowSignupModal(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className="signup-form-container" onSubmit={handleSubmit}>
      <div className="signup-form-wrapper">
        <div className="signup-title-container">
          <h4 id="signup-title">Sign up</h4>
        </div>
        <div className="welcome-container">
          <h3 className="welcome-title">Welcome to Staybnb</h3>
        </div>
        <div className="signup-input-wrapper">
          <input
            className='form-input first'
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className='form-input middle'
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            className='form-input middle'
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='form-input middle'
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className='form-input middle'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className='form-input last'
            type="password"
            placeholder='Confirmed Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="signup-form-errors">
            <ul className="errors-list">
              {errors.length > 0 && errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <button className="submit-button" type="submit">Continue</button>
    </form>
  );
}

export default SignupFormPage;
