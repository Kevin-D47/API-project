import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";

import { getBookingsByUserthunk } from "../../store/bookings";
import { thunkGetAllSpots } from "../../store/spots";

import BookingDelete from "../DeleteBooking";

import staybnbLogo from './icons/staybnbLogo.png'

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
    const [showDeleteBooking, setShowDeleteBooking] = useState(false)
    const [currBooking, setCurrBooking] = useState(false)


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
            <div className="no-booking-container">
                <div className='my-booking-header'>Upcoming Bookings</div>
                <div className="user-no-data-container">
                    <img className='no-data-logo' src={staybnbLogo}></img>
                    <div className="no-booking-message">You have no existing bookings</div>
                </div>
            </div>
        );
    } else {
        userBookings = (
            <div className="user-bookings-container">
                <div className='my-booking-header'>Upcoming Bookings</div>
                {bookings.map((booking) => (
                    <div className='user-single-spot-container' key={booking.id}>
                        <div className='user-single-spot-container-left'>
                            <NavLink className="booking-card-right" to={`/spots/${booking.Spot?.id}`}>
                                <img className='user-spot-img' src={booking.Spot?.previewImage} alt="Spot" />
                            </NavLink>
                        </div>
                        <div className='user-single-spot-container-right'>
                            <div className="user-booking-card-info">
                                <div className="user-booking-spot-name">{booking.Spot?.name}</div>
                                <div className="user-booking-spot-info">Location: <div style={{ fontWeight: 'bold' }}>{booking.Spot?.address}, {booking.Spot?.city}, {booking.Spot?.state}</div></div>
                                <div className="user-booking-spot-info">Price:<div style={{ fontWeight: 'bold' }}>${booking.Spot?.price}/night</div></div>
                                <div className="user-booking-spot-checkin-checkout">
                                    <div className="user-booking-spot-info">CHECK-IN: <div style={{ fontWeight: 'bold' }}>{new Date(booking.startDate).toLocaleDateString()}</div></div>
                                    <div className="user-booking-spot-info">CHECKOUT: <div style={{ fontWeight: 'bold' }}>{new Date(booking.endDate).toLocaleDateString()}</div></div>
                                </div>
                            </div>
                            <div className="user-booking-card-buttons">
                                <NavLink className="booking-view-spot-bttn" to={`/spots/${booking.Spot?.id}`} >
                                    View Stay
                                </NavLink>
                                <button className="host-option-buttons" onClick={() => { setShowDeleteBooking(true); setCurrBooking(booking) }}>
                                    Cancel Booking
                                </button>
                                {showDeleteBooking && (
                                    <Modal onClose={() => setShowDeleteBooking(false)}>
                                        <BookingDelete currBooking={currBooking} setShowDeleteBooking={setShowDeleteBooking} />
                                    </Modal>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        isLoaded && (
            <div className="user-booking-container">
                <div className="user-booking-inner-container">
                    {userBookings}
                </div>
            </div>
        )
    );
}

export default UserBookingsPage;
