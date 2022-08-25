import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { thunkGetAllSpots, thunkGetSpotDetails } from '../../store/spots'
import './AllSpots.css'


const GetAllSpots = () => {

    const [isLoaded, setIsLoaded] = useState(false)

    const allSpots = useSelector(state => state.spots)
    const allSpotsArr = Object.values(allSpots)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllSpots()).then(setIsLoaded(true));
    }, [dispatch])

    if (!allSpotsArr.length) {
        return null
    }


    return (
        isLoaded && (
            <>
                <h2>All Spots</h2>
                <div>
                    {allSpotsArr.map((spot) => (
                        <li key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`}>
                                <p>{spot.name}</p>
                                <p>{spot.city}, {spot.state}</p>
                                <p>${spot.price} night</p>
                            </NavLink>
                        </li>
                    ))}

                </div>
            </>
        )
    )
}

export default GetAllSpots
