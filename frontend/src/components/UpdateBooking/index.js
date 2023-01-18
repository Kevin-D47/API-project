import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { editBookingThunk } from "../../store/bookings";
import { getBookingsByUserthunk } from "../../store/bookings";

import "./updateBooking.css"


function UpdateBookingForm({ setShowUpdateBooking, currBooking }) {

    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = currBooking.userId
    const bookings = useSelector((state) => Object.values(state.bookings));

    // // used for when update booking date conflicts with the current booking date
    // //  not in use b/c conflicts with backend
    // const otherBookings = bookings.filter(booking => booking.id != currBooking.id)

    const todayDate = new Date().toISOString().slice(0, 10);
    const [startDate, setStartDate] = useState(currBooking.startDate);
    const [endDate, setEndDate] = useState(currBooking.endDate);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const startDateNum = new Date(startDate) - 0;
    const endDateNum = new Date(endDate) - 0;

    const errorValidations = () => {
        const errors = [];

        if (startDateNum >= endDateNum) {
            errors.push("Checkout Date cannot be the same or before CheckIn Date");
        }



        bookings?.map((booking) => {
            let bookedStartDate = new Date(booking.startDate) - 0;
            let bookedEndDate = new Date(booking.endDate) - 0;

            if (
                startDateNum === bookedStartDate ||
                startDateNum === bookedEndDate ||
                endDateNum === bookedStartDate ||
                endDateNum === bookedEndDate
            ) {
                errors.push("Chosen dates conflicts with an current/existing booking");
            }

            if (startDateNum > bookedStartDate && startDateNum < bookedEndDate) {
                errors.push("Chosen dates conflicts with an current/existing booking");
            }

            if (startDateNum < bookedStartDate && endDateNum > bookedStartDate && endDateNum < bookedEndDate) {
                errors.push("Chosen dates conflicts with an current/existing booking");
            }

            if (startDateNum < bookedStartDate && endDateNum > bookedEndDate) {
                errors.push("Chosen dates conflicts with an current/existing booking");
            }

            return setErrors(errors);
        });
    };


    useEffect(() => {
        dispatch(getBookingsByUserthunk(currBooking.spotId));
        errorValidations();
    }, [startDateNum, endDateNum]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitted(true)

        let data = {
            userId,
            startDate,
            endDate,
        };

        if (errors.length === 0) {
            dispatch(editBookingThunk(data, currBooking.id))
                .then(() => setShowUpdateBooking(false))
        }
    };

    const errorsList = errors.map((error) => (
        <p key={error}>{error}</p>
    ))


    return (
        <div className="edit-booking-container">
            <div className="edit-booking-title">Update Booking</div>
            <div className="curr-booking-container">
                <div className="curr-booking-date-title">Current Booking Date:</div>
                <div className="curr-booking-date-container">
                    <div className="curr-booking-date-info">
                        <div>CHECK-IN:</div>
                        <div style={{ fontWeight: 'bold' }}>{currBooking.startDate.slice(5, 7)}-{currBooking.startDate.slice(8, 10)}-{currBooking.startDate.slice(0, 4)}</div>
                    </div>
                    <div className="curr-booking-date-info">
                        <div>CHECKOUT:</div>
                        <div style={{ fontWeight: 'bold' }}>{currBooking.endDate.slice(5, 7)}-{currBooking.endDate.slice(8, 10)}-{currBooking.endDate.slice(0, 4)}</div>
                    </div>
                </div>
            </div>
            <form className="EditBookingForm" onSubmit={handleSubmit}>
                <div className="create-booking-error">{isSubmitted && errorsList}</div>
                <div className="create-booking-input-container">
                    <div className="check-in-label">
                        <label >CHECK-IN</label>
                        <input
                            className="check-input"
                            type="date"
                            placeholder={startDate}
                            min={todayDate}
                            max={"9000-1-1"}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="check-out-label">
                        <label>CHECKOUT</label>
                        <input
                            placeholder={endDate}
                            className="check-input"
                            type="date"
                            min={todayDate}
                            max={"9000-1-1"}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='booking-submit-bttn-container'>
                    <button
                        className="edit-booking-submit-bttn"
                        type="Submit"
                        disabled={isSubmitted && errors.length > 0 || !sessionUser}
                    >
                        Reserve
                    </button>
                    <div className="edit-booking-cancel-bttn" onClick={() => setShowUpdateBooking(false)}>Cancel</div>
                </div>
            </form>
        </div>
    );
}


export default UpdateBookingForm;
