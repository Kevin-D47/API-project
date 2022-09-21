import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkDeleteReview } from '../../store/reviews'
import { thunkGetSpotById } from "../../store/spots";
import './DeleteReview.css'


const ReviewDelete = ({reviewId, spotId, setShowDeleteReview}) => {

  const dispatch = useDispatch()

  const { spotId }  = useParams()



  const handleDelete = async (e) => {
    e.preventDefault()

    console.log('spotId---', spotId)

    console.log("type of id ---", typeof spotId)

    const deleteReview = await dispatch(thunkDeleteReview(reviewId, spotId))
    // .then(() => thunkGetSpotById(spotId))
    // .then(() => setShowDeleteReview(false))
  }

  return (
    <>
      <div>
      <p>This review will be deleted. Are you sure you want to proceed? </p>
      <button className="delete-button" onClick={ handleDelete }>YES</button>
      <button className="delete-button" onClick={() => setShowDeleteReview(false)}>NO</button>
      </div>
    </>
  )
}

export default ReviewDelete
