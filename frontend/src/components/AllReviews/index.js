import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllReviews } from "../../store/reviews";


const GetSpotReviews = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => (state.spots[+spotId]))

    const allReviews = useSelector(state => state.reviews)
    const getAllReviewArr = Object.values(allReviews).map((review) => {
        return review.id === spot.id ? (
            <div key={review.id}>{review.review}</div>
        ) : null
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllReviews(spotId))
    }, [dispatch, spotId])

    return (
        <div>
            <h2>Reviews: </h2>
            {getAllReviewArr}
        </div>

    )
}

export default GetSpotReviews
