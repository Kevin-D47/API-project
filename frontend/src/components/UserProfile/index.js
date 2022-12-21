import React from "react";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUserReviewsThunk } from '../../store/reviews'
import { getBookingsByUserthunk } from "../../store/bookings";
import { thunkGetAllSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom'
import { Modal } from '../../context/Modal'

import profilePic from './icons/icon.svg'

import './userProfile.css'

function UserProfile() {

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)

    const allReviews = useSelector(state => state.reviews)
    let allReviewArr = Object.values(allReviews)

    const allSpots = useSelector(state => state.spots)
    const allSpotsArr = Object.values(allSpots)
    const allUserSpotsArr = allSpotsArr.filter((spot) => spot.id == sessionUser.id)

    const bookings = useSelector((state) => Object.values(state.bookings));

    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllUserReviewsThunk());
    }, [dispatch])

    useEffect(() => {
        dispatch(getBookingsByUserthunk());
    }, [dispatch])

    const numUserReviews = allReviewArr.length

    const numUserSpots = allUserSpotsArr.length

    const numUserBookings = bookings.length

    return (
        <div className="user-profile-container">
            <div className="user-profile-info-container">
                <img className="user-profile-image" src={profilePic}></img>
                <div style={{ fontSize: '22px', fontWeight: 'bold' }} >{sessionUser.username}</div>
                <div className="user-profile-single-info">
                    <div>Email:</div>
                    <div style={{ fontWeight: 'bold' }}>{sessionUser.email}</div>
                </div>
                <div className="user-profile-bottom-container">
                    <div className="user-profile-manage-container">
                        <div className="user-profile-single-info">
                            <div>Listings:</div>
                            <div style={{ fontWeight: 'bold' }}>{numUserSpots}</div>
                        </div>
                        <NavLink className='user-profile-manage-link' to={`/myListings`}>Manage Listings</NavLink>
                    </div>
                    <div className="user-profile-manage-container">
                        <div className="user-profile-single-info">
                            <div>Reviews:</div>
                            <div style={{ fontWeight: 'bold' }}>{numUserReviews}</div>
                        </div>
                        <NavLink className='user-profile-manage-link' to={`/myReviews`}>Manage Reviews</NavLink>
                    </div>
                    <div className="user-profile-manage-container">
                        <div className="user-profile-single-info">
                            <div>Bookings:</div>
                            <div style={{ fontWeight: 'bold' }}>{numUserBookings}</div>
                        </div>
                        <NavLink className='user-profile-manage-link' to={`/myBookings`}>Manage Bookings</NavLink>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserProfile
