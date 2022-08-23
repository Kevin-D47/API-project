import { csrfFetch } from "./csrf";


// types
const GET_ALL_SPOTS = '/spots/allSpots'
const GET_SPOT_DETAILS = '/spots/spotDetails'
// const GET_CURR_SPOTS = '/spots/getCurrSpot'
// const CREATE_SPOT = '/spots/createSpot'
// const EDIT_SPOT = '/spots/editSpot'
// const DELETE_Spot = '/spots/deleteSpot'


// actions
function getAllSpots(spots) {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

function getSingleSpot(spot) {
    return {
        type: GET_SPOT_DETAILS,
        spot
    }
}

// function createSpot(spot) {
//     return {
//         type: CREATE_SPOT,
//         spot
//     }
// }

// function editSpot(spot) {
//     return {
//         type: EDIT_SPOT,
//         spot
//     }
// }

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

export const thunkGetSingleSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(getSingleSpot(spot))
        return spot
    }
    return response
}

// export const getCurrentUsersSpots = () => async dispatch => {
//     const response = await csrfFetch('/api/spots/current');

//     if (response.ok) {
//         const spotsObj = await response.json();
//         dispatch(getCurrSpot(spotsObj))
//         return response
//     }
//     return response
// }

// export const thunkCreateSpot = (spot) => async dispatch => {
//     const response = await csrfFetch ('/api/currentUser/spots', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(spot)
//     });

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(createSpot(data))
//         return data.id
//     } else throw response
// }

// export const thunkEditSpot = (spot) => async dispatch => {
//     const response = await csrfFetch (`/api/currentUser/spots/${spot.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(spot)
//     });

//     if (response.ok) {
//         const spot = await response.json();
//         dispatch(editSpot(spot))
//     }
// }

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

        case GET_SPOT_DETAILS: {
            newState = { ...state }
            newState.selectedSpot = {}
            newState.selectedSpot[action.spot.id] = action.spot
            return newState
        }

        default:
            return state
    }
}

export default spotsReducer;
