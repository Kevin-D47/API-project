import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { createNewUserBookingThunk, getBookingsByUserthunk } from "../../store/bookings";


const CreateBookings = ({ setStartDate, setEndDate, todayDate, startDate, endDate }) => {
    const [errors, setErrors] = useState([]);
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const spots = useSelector((state) => state.spots);
    const spot = spots[spotId];

    const sessionUser = useSelector((state) => state.session.user);
    const bookings = useSelector((state) => Object.values(state.bookings));

    const startDateNum = new Date(startDate) - 0;
    const endDateNum = new Date(endDate) - 0;

    const errorValidations = () => {
        const errors = [];

        bookings?.map((booking) => {
            let bookedStartDate = new Date(booking?.startDate) - 0;
            let bookedEndDate = new Date(booking?.endDate) - 0;

            if (startDateNum >= endDateNum) {
                errors.push("Checkout Date cannot be the same or before CheckIn Date");
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

    let errorsList;

    if (errors.length > 0) {
        errorsList = (
            <div className="createBookingErrorList">
                {errors.map((error, i) => (
                    <div className="errorMessageContainer" key={i}>
                        <div className="errorMessage">{error}</div>
                    </div>
                ))}
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {
            startDate,
            endDate,
        };

        if (spot?.ownerId === sessionUser.id) {
            let errors = [];
            errors.push("User cannot book their own listing");
            setErrors(errors);
        }
        if (errors.length === 0 && spot?.ownerId !== sessionUser.id) {
            dispatch(createNewUserBookingThunk(spotId, data)).then((res) => history.push(`/myBookings`));
        }
    };

    return (
        <div className="CreateBookingContainer">
            <form className="CreateBookingForm" onSubmit={handleSubmit}>
                <div className="handleErrors">{errorsList}</div>

                <div className="createBookingDiv">
                    <div className="createBookingInputContainer">
                        <label className="checkin-label">CHECK-IN {" "} &nbsp; &nbsp;</label>
                        <input
                            className="BookingCheckinInput"
                            type="date"
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            min={todayDate}
                            max={"9000-1-1"}
                        />
                    </div>

                    <div className="createBookingInputContainer">
                        <label className="checkout-label"> CHECKOUT </label>
                        <input
                            className="BookingCheckOutInput"
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            min={todayDate}
                            max={"9000-1-1"}
                        />
                    </div>
                </div>

                <div className="CreateBookingContainer">
                    <input className="BookingSubmit " type="Submit" defaultValue="Reserve" />
                </div>
            </form>
        </div>
    );
};

export default CreateBookings;
