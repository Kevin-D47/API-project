import { csrfFetch } from "./csrf";


// types
const GET_ALL_SPOTS = '/spots/allSpots'
const GET_SPOT_DETAILS = '/spots/spotDetails'
const CREATE_SPOT = '/spots/createSpot'
const UPDATE_SPOT = '/spots/updateSpot'
// const DELETE_Spot = '/spots/deleteSpot'


// actions
function getAllSpots(spots) {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

function getSpotById(spot) {
    return {
        type: GET_SPOT_DETAILS,
        spot
    }
}

function createSpot(spot) {
    return {
        type: CREATE_SPOT,
        spot
    }
}

function editSpot(spot) {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

// function deleteSpot(spotId) {
//     return {
//         type: DELETE_Spot,
//         spotId
//     }
// }


// thunks
export const thunkGetAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch(getAllSpots(spots.allSpots))
        return response
    }
    return response
}

export const thunkGetSpotById = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(getSpotById(spot))
        return spot
    }
    return response
}

export const thunkCreateSpot = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(createSpot(newSpot))
        return newSpot
    }
    return response
}

export const thunkEditSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(editSpot(spot))
        return spot
    }
    return response
}

// export const thunkDeleteSpot = (id) => async dispatch => {
//     const response = await csrfFetch (`/api/currentUser/spots/${id}`, {
//         method: 'DELETE'
//     });

//     if (response.ok) {
//         const message = await response.json();
//         dispatch(deleteSpot(id))
//         return message
//     }
// }


//reducer
const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = { ...state }
            action.spots.forEach(spot => newState[spot.id] = spot)
            return newState

        case GET_SPOT_DETAILS:
            newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState

        case CREATE_SPOT:
            newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState

        case UPDATE_SPOT:
            newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState

        default:
            return state
    }
}

export default spotsReducer;
