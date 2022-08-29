import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { thunkGetAllReviews } from "../../store/reviews";


const GetSpotReviews = () => {

    const { spotId } = useParams();
    const allReviews = useSelector(state => state.reviews)

    const getAllReviewArr = Object.values(allReviews).map((review) => {
       return (
            <div key={review.id}>
                {review.review}
            </div>
        )
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
