import { csrfFetch } from "./csrf";

const GET_CURRENT = "/bookings/current";
const GET_SPOT_ID = "/bookings/get";
const CREATE = "/bookings/create";
const UPDATE = "/bookings/update";
const DELETE = "/bookings/delete";

export const getCurrentBookingsThunk = (bookings) => {
  return {
    type: GET_CURRENT,
    bookings,
  };
};

export const getBookings = (bookings) => {
  return {
    type: GET_SPOT_ID,
    bookings,
  };
};

export const createBookings = (booking) => {
  return {
    type: CREATE,
    booking,
  };
};

export const updateBooking = (reviewId) => {
  return {
    type: UPDATE,
    reviewId,
  };
};
export const deleteBooking = (bookingId) => {
  return {
    type: DELETE,
    bookingId,
  };
};

export const getBookingsByUserthunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/current`, {
    method: "GET",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(getCurrentBookingsThunk(data.Bookings));
  }
};


export const createNewUserBookingThunk = (spotId, bookingData) => async (dispatch) => {
  const reqData = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  };
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, reqData);
  if (res.ok) {
    const data = await res.json();
    dispatch(createBookings(data));
    return data;
  }
};



export const getBookingsById = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getBookings(data.Bookings));
  }
};



export const deleteBookingId = (bookingId) => async (dispatch) => {
  const reqData = {
    method: "DELETE",
  };
  const res = await csrfFetch(`api/bookings/${bookingId}`, reqData);
  if (res.ok) {
    dispatch(deleteBooking(bookingId));
  }
  return res;
};


export const editBooking = (payload, reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(updateBooking(data.Bookings));
    return res;
  }
};

export default function bookingsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_SPOT_ID:
      newState = { ...action.bookings };
      return newState;
    case GET_CURRENT:
      newState = {};
      action.bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;
    case CREATE:
      newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
    case DELETE:
      newState = { ...state };
      delete newState[action.bookingId];
      return newState;
    default:
      return state;
  }
}
