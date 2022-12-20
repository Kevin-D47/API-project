import { csrfFetch } from "./csrf"


// types
const GET_ALL_USER_REVIEWS = '/reviews/allUserReviews'
const GET_ALL_REVIEWS = '/reviews/allReviews'
const CREATE_REVIEW = '/reviews/createReview'
const UPDATE_REVIEW = '/spots/updateReview'
const DELETE_REVIEW = '/reviews/deleteReview'


// actions

const getAllUserReviews = (reviews) => ({
    type: GET_ALL_USER_REVIEWS,
    reviews
})

const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const editReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})

const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    id
})


// thunks
export const getAllUserReviewsThunk = () => async (dispatch) => {
    const response = await fetch("/api/reviews/current");

    if (response.ok) {
        const allReviews = await response.json();
        dispatch(getAllUserReviews(allReviews));
        return allReviews;
    }
};

export const thunkGetAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json()
        dispatch(getAllReviews(reviews.allReviews))
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

export const thunkUpdateReview = (id, userId, spotId, review, stars) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, userId, spotId, review, stars })
    })
    if (response.ok) {
        const updateReview = await response.json()
        dispatch(editReview(updateReview))
    }
}

export const thunkDeleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteReview(reviewId))
        return 'Review Deleted'
    }
    return response
}

// reducer
const intialState = {}

const reviewsReducer = (state = intialState, action) => {
    let newState

    switch (action.type) {
        case GET_ALL_USER_REVIEWS: {
            const newState = { ...action.reviews }
            return newState
        }
        case GET_ALL_REVIEWS:
            newState = {}
            action.reviews.forEach(review => newState[review.id] = review)
            return newState

        case CREATE_REVIEW:
            newState = { ...state }
            newState[action.review.id] = action.review
            return newState

        case UPDATE_REVIEW:
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
