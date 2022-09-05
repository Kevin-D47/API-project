import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"

import UpdateSpotForm from '../UpdateSpotFormPage'
import SpotDelete from '../DeleteSpot'
import GetSpotReviews from '../AllReviews'

import { thunkGetSpotById } from '../../store/spots'
import { thunkGetAllReviews} from '../../store/reviews'
import { Modal } from '../../context/Modal'

import starIcon from './icons/starIcon.png'
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

    const rating = currSpot?.avgStarRating == 0 ? "New" : currSpot?.avgStarRating

    return (
        isLoaded && (
            <>
                <div>
                    <h2>{currSpot.name}</h2>
                </div>
                <div>
                    <img src={currSpot.Images[0].url} />
                    <p>Rating: <img className="star-icon" src={starIcon} alt=""/>{Number(rating).toFixed(2)}</p>
                    <p>{currSpot.city}, {currSpot.state} {currSpot.country}</p>
                </div>
                <div>

                    {currSpot.ownerId !== sessionUser?.id && !userIds.includes(sessionUser?.id) && <button onClick={(e) => addReview(e, currSpot.id)}>Review Spot</button>}

                    {currSpot.ownerId === sessionUser?.id && (
                        <div>
                            <button onClick={() => setShowUpdate(true)}>Edit Spot</button>
                            <button onClick={() => setShowDeleteSpot(true)}>Delete Spot</button>
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
                    )}
                    <GetSpotReviews spotId={spotId} sessionUser={sessionUser} setShowReview={setShowReview}  />
                </div>
            </>
        )
    )
}

export default GetSpotDetails
