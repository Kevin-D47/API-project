import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllSpots } from '../../store/spots'
import starIcon from './icons/starIcon.png'
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
                <div className='spots-container'>
                    <div className='spots-cards-container'>
                        {allSpotsArr.map((spot) => (
                            <div key={spot.id}>
                                <a href={`/spots/${spot.id}`}>
                                    <img className='spot-img' src={spot.previewImage} alt='true'></img>
                                </a>
                                <div className='spot-info-container'>
                                    <div className='spot-info-left'>
                                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            {spot.name}
                                        </div>
                                        <div style={{ fontSize: '16px' }}>
                                            {spot.city}, {spot.state}
                                        </div>
                                        <div className='price-container'>
                                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                                ${spot.price}
                                            </div>
                                            &nbsp;night
                                        </div>
                                    </div>
                                    <div className='spot-info-right'>
                                        <div style={{ fontSize: '16px' }}>
                                            <img className='star-icon' src={starIcon} alt='true' />
                                            {Number(spot.avgRating).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    )
}

export default GetAllSpots
