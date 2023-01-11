import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { editBookingThunk } from "../../store/bookings";
import { getBookingsByUserthunk } from "../../store/bookings";

import "./updateBooking.css"


function UpdateBookingForm({ setShowUpdateBooking, currBooking}) {

    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = currBooking.userId
    const bookings = useSelector((state) => Object.values(state.bookings));

    const otherBookings = bookings.filter(booking => booking.id != currBooking.id)


    const todayDate = new Date().toISOString().slice(0, 10);
    const [startDate, setStartDate] = useState(currBooking.startDate);
    const [endDate, setEndDate] = useState(currBooking.endDate);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const startDateNum = new Date(startDate) - 0;
    const endDateNum = new Date(endDate) - 0;

    console.log("TEST today----", todayDate)
    console.log("TEST start----", startDateNum)
    console.log("TEST end----", endDateNum)

    const errorValidations = () => {
        const errors = [];

        // if (spot.ownerId === sessionUser.id) {
        //     errors.push("Owners cannot book their own listing");
        // }

        if (startDateNum >= endDateNum) {
            errors.push("Checkout Date cannot be the same or before CheckIn Date");
        }

        otherBookings.map((booking) => {
            let bookedStartDate = new Date(booking?.startDate) - 0;
            let bookedEndDate = new Date(booking?.endDate) - 0;

            // if (currBooking.spotId === spot.id) {
            //     errors.push("Cannot have more than one booking per spot at a time");
            // }

            if (
                startDateNum === bookedStartDate ||
                startDateNum === bookedEndDate ||
                endDateNum === bookedStartDate ||
                endDateNum === bookedEndDate
            ) {
                errors.push("Chosen dates conflicts with an existing booking");
            }

            if (startDateNum > bookedStartDate && startDateNum < bookedEndDate) {
                errors.push("Chosen dates conflicts with an existing booking");
            }

            if (startDateNum < bookedStartDate && endDateNum > bookedStartDate && endDateNum < bookedEndDate) {
                errors.push("Chosen dates conflicts with an existing booking");
            }

            if (startDateNum < bookedStartDate && endDateNum > bookedEndDate) {
                errors.push("Chosen dates conflicts with an existing booking");
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
        <div className="CreateBookingContainer">
            <form className="CreateBookingForm" onSubmit={handleSubmit}>
                <div className="create-booking-error">{isSubmitted && errorsList}</div>
                <div className="create-booking-input-container">
                    <div className="check-in-label">
                        <label >CHECK-IN</label>
                        <input
                            placeholder={startDate}
                            className="check-input"
                            type="date"
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
                        className="booking-submit-bttn"
                        type="Submit"
                        disabled={isSubmitted && errors.length > 0 || !sessionUser}
                    >
                        Reserve
                    </button>
                </div>
                {!sessionUser && (
                    <div className="booking-login-message">
                        Please login to make a booking
                    </div>
                )}
            </form>
        </div>
    );
}


export default UpdateBookingForm;
