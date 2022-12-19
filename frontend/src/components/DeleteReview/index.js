import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkDeleteReview } from '../../store/reviews'
import { thunkGetSpotById } from "../../store/spots";

import './DeleteReview.css'


const ReviewDelete = ({setShowDeleteReview, currReview }) => {

  const dispatch = useDispatch()

  const { spotId }  = useParams()

  const handleDelete = async (e) => {
    e.preventDefault()

    dispatch(thunkDeleteReview(currReview.id)).then(() => dispatch(thunkGetSpotById(spotId)))
    setShowDeleteReview(false)
  }

  return (
    <div>
    <div className='delete-container'>
      <p>This review will be deleted. Are you sure you want to proceed? </p>
      <div className="delete-buttons-container">
        <button className="delete-button yes-button" onClick={handleDelete}>YES</button>
        <button className="delete-button" onClick={() => setShowDeleteReview(false)}>NO</button>
      </div>
    </div>
  </div>
  )
}

export default ReviewDelete
