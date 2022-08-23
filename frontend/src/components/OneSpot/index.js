import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { thunkGetSingleSpot } from '../../store/spots'


const GetSingleSpot = () => {

    const [isLoaded, setIsLoaded] = useState(false)

    const { spotId } = useParams()
    // console.log('spotId', spotId)
    const currSpot = useSelector(state => state.spots.selectedSpot?.[spotId])
    // console.log('currSpot', currSpot)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSingleSpot(spotId)).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        isLoaded && (
            <>
                <div>Current Spot:</div>
                <div>
                   <li>{currSpot.address}</li>
                </div>
            </>
        )
    )

}


export default GetSingleSpot
