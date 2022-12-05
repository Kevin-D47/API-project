import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getBookingsByUserthunk } from "../../store/bookings";
import { deleteBookingId } from "../../store/bookings";
import { thunkGetAllSpots } from "../../store/spots";

import "./UserBookings.css";

function UserBookingsPage() {
    const bookings = useSelector((state) => Object.values(state.bookings));
    const spot = useSelector((state) => Object.values(state.spots));
    const dispatch = useDispatch();
    const history = useHistory();

    bookings.sort(function (a, b) {
        return new Date(a.endDate) - new Date(b.endDate);
    });

    const [isLoaded, setIsLoaded] = useState(false);
    const redirectUser = (id) => {
        history.push(`/spots/${spot.id}`);
    };

    useEffect(() => {
        dispatch(getBookingsByUserthunk()).then(setIsLoaded(true));
        dispatch(thunkGetAllSpots());
    }, [dispatch]);

    if (!isLoaded) {
        return null;
    }

    let userBookings;
    if (Object.keys(bookings).length === 0) {
        userBookings = (
            <div className="no-bookings">
                <h2>You have no bookings</h2>
            </div>
        );
    } else {
        userBookings = (
            <div className="user-bookings-page-container">
                <h2 className="mySpotHeader">Upcoming Bookings</h2>
                <div className="gridSpot">
                    {bookings.map((booking) => (
                        <div className="booking-card cardsforOwned" key={booking.id}>
                            <div className="booking-card-left">
                                <div className="booking-card-buttons">
                                    <NavLink to={`/spots/${booking.Spot.id}`} className="spacing booking-card-button">
                                        View Spot
                                    </NavLink>
                                    <button
                                        className="buttonforowned booking-card-button spacing"
                                        onClick={() => dispatch(deleteBookingId(booking.id))}
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                                <div className="booking-card-right" onClick={() => redirectUser()}>
                                    <img className="Image" src={booking.Spot.previewImage} alt="Spot" />
                                </div>
                                <div className="booking-card-info">
                                    <h3 className="spotAddy-Owned spacing">{booking.Spot.name}</h3>
                                    <p className="grouping-info spacing">
                                        {new Date(booking.startDate).toLocaleDateString()} -{" "}
                                        {new Date(booking.endDate).toLocaleDateString()}
                                        &nbsp;&nbsp;{booking.Spot.city}, {booking.Spot.state} &nbsp;
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="user-booking-container">
            <div className="user-booking-inner-container">
                {/* <div className="user-booking-header mySpotHeader">My Bookings</div> */}
                {userBookings}
            </div>
        </div>
    );
}

export default UserBookingsPage;
