import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"

import UpdateSpotForm from '../UpdateSpotFormPage'
import SpotDelete from '../DeleteSpot'
import GetSpotReviews from '../AllReviews'
import { thunkGetSpotById } from '../../store/spots'
import { Modal } from '../../context/Modal'

import './SpotDetails.css'


const GetSpotDetails = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showReview, setShowReview] = useState(false);

    const { spotId } = useParams()
    const user = useSelector(state => state.session.user)
    const currSpot = useSelector(state => state.spots[spotId])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSpotById(spotId)).then(() => setIsLoaded(true))
    }, [dispatch])

    const rating = currSpot?.avgStarRating == 0 ? "New" : currSpot?.avgStarRating

    return (
        isLoaded && (
            <>
                <div>
                    <h2>{currSpot.name}</h2>
                </div>
                <div>
                    <p>Rating: {rating}</p>
                    <p>{currSpot.city}, {currSpot.state} {currSpot.country}</p>
                </div>
                <div>
                    {currSpot.ownerId === user?.id && (
                        <div>
                            <button onClick={() => setShowUpdate(true)}>Edit Spot</button>
                            <button onClick={() => setShowDelete(true)}>Delete Spot</button>
                            {showUpdate && (
                                <Modal onClose={() => setShowUpdate(false)}>
                                    <UpdateSpotForm spotId={spotId} setShowUpdate={setShowUpdate} />
                                </Modal>
                            )}
                            {showDelete && (
                                <Modal onClose={() => setShowDelete(false)} >
                                    <SpotDelete spotId={spotId} setShowDelete={setShowDelete} />
                                </Modal>
                            )}
                        </div>
                    )}
                    <GetSpotReviews spotId={spotId} setShowReview={setShowReview}/>
                </div>
                <div>
                    {currSpot && (
                        <div>
                            {/* <img src={`${currSpot.previewImage}`} /> */}
                        </div>
                    )}
                </div >
                <div>

                </div>
            </>
        )
    )

}

export default GetSpotDetails
