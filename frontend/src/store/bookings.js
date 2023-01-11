import { csrfFetch } from "./csrf";

const GET_CUR_BOOKING = "/bookings/current";
const GET_BOOKINGS = "/bookings/get";
const CREATE_BOOKING = "/bookings/create";
const UPDATE_BOOKING = "/bookings/update";
const DELETE_BOOKING = "/bookings/delete";


// actions
export const getCurrentBookingsThunk = (bookings) => {
  return {
    type: GET_CUR_BOOKING,
    bookings,
  };
};

export const getBookings = (bookings) => {
  return {
    type: GET_BOOKINGS,
    bookings,
  };
};

export const createBookings = (booking) => {
  return {
    type: CREATE_BOOKING,
    booking,
  };
};

export const editBooking = (booking) => {
  return {
    type: UPDATE_BOOKING,
    booking,
  };
};
export const deleteBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING,
    bookingId,
  };
};


// thunks
export const getBookingsByUserthunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getCurrentBookingsThunk(data.Bookings));
  }
};

export const getBookingsById = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getBookings(data.Bookings));
  }
};


export const createNewUserBookingThunk = (spotId, bookingData) => async (dispatch) => {
  const reqData = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  };
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, reqData);
  if (response.ok) {
    const data = await response.json();
    dispatch(createBookings(data));
    return data;
  }
};

export const editBookingThunk = (payload, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const updateBooking = await response.json();
    dispatch(editBooking(updateBooking));
  }
};

export const deleteBookingId = (bookingId) => async (dispatch) => {
  const reqData = {
    method: "DELETE",
  };
  const response = await csrfFetch(`api/bookings/${bookingId}`, reqData);
  if (response.ok) {
    dispatch(deleteBooking(bookingId));
  }
  return response;
};


// reducer
const intialState = {}

const bookingsReducer = (state = intialState, action) => {
  let newState;

  switch (action.type) {
    case GET_BOOKINGS:
      newState = { ...action.bookings };
      return newState;

    case GET_CUR_BOOKING:
      newState = {};
      action.bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;

    case CREATE_BOOKING:
      newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;

    case UPDATE_BOOKING:
      newState = { ...state }
      newState[action.booking.id] = action.booking
      return newState

    case DELETE_BOOKING:
      newState = { ...state };
      delete newState[action.bookingId];
      return newState;

    default:
      return state;
  }
}

export default bookingsReducer
