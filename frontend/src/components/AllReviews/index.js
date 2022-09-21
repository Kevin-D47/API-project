import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { thunkDeleteReview, thunkGetAllReviews } from "../../store/reviews";
import icon from './icons/icon.svg'
import './AllReview.css'
import { thunkGetSpotById } from '../../store/spots';


const GetSpotReviews = ({ spotId }) => {

    const sessionUser = useSelector(state => state.session.user)

    // const { spotId } = useParams();

    const allReviews = useSelector(state => state.reviews)
    const getAllReviewArr = Object.values(allReviews)

    const [isLoaded, setIsLoaded] = useState(false)


    const deleteReview = (e, id) => {
        e.preventDefault()
        dispatch(thunkDeleteReview(id)).then(() => dispatch(thunkGetSpotById(spotId)))
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllReviews(spotId)).then(() => setIsLoaded(true))
    }, [dispatch, spotId])


    if (!getAllReviewArr.length) {
        return null
    }


    return (
        isLoaded && (
            <div>
                <ul>
                    {getAllReviewArr.map(review => {
                        return (
                            <div className='review-container' key={review.id}>
                                <div className='user-container' style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    <div className='box'>
                                        <img className='profile-img' src={icon} />
                                        <div className='user-name'>
                                            {review.User.firstName}&nbsp;
                                            {review.User.lastName}
                                            {!sessionUser ? null : sessionUser.id === review.userId &&
                                                <button className='delete-review-button' onClick={(e) => deleteReview(e, review.id)}>
                                                    Delete Review
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='review'>
                                    {review.review}
                                </div>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    )
}

export default GetSpotReviews
