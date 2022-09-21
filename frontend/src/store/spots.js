import { csrfFetch } from "./csrf";

// types
const GET_ALL_SPOTS = '/spots/allSpots'
const GET_SPOT_DETAILS = '/spots/spotDetails'
const CREATE_SPOT = '/spots/createSpot'
const UPDATE_SPOT = '/spots/updateSpot'
const UPDATE_IMAGE = 'image/updateImage'
const DELETE_SPOT = '/spots/deleteSpot'


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

function deleteSpot(id) {
    return {
        type: DELETE_SPOT,
        id
    }
}

// function updateImage(image, spotId) {
//     return {
//         type: UPDATE_IMAGE,
//         image,
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
        const data = await response.json();
        const imageResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: spot.url,
                previewImage: spot.previewImage,
            }),
        })
        if (imageResponse.ok) {
            const imageData = await imageResponse.json()
            data.previewImage = imageData.url
            dispatch(createSpot(data))
        }

    }
}

export const thunkEditSpot = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    let spot;
    if (response.ok) {
        spot = await response.json();
        const deleteRes = await csrfFetch(`/api/images/${payload.imageId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        let imageResponse;
        if (deleteRes.ok) {
            imageResponse = await csrfFetch(`/api/spots/${payload.id}/images`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: payload.url,
                    previewImage: true,
                }),
            })
        }
        let updateDetails;
        if(imageResponse.ok) {
            updateDetails = await imageResponse.json();
            payload.previewImage = updateDetails
            spot.Images = [updateDetails]
            dispatch(editSpot(spot))
        }
    }
}

export const thunkDeleteSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const message = await response.json();
        dispatch(deleteSpot(id))
        return message
    }
    return response
}


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


        case UPDATE_IMAGE: {
            newState = { ...state };
            newState[action.spotId].Images = [action.image]
            return newState
        }

        case DELETE_SPOT:
            newState = { ...state }
            delete newState[action.id]
            return newState

        default:
            return state
    }
}

export default spotsReducer;
