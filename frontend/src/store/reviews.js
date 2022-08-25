import { csrfFetch } from "./csrf"


// types
const GET_ALL_REVIEWS = '/reviews/allReviews'
const CREATE_REVIEW = '/reviews/createReview'
const DELETE_REVIEW = '/reviews/deleteReview'


// actions
const getAllReviews = (reviews) => ({

    type: GET_ALL_REVIEWS,
    reviews

})

const createReview = (review) => ({

    type: CREATE_REVIEW,
    review

})

const deleteReview = (review) => ({

    type: DELETE_REVIEW,
    review

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

export const thunkCreateReview = (review) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const newReview = await response.json()
        dispatch(createReview(newReview))
        return response
    }
    return response
}

export const thunkDeleteReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const message = await response.json();
        dispatch(deleteReview(id))
        return message
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

        case CREATE_REVIEW:
            newState = { ...state }
            newState[action.review.id] = action.review
            return newState

        case DELETE_REVIEW:
            newState = { ...state }
            delete newState[action.id]
            return newState

        default:
            return state
    }
};

export default reviewsReducer
