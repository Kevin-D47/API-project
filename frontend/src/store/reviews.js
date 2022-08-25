import { csrfFetch } from "./csrf"


// types
const GET_ALL_REVIEWS = '/reviews/allReviews'


// actions
const getAllReviews = (reviews) => ({

        type: GET_ALL_REVIEWS,
        reviews

})


// thunks
export const thunkGetAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json()
        dispatch(getAllReviews(reviews.allReviews))
        return response
    }
    return response
}


// reducer
const reviewsReducer = (state = {}, action) => {
    let newState
    switch (action.type) {

        case GET_ALL_REVIEWS:
            newState = { ...state }
            action.reviews.forEach(review => newState[review.id] = review)
            console.log("newState", newState)
            return newState

        default:
            return state
    }
};

export default reviewsReducer
