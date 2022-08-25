import { csrfFetch } from "./csrf"
import spotsReducer from "./spots"


// types
const GET_ALL_REVIEWS = '/reviews/allReviews'
const CREATE_REVIEW = '/reviews/createReview'
const DELETE_REVIEW = '/review/deleteReview'


// actions
export const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
}

export const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}


// thunks
export const thunkGetAllReviews = () => async dispatch => {
    const response = await csrfFetch('/api/reviews')

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const newReview = await response.json()
        dispatch(createReview(newReview))
        return newReview
    }
    return response
}

export const thunkDeleteReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const message = await response.json()
        dispatch(deleteReview(id))
        return message
    }
    return response
}


// reducer
const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_ALL_REVIEWS:
            newState = { ...state }
            action.reviews.forEach(review => newState[review.id] = review)
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
}

export default reviewsReducer
