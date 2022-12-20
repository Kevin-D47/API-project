import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { thunkUpdateReview } from "../../store/reviews"
import { thunkGetAllReviews } from "../../store/reviews";

import "./updateReview.css"


function UpdateReviewForm({ setShowUpdateReview, currReview, spotId }) {

    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id

    // const formInfo = useSelector(state => state.review.reviewId)

    const [review, setReview] = useState(currReview.review);
    const [stars, setStars] = useState(currReview.stars);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const newErrors = [];

        if (review.length <= 0) {
            newErrors.push("Please write a review.");
        }

        if (stars < 1 || stars > 5) {
            newErrors.push("Rating must be an integer from 1 to 5.");
        }

        setErrors(newErrors);
    }, [review, stars]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitted(true)

        if (errors.length > 0) {
            return alert("invalid submission");
        }

        dispatch(thunkUpdateReview(currReview.id, userId, spotId, review, stars))
            .then(() => dispatch(thunkGetAllReviews(spotId)))
        setShowUpdateReview(false)
    };

    const errorList = errors.map((error) => (
        <p key={error}>{error}</p>
    ))

    return (
        <div className="edit-review-container">
            <div className="edit-review-wrapper">
                <div className="edit-review-header-container">
                    <div className="edit-review-header">Edit Review</div>
                    <div className="edit-review-close-bttn" onClick={() => setShowUpdateReview(false)}>X</div>
                </div>

                <form className="create-review-form" onSubmit={handleSubmit}>
                    <div className="create-review-errors">
                        {isSubmitted && errorList}
                    </div>
                    <div className="modal-body">
                        <label className="create-review-label">
                            Describe Your Experince:
                            <div className="create-review-input-container">
                                <textarea
                                    className="review-edit-input"
                                    type="string"
                                    placeholder="What was it like to stay here?"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="create-review-label">
                            Rating:
                            <div className="rating-input-container">
                                <input
                                    className="rating-input"
                                    type="number"
                                    placeholder="1 - 5 stars"
                                    minLength="1"
                                    maxLength="5"
                                    step="1"
                                    value={stars}
                                    onChange={(e) => setStars(e.target.value)}
                                />
                            </div>
                        </label>
                    </div>
                    <div className="edit-review-submit-container">
                        <button
                            className="create-review-button edit-review-submit-button"
                            type="submit"
                            disabled={isSubmitted && errors.length > 0}
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default UpdateReviewForm;
