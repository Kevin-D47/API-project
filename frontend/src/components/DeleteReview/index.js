import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkDeleteReview } from '../../store/reviews'
import './DeleteReview.css'


const ReviewDelete = ({reviewId, spotId }) => {

  const dispatch = useDispatch()

  const { spotId }  = useParams()

  dispatch(thunkDeleteReview(reviewId, spotId))

  return (
    <></>
  )
}

export default ReviewDelete
