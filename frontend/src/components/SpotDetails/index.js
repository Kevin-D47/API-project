import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { Modal } from '../../context/Modal'

import UpdateSpotForm from '../UpdateSpotFormPage'
import SpotDelete from '../DeleteSpot'
import GetSpotReviews from '../AllReviews'
import CreateBooking from '../CreateBooking'

import { thunkGetSpotById } from '../../store/spots'
import { thunkGetAllReviews } from '../../store/reviews'

import starIcon from './icons/starIcon.png'
import icon from './icons/icon.svg'
import stayPlus from './icons/airbnb-plus-pic.png'

import './SpotDetails.css'
import StayCover from '../StayCoverModal'


const GetSpotDetails = () => {

    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const currSpot = useSelector(state => state.spots[spotId])

    const allReviews = useSelector(state => state.reviews)
    const getAllReviewsArr = Object.values(allReviews)

    const [isLoaded, setIsLoaded] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDeleteSpot, setShowDeleteSpot] = useState(false);
    const [, setShowReview] = useState(false);
    const [disableCreateReview, setDisableCreateReview] = useState(true);
    const [showStayCover, setShowStayCover] = useState(false)

    const todayDate = new Date().toISOString().slice(0, 10);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const history = useHistory()

    const addReview = (e, spotId) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/create`)
    }

    const sessionUserReview = !sessionUser ? null : getAllReviewsArr.find((review) => review.userId === sessionUser.id)

    useEffect(() => {
        setDisableCreateReview(!!sessionUserReview)
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkGetAllReviews(spotId))
        dispatch(thunkGetSpotById(spotId)).then(() => setIsLoaded(true))
    }, [dispatch, spotId])

    if (!isLoaded) {
        return (<div></div>)
    }

    if (currSpot === undefined) {
        return history.push("/")
    }

    if (isLoaded && currSpot.Owner === undefined) {
        dispatch(thunkGetSpotById(spotId))
        return (<div></div>)
    }

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
                        <div className='spot-rating'><img className="star-icon" src={starIcon} alt="" />{Number(currSpot?.avgStarRating).toFixed(2)}</div>
                        <div className='spot-num-reviews'>{currSpot.numReviews} reviews</div>
                        <div className='spot-location'>{currSpot.city}, {currSpot.state}, {currSpot.country}</div>
                    </div>
                    <img className='spot-details-img' src={currSpot.Images[0]?.url} alt='' />
                    <div className='spot-host-container'>
                        <div className='spot-host-container-left'>
                            <div className='spot-host-title'>
                                <div className='host-profile-container'>
                                    <div>Stay hosted by {currSpot.Owner.firstName} {currSpot.Owner.lastName}</div>
                                    <div className='spot-description'>
                                        {currSpot.description}
                                    </div>
                                </div>
                                <img className='spot-host-profile-pic' src={icon} alt='' />
                            </div>
                            <div className='stay-cover-container'>
                                <div className='stay-cover-title'>
                                    <div style={{ color: '#fd5a5f' }}>stay</div><div>cover</div>
                                </div>
                                <div className='stay-cover-description'>
                                    Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                                </div>
                                <div className='stay-cover-learn-more' onClick={() => setShowStayCover(true)}>Learn more</div>
                                {showStayCover && (
                                    <Modal onClose={() => setShowStayCover(false)}>
                                        <StayCover spotId={spotId} setShowStayCover={setShowStayCover} />
                                    </Modal>
                                )}
                            </div>
                        </div>
                        <div className='spot-host-container-right'>
                            <div className='host-options-bookings-container'>
                                {currSpot.ownerId === sessionUser?.id && (
                                    <div className='spot-host-options-container'>
                                        <div>
                                            <div className='spot-owner-options-title'>Host Options: </div>
                                            <div className='host-option-buttons-container'>
                                                <button className='host-option-buttons' onClick={() => setShowUpdate(true)}>Edit My Spot</button>
                                                <button className='host-option-buttons spot-delete-button' onClick={() => setShowDeleteSpot(true)}>Delete My Spot</button>
                                            </div>
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
                                <div className='bookings-container'>
                                    <div className='booking-price-reviews-container'>
                                        <div className='booking-spot-price'>
                                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>
                                                ${currSpot.price}
                                            </div>
                                            &nbsp;night
                                        </div>
                                        <div className='booking-num-reviews'>{currSpot.numReviews} reviews</div>
                                    </div>
                                    <div className="booking-input-container">
                                        <CreateBooking
                                            setStartDate={setStartDate}
                                            setEndDate={setEndDate}
                                            todayDate={todayDate}
                                            startDate={startDate}
                                            endDate={endDate}
                                            spotId={spotId}
                                        />
                                    </div>
                                    <div className="you-wont-be-charged">
                                        You won't be charged yet
                                    </div>
                                    <div className="check-fee-price">
                                        <div>Cleaning Fee</div>
                                        <div style={{ fontWeight: 'bold' }}>Charged when reserved</div>
                                    </div>
                                    <div className="check-fee-price">
                                        <div>Service Fee</div>
                                        <div style={{ fontWeight: 'bold' }}>Charged when reserved</div>
                                    </div>
                                    <div className="check-fee-price">
                                        <div>Total before Taxes</div>
                                        <div className='booking-spot-price' style={{ color: 'black' }}>
                                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
                                                ${currSpot.price}
                                            </div>
                                            /night
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='spot-plus-details-container'>
                        <div className='spot-plus-title-container'>
                            <div className='spot-plus-title'>Every Staybnb place is inspected in person for quality</div>
                        </div>
                        <img className='stay-plus-pic' src={stayPlus}></img>
                    </div>
                    <div className='review-details-container'>
                        <div className='rating-review-container'>
                            <div className='overall-review-info'>
                                <div className='rating'><img className="star-icon" src={starIcon} alt="" />{Number(currSpot?.avgStarRating).toFixed(2)}</div>
                                <div className='num-reviews'>{currSpot.numReviews} reviews</div>
                            </div>
                            <div className='add-review-container'>
                                {!sessionUser ? null : currSpot.ownerId !== sessionUser?.id &&
                                    <button className='add-review-button' onClick={(e) => addReview(e, currSpot.id)} disabled={disableCreateReview}>
                                        Review This Stay
                                    </button>
                                }
                                {disableCreateReview && (
                                    <div className='add-review-disable-text'>You have already reviewed this spot</div>)}
                            </div>
                        </div>
                        <div className='details-reviews-wrapper'>
                            <GetSpotReviews spotId={spotId} sessionUser={sessionUser} setShowReview={setShowReview} />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default GetSpotDetails
