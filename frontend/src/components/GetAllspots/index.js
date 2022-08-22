import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllSpots } from '../../store/spots'


const GetAllSpots = () => {

    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots)

    const allSpotsArr = Object.values(allSpots)

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
                    <ul>
                        {allSpotsArr.map((spot) => (
                            <li key={spot.id}>{spot.name}</li>
                        ))}
                    </ul>
                </div>
            </>
        )
    )
}

export default GetAllSpots
