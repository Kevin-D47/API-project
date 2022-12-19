import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllReviews } from "../../store/reviews";
import { thunkGetSpotById } from '../../store/spots';
import { Modal } from "../../context/Modal";

import UpdateReviewForm from '../UpdateReview';
import ReviewDelete from '../DeleteReview';

import icon from './icons/icon.svg'

import './AllReview.css'


const GetSpotReviews = ({ spotId }) => {

    const sessionUser = useSelector(state => state.session.user)

    const allReviews = useSelector(state => state.reviews)
    const getAllReviewArr = Object.values(allReviews)

    const [isLoaded, setIsLoaded] = useState(false)
    const [currReview, setCurrReview] = useState(false)
    const [showUpdateReview, setShowUpdateReview] = useState(false)
    const [showDeleteReview, setShowDeleteReview] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllReviews(spotId))
            .then(() => dispatch(thunkGetSpotById(spotId)))
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId, showUpdateReview])


    return (
        isLoaded && (
            <div>
                <ul>
                    {getAllReviewArr.map(review => {
                        return (
                            <div className='review-container' key={review.id}>
                                <div className='user-container' style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    <div className='box'>
                                        <img className='profile-img' src={icon} />
                                        <div className='user-name'>
                                            {review.User ? review.User.firstName : ""}&nbsp;
                                            {review.User ? review.User.lastName : ""}
                                            {!sessionUser ? null : sessionUser.id === review.userId &&
                                                <button className='delete-review-button' onClick={() => { setShowUpdateReview(true); setCurrReview(review) }}>
                                                    Edit Review
                                                </button>
                                            }
                                            {showUpdateReview && (
                                                <Modal onClose={() => setShowUpdateReview(false)}>
                                                    <UpdateReviewForm currReview={currReview} spotId={spotId} setShowUpdateReview={setShowUpdateReview} />
                                                </Modal>
                                            )}
                                            {!sessionUser ? null : sessionUser.id === review.userId &&
                                                <button className='delete-review-button' onClick={() => { setShowDeleteReview(true); setCurrReview(review) }}>
                                                    Delete Review
                                                </button>
                                            }
                                            {showDeleteReview && (
                                                <Modal onClose={() => setShowDeleteReview(false)}>
                                                    <ReviewDelete currReview={currReview} spotId={spotId} setShowDeleteReview={setShowDeleteReview} />
                                                </Modal>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='review'>
                                    {review.review}
                                </div>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    )
}

export default GetSpotReviews
