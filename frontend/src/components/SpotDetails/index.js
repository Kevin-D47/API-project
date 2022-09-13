import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"

import UpdateSpotForm from '../UpdateSpotFormPage'
import SpotDelete from '../DeleteSpot'
import GetSpotReviews from '../AllReviews'

import { thunkGetSpotById } from '../../store/spots'
import { thunkGetAllReviews } from '../../store/reviews'
import { Modal } from '../../context/Modal'

import starIcon from './icons/starIcon.png'
import icon from './icons/icon.svg'
import './SpotDetails.css'


const GetSpotDetails = () => {

    const history = useHistory()

    const [isLoaded, setIsLoaded] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDeleteSpot, setShowDeleteSpot] = useState(false);
    const [showReview, setShowReview] = useState(false);

    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const currSpot = useSelector(state => state.spots[spotId])

    const allReviews = useSelector(state => state.reviews)

    const getAllReviewsArr = Object.values(allReviews)
    const [userIds, setUserIds] = useState(false)

    const addReview = (e, spotId) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/create`)
    }

    useEffect(() => {
        setUserIds(getAllReviewsArr.map(review => review.userId))
    }, [allReviews])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkGetAllReviews(spotId))
        dispatch(thunkGetSpotById(spotId)).then(() => setIsLoaded(true))
    }, [dispatch, spotId])

    const rating = currSpot?.avgStarRating

    return (
        isLoaded && (
            <div className='spot-details-container'>
                <div className='spot-details-wrapper'>
                    <div className='spot-details-top-container'>
                        <div className='spot-title'>
                            <h2>{currSpot.name}</h2>
                        </div>

                    </div>
                    <div className='spot-details-bottom-container'>
                        <div className='spot-rating'><img className="star-icon" src={starIcon} alt="" />{Number(rating).toFixed(2)}</div>
                        <div className='spot-num-reviews'>{currSpot.numReviews} reviews</div>
                        <div className='spot-location'>{currSpot.city}, {currSpot.state}, {currSpot.country}</div>

                    </div>
                    <div>
                        <img className='spot-details-img' src={currSpot.Images[0].url} />
                    </div>
                    <div className='spot-host-container'>
                        <div className='spot-host-title'>
                            <div className='host-profile-container'>
                                <img className='spot-host-profile-pic' src={icon} />
                                Spot hosted by {currSpot.Owner.firstName} {currSpot.Owner.lastName}
                            </div>
                            <div className='spot-price'>
                                <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
                                    ${currSpot.price}
                                </div>
                                &nbsp;night
                            </div>
                        </div>
                        {currSpot.ownerId === sessionUser?.id && (
                            <div className='spot-host-options-container'>
                                <div>
                                    <div className='spot-owner-options-title'>Host Options: </div>
                                    <button className='button edit-button' onClick={() => setShowUpdate(true)}>Edit My Spot</button>
                                    <button className='button' onClick={() => setShowDeleteSpot(true)}>Delete My Spot</button>
                                    {showUpdate && (
                                        <Modal onClose={() => setShowUpdate(false)}>
                                            <UpdateSpotForm spotId={spotId} setShowUpdate={setShowUpdate} />
                                        </Modal>
                                    )}
                                    {showDeleteSpot && (
                                        <Modal onClose={() => setShowDeleteSpot(false)} >
                                            <SpotDelete spotId={spotId} setShowDeleteSpot={setShowDeleteSpot} />
                                        </Modal>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='review-details-container'>
                        <div className='rating-review-container'>
                            <div className='rating'><img className="star-icon" src={starIcon} alt="" />{Number(rating).toFixed(2)}</div>
                            <div className='num-reviews'>{currSpot.numReviews} reviews</div>
                            {!sessionUser ? null : currSpot.ownerId !== sessionUser?.id && !userIds.includes(sessionUser?.id) &&
                                <button className='add-review-button' onClick={(e) => addReview(e, currSpot.id)}>
                                    Review This Spot
                                </button>
                            }
                        </div>

                        <div>
                            <GetSpotReviews spotId={spotId} sessionUser={sessionUser} setShowReview={setShowReview} />
                        </div>
                    </div>
                </div>

            </div>
        )
    )
}

export default GetSpotDetails
