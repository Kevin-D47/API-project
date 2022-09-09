//src/components/DeleteSpots/DeleteSpots.js
import { useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { thunkDeleteSpot } from "../../store/spots";
import './DeleteSpot.css'


const SpotDelete = ({ spotId, setShowDeleteSpot }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = async (e) => {
    history.push("/")
    await dispatch(thunkDeleteSpot(spotId))
    setShowDeleteSpot(false)
  }

  return (
    <>
      <div className='delete-container'>
        <p>This spot will be deleted. Are you sure you want to proceed? </p>
        <div className="delete-buttons-container">
          <button className="delete-button yes-button" onClick={() => handleDelete()}>YES</button>
          <button className="delete-button" onClick={() => setShowDeleteSpot(false)}>NO</button>
        </div>
      </div>
    </>
  )
}

export default SpotDelete
