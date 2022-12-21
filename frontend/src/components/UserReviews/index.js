import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUserReviewsThunk } from '../../store/reviews'
import { thunkGetAllSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom'
import { Modal } from '../../context/Modal'

import UserUpdateReviewForm from './userUpdatereview'
import UserReviewDelete from './userDeleteReview'

import starIcon from './icons/starIcon.png'
import staybnbLogo from './icons/staybnbLogo.png'

import './userReviews.css'

const UserReviewsPage = () => {

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    const [showUpdateUserReview, setShowUpdateUserReview] = useState(false)
    const [showDeleteUserReview, setShowDeleteUserReview] = useState(false)
    const [currUserReview, setCurrUserReview] = useState(false)

    const allReviews = useSelector(state => state.reviews)
    let allReviewArr = Object.values(allReviews)

    const allSpots = useSelector(state => state.spots)
    const allSpotsArr = Object.values(allSpots)

    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllUserReviewsThunk());
    }, [dispatch, showUpdateUserReview, showDeleteUserReview])

    return (
        <div className='user-reviews-container'>
            <div className='my-reviews-header'>My Reviews</div>
            <div className='user-reviews-results'>
                {allReviewArr.length === 0 ?
                    <div className="no-booking-container">
                        <div className="user-no-data-container user-no-data-container-reviews">
                            <img className='no-data-logo' src={staybnbLogo}></img>
                            <div className="no-booking-message">You have no existing reviews</div>
                        </div>
                    </div> :
                    allReviewArr.map((review) => {
                        return (
                            <div className='user-single-review-container'>
                                <div className='user-review-spot-container'>
                                    <div style={{ fontSize: '22px', }}>Review at</div>
                                    <NavLink className='user-review-spot' to={`/spots/${review.spotId}`}>
                                        {review.Spot?.name}
                                    </NavLink>
                                </div>
                                <div className='user-review-info-container'>
                                    <div className='user-review-date'>
                                        Posted on:
                                        <div style={{ fontWeight: 'bold' }}>{review.createdAt.slice(5, 7)}/{review.createdAt.slice(8, 9)}/{review.createdAt.slice(0, 4)}</div>
                                    </div>
                                    <div className='user-review-rating' style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        <div style={{ fontWeight: 'normal' }}>Rating:</div>
                                        <img className='star-icon' src={starIcon} alt='' />
                                        {review.stars}
                                    </div>
                                    <div>{review.review}</div>
                                </div>
                                <div className='user-review-options-container'>
                                    <button className='host-option-buttons edit-button' onClick={() => { setShowUpdateUserReview(true); setCurrUserReview(review) }}>Edit My Review</button>
                                    <button className='host-option-buttons' onClick={() => { setShowDeleteUserReview(true); setCurrUserReview(review) }}>Delete My Review</button>
                                    {showUpdateUserReview && (
                                        <Modal onClose={() => setShowUpdateUserReview(false)}>
                                            <UserUpdateReviewForm currUserReview={currUserReview} spotId={currUserReview.spotId} setShowUpdateUserReview={setShowUpdateUserReview} />
                                        </Modal>
                                    )}
                                    {showDeleteUserReview && (
                                        <Modal onClose={() => setShowDeleteUserReview(false)} >
                                            <UserReviewDelete currUserReview={currUserReview} spotId={currUserReview.spotId} setShowDeleteUserReview={setShowDeleteUserReview} />
                                        </Modal>
                                    )}
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default UserReviewsPage
