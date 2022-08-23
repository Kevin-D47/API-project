import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllSpots, thunkGetSpotDetails } from '../../store/spots'
import './Spots.css'


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
                        <li key={spot.id}>{spot.name}</li>
                    ))}
                </div>
            </>
        )
    )
}

export default GetAllSpots
