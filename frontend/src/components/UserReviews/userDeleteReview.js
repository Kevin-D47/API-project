import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkDeleteReview } from '../../store/reviews'
import { thunkGetSpotById } from "../../store/spots";


const UserReviewDelete = ({setShowDeleteUserReview, currUserReview }) => {

  const dispatch = useDispatch()

  const { spotId }  = useParams()

  const handleDelete = async (e) => {
    e.preventDefault()

    dispatch(dispatch(thunkDeleteReview(currUserReview.id)).then(() => setShowDeleteUserReview(false)))

  }

  return (
    <div>
    <div className='delete-container'>
      <p>This review will be deleted. Are you sure you want to proceed? </p>
      <div className="delete-buttons-container">
        <button className="delete-button yes-button" onClick={handleDelete}>YES</button>
        <button className="delete-button" onClick={() => setShowDeleteUserReview(false)}>NO</button>
      </div>
    </div>
  </div>
  )
}

export default UserReviewDelete
