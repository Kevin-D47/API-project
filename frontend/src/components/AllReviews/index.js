import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { thunkDeleteReview, thunkGetAllReviews } from "../../store/reviews";


// const GetSpotReviews = () => {

//     const { spotId } = useParams();
//     const allReviews = useSelector(state => state.reviews)

//     const getAllReviewArr = Object.values(allReviews).map((review) => {
//        return (
//             <div key={review.id}>
//                 {review.review}
//             </div>
//         )
//     })

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(thunkGetAllReviews(spotId))
//     }, [dispatch, spotId])

//     return (
//         <div>
//             <h2>Reviews: </h2>
//             {getAllReviewArr}
//         </div>
//     )
// }

// export default GetSpotReviews



export default function GetSpotReviews() {
    const { spotId } = useParams();
    const spotIdParsed = parseInt(spotId)
    const spot = useSelector(state => (state.spots[spotIdParsed]))


    const allReviews = useSelector(state => state.reviews)
    const getAllReviewArr = Object.values(allReviews)


    const [isLoaded, setIsLoaded] = useState(false)


    const sessionUser = useSelector(state => state.session.user)


    const dispatch = useDispatch();


    const deleteReview = (e, id) => {
        e.preventDefault()
        dispatch(thunkDeleteReview(id))
    }


    useEffect(() => {
        dispatch(thunkGetAllReviews(spotId)).then(() => setIsLoaded(true))
    }, [dispatch, spotId])


    if (!getAllReviewArr.length) {
        return null
    }

    return (
        isLoaded && (
            <div>
                <h2>Review: </h2>
                <ul>
                    {getAllReviewArr.map(review => {
                        return (
                            <div key={review.id}>
                                {review.review}
                                {sessionUser.id === review.userId && <button onClick={(e) => deleteReview(e, review.id)}>
                                    Delete Review
                                </button>}
                            </div>
                        )
                    })}
                </ul>
            </div>
        )

    )
}
