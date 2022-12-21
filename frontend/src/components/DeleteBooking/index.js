import { useDispatch } from "react-redux";
import { deleteBookingId } from "../../store/bookings";
import { useHistory } from "react-router-dom";


const BookingDelete = ({ setShowDeleteBooking, currBooking }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = async (e) => {
    e.preventDefault()

    dispatch(dispatch(deleteBookingId(currBooking.id)).then(() => setShowDeleteBooking(false)))
  }

  return (
    <div>
      <div className='delete-container'>
        <p>This booking will be canceled. Are you sure you want to proceed? </p>
        <div className="delete-buttons-container">
          <button className="delete-button yes-button" onClick={handleDelete}>YES</button>
          <button className="delete-button" onClick={() => setShowDeleteBooking(false)}>NO</button>
        </div>
      </div>
    </div>
  )
}

export default BookingDelete
