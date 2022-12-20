import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllReviews } from "../../store/reviews";
import { thunkGetSpotById } from '../../store/spots';
import { Modal } from "../../context/Modal";

import UpdateReviewForm from '../UpdateReview';
import ReviewDelete from '../DeleteReview';

import icon from './icons/icon.svg'
import editIcon from './icons/edit-icon.png'
import deleteIcon from './icons/delete-icon.png'
import starIcon from './icons/starIcon.png'

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
                                <div className='user-review-info-options'>
                                    <div className='user-name-pic'>
                                        <img className='profile-img' src={icon} />
                                        <div className='user-name-date'>
                                            <div className='user-name'>
                                                {review.User ? review.User.firstName : ""}&nbsp;
                                                {review.User ? review.User.lastName : ""}
                                            </div>
                                            <div className='review-date'>Posted on: {review.createdAt.slice(5, 7)}/{review.createdAt.slice(8, 9)}/{review.createdAt.slice(0, 4)}</div>
                                        </div>
                                    </div>
                                    <div className='viewThisResult'>
                                        <div className='review-options-container'>
                                            {!sessionUser ? null : sessionUser.id === review.userId &&
                                                <img className='delete-review-button' src={editIcon} onClick={() => { setShowUpdateReview(true); setCurrReview(review) }}></img>
                                            }
                                            {!sessionUser ? null : sessionUser.id === review.userId &&
                                                <img className='delete-review-button' src={deleteIcon} onClick={() => { setShowDeleteReview(true); setCurrReview(review) }}></img>
                                            }
                                        </div>
                                        {showUpdateReview && (
                                            <Modal onClose={() => setShowUpdateReview(false)}>
                                                <UpdateReviewForm currReview={currReview} spotId={spotId} setShowUpdateReview={setShowUpdateReview} />
                                            </Modal>
                                        )}

                                        {showDeleteReview && (
                                            <Modal onClose={() => setShowDeleteReview(false)}>
                                                <ReviewDelete currReview={currReview} spotId={spotId} setShowDeleteReview={setShowDeleteReview} />
                                            </Modal>
                                        )}
                                    </div>

                                </div>
                                <div className='review-info-container'>
                                    <div className='review-rating-container'>Rating:
                                        <div className='review-rating-container-inner'>
                                            <img className='star-icon-review' src={starIcon}></img>
                                            <div style={{fontWeight:'bold'}}>{review.stars}</div>
                                        </div>
                                    </div>
                                    <div>{review.review}</div>

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
