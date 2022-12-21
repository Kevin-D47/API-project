import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom'
import { Modal } from '../../context/Modal'

import UpdateSpotForm from '../UpdateSpotFormPage'
import SpotDelete from '../DeleteSpot'

import starIcon from './icons/starIcon.png'
import staybnbLogo from './icons/staybnbLogo.png'

import './UserListings.css'


const UserSpotsPage = () => {

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    const [showUpdate, setShowUpdate] = useState(false);
    const [showDeleteSpot, setShowDeleteSpot] = useState(false);
    const [currUserSpot, setCurrUserSpot] = useState(false)

    useEffect(() => {
        dispatch(thunkGetAllSpots());
    }, [dispatch])

    const allSpots = useSelector(state => state.spots)
    const allSpotsArr = Object.values(allSpots)

    const userSpotsArr = allSpotsArr.filter((spot) => spot.ownerId == sessionUser.id)

    if (!allSpotsArr.length) {
        return null
    }

    return (
        <div className='user-spots-container'>
            <div className='my-listing-header'>My Listings</div>
            <div>
                {userSpotsArr.length === 0 ?
                    <div className="no-booking-container">
                        <div className="user-no-data-container">
                            <img className='no-data-logo' src={staybnbLogo}></img>
                            <div className="no-booking-message">You have no existing listings</div>
                            <NavLink className='listing-become-host-link' to={'/spots/create'}>Start hosting a stay by clicking here</NavLink>
                        </div>
                    </div> :
                    userSpotsArr.map((spot) => (
                        <div className='user-single-spot-container' key={spot.id}>
                            <div className='user-single-spot-container-left'>
                                <NavLink to={`/spots/${spot.id}`}>
                                    <img className='user-spot-img' src={spot.Images[0]?.url} alt=''></img>
                                </NavLink>
                            </div>
                            <div className='user-single-spot-container-right'>
                                <div className='user-spot-info-container'>
                                    <div style={{ fontSize: '26px', fontWeight: '600' }}>
                                        {spot.name}
                                    </div>
                                    <div className='user-property-type-container'>
                                        <div>Location:</div> <div style={{ fontWeight: 'bold' }}>{spot.address}, {spot.city}, {spot.state}</div>
                                    </div>
                                    <div className='user-property-type-container'>Property Type: <div style={{ fontWeight: 'bold' }}>{spot.type}</div></div>
                                    <div className='user-property-type-container' >
                                        <div>Price:</div> <div style={{ fontWeight: 'bold' }}>${spot.price}</div>
                                    </div>

                                    <div className='user-property-type-container'>
                                        <div>Rating: </div>
                                        <img className='star-icon' src={starIcon} alt='' />
                                        <div style={{ fontWeight: 'bold' }}>{Number(spot.avgRating).toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <button className='host-option-buttons edit-button' onClick={() => { setShowUpdate(true); setCurrUserSpot(spot) }}>Edit My Spot</button>
                                        <button className='host-option-buttons' onClick={() => { setShowDeleteSpot(true); setCurrUserSpot(spot) }}>Delete My Spot</button>
                                        {showUpdate && (
                                            <Modal onClose={() => setShowUpdate(false)}>
                                                <UpdateSpotForm spotId={currUserSpot.id} setShowUpdate={setShowUpdate} />
                                            </Modal>
                                        )}
                                        {showDeleteSpot && (
                                            <Modal onClose={() => setShowDeleteSpot(false)} >
                                                <SpotDelete spotId={currUserSpot.id} setShowDeleteSpot={setShowDeleteSpot} />
                                            </Modal>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default UserSpotsPage
