import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom'
import { Modal } from '../../context/Modal'

import UpdateSpotForm from '../UpdateSpotFormPage'
import SpotDelete from '../DeleteSpot'

import starIcon from './icons/starIcon.png'

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

    console.log('USER SPOTS', userSpotsArr)

    if (!allSpotsArr.length) {
        return null
    }

    return (
        <div className='user-spots-container'>
            <div className='my-listing-header'>My Listings</div>
            <div>
                {userSpotsArr.map((spot) => (
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
                                <div style={{ fontSize: '18px', color: 'grey' }}>
                                    {spot.city}, {spot.state}
                                </div>
                                <div>{spot.description}</div>
                                <div className='price-container'>
                                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        ${spot.price}
                                    </div>
                                    &nbsp; <div style={{ fontSize: '16px' }}>
                                        night
                                    </div>
                                </div>
                                <div style={{ fontSize: '16px' }}>
                                    <img className='star-icon' src={starIcon} alt='' />
                                    {Number(spot.avgRating).toFixed(2)}
                                </div>
                                <div>
                                    <button className='host-option-buttons edit-button' onClick={() => {setShowUpdate(true); setCurrUserSpot(spot)}}>Edit My Spot</button>
                                    <button className='host-option-buttons' onClick={() => {setShowDeleteSpot(true); setCurrUserSpot(spot)}}>Delete My Spot</button>
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
