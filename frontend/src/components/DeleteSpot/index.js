// src/components/DeleteSpots/DeleteSpots.js
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkDeleteSpot } from "../../store/spots";
import './DeleteSpot.css'


const SpotDelete = ({ spotId, setShowDeleteSpot }) => {

  const history = useHistory()

  const dispatch = useDispatch()

  const handleDelete = async (e) => {
    e.preventDefault()

    dispatch(thunkDeleteSpot(spotId))
      .then(() => setShowDeleteSpot(false))
      .then(() => history.push("/"))
  }

  return (
    <>
      <div className='delete-container'>
        <p>This spot will be deleted. Are you sure you want to proceed? </p>
        <div className="delete-buttons-container">
          <button className="delete-button yes-button" onClick={handleDelete}>YES</button>
          <button className="delete-button" onClick={() => setShowDeleteSpot(false)}>NO</button>
        </div>
      </div>
    </>
  )
}

export default SpotDelete
