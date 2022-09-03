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
                            <a href={`/spots/${spot.id}`}>
                                <img src={spot.previewImage} alt='true'></img>
                            </a>
                            <div>{spot.name}</div>
                            <div>{spot.city}, {spot.state}</div>
                            <div>
                                <span className="star-rating-container">
                                    <img className="star-icon" src={'https://i.pinimg.com/736x/1e/26/44/1e26444b739863fdf4b0ad49d163ff95.jpg'} alt="" /> {Number(spot.avgRating).toFixed(2)}
                                </span>
                            </div>
                            <div>${spot.price} night</div>
                        </ul>
                    ))}
                </div>
            </>
        )
    )
}

export default GetAllSpots
