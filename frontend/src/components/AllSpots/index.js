import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
                        <ul key={spot.id}>
                            <Link to={`/spots/${spot.id}`}>
                            <div><img src={spot.previewImage} /></div>
                            <div>{spot.name}</div>
                            <div>{spot.city}, {spot.state}</div>
                            <div>${spot.price} night</div>
                            </Link>
                        </ul>
                    ))}
                </div>
            </>
        )
    )
}

export default GetAllSpots
