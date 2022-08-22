// frontend/src/components/LoginForm/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form className='login-form-container' onSubmit={handleSubmit}>
      <div className="login-title-container">
        <h3 id="login-title">Log in</h3>
      </div>
      <div className='welcome-title-container'>
        <h4 id='welcome-title'>Welcome to Airbnb</h4>
      </div>
      <input
        type="text"
        className='login-input'
        placeholder={'email'}
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        required
      />
      <input
        type="password"
        className='login-input'
        placeholder={'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className='login-errors-container'>
        {errors.length > 0 && (
          <ul className="errors-list">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit">Continue</button>
    </form>
  );
}

export default LoginForm;
