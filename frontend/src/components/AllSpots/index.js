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
                <div>All Spots</div>
                <div>
                    {allSpotsArr.map((spot) => (
                        <li key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`}>
                                {spot.name}
                            </NavLink>
                        </li>
                    ))}

                </div>
            </>
        )
    )
}

export default GetAllSpots
