import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import staybnbLogo from './icons/staybnbLogo.png'

import "./pageNotFound.css";

export function PageNotFound() {

    const history = useHistory()

    return (
        <div className="login-container-PNF">
            <div className="inner-login-PNF">
                <img className="logo-PNF" src={staybnbLogo}></img>
                <div className="title-PNF">Page Not Found</div>
                <div className="link-error">
                    <NavLink to="/" className='link-error-text'>Click here to go back to homepage</NavLink>
                </div>
            </div>
        </div>
    );
}
