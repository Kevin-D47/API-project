import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkDeleteReview } from '../../store/reviews'
import './DeleteReview.css'


const ReviewDelete = ({reviewId, setShowDeleteReview}) => {

  // const currReview = useSelector(state => state.[reviewId])

  const dispatch = useDispatch()

  const handleDelete = async (e) => {

    await dispatch(thunkDeleteReview(reviewId))
    setShowDeleteReview(false)
  }

  return (
    <>
      <div>
      <p>This review will be deleted. Are you sure you want to proceed? </p>
      <button className="delete-button" onClick={() => handleDelete()}>YES</button>
      <button className="delete-button" onClick={() => setShowDeleteReview(false)}>NO</button>
      </div>
    </>
  )
}

export default ReviewDelete
