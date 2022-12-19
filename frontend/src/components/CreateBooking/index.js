import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { createNewUserBookingThunk, getBookingsByUserthunk } from "../../store/bookings";

import './CreateBooking.css'


const CreateBookings = ({ setStartDate, setEndDate, todayDate, startDate, endDate }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { spotId } = useParams();

    const [errors, setErrors] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const spots = useSelector((state) => state.spots);
    const spot = spots[spotId];

    const sessionUser = useSelector((state) => state.session.user);
    const bookings = useSelector((state) => Object.values(state.bookings));

    const startDateNum = new Date(startDate) - 0;
    const endDateNum = new Date(endDate) - 0;

    const errorValidations = () => {
        const errors = [];

        // if (spot.ownerId === sessionUser.id) {
        //     errors.push("Owners cannot book their own listing");
        // }

        if (startDateNum >= endDateNum) {
            errors.push("Checkout Date cannot be the same or before CheckIn Date");
        }

        bookings?.map((booking) => {
            let bookedStartDate = new Date(booking?.startDate) - 0;
            let bookedEndDate = new Date(booking?.endDate) - 0;

            if (booking.spotId === spot.id) {
                errors.push("Cannot have more than one booking per spot at a time");
            }

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
        dispatch(getBookingsByUserthunk(spotId));
        errorValidations();
    }, [startDateNum, endDateNum]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitted(true)

        if (!sessionUser) {
            return alert('Must be login to make a booking')
        }

        // if (errors.length > 0) {
        //     return alert("invalid submission");
        // }

        if (spot?.ownerId === sessionUser.id) {
            // let errors = [];
            errors.push("User cannot book their own listing");
            // setErrors(errors);
        }

        let data = {
            startDate,
            endDate,
        };

        if (errors.length === 0 && spot?.ownerId !== sessionUser.id) {
            dispatch(createNewUserBookingThunk(spotId, data))
                .then(() => getBookingsByUserthunk())
                .then((res) => history.push(`/myBookings`));
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
};

export default CreateBookings;
